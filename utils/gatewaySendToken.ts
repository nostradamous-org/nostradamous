import {
  Contract,
  ethers,
  getDefaultProvider,
  providers,
} from 'ethers'

import {
  AxelarQueryAPI,
  Environment,
  EvmChain,
  GasToken,
} from '@axelar-network/axelarjs-sdk'

import AxelarGatewayContract from '../abi/IAxelarGateway.sol/IAxelarGateway.json'
import MessageSenderContract from '../artifacts/contracts/MessageSender.sol/MessageSender.json'
import MessageReceiverContract from '../artifacts/contracts/MessageReceiver.sol/MessageReceiver.json'
import IERC20 from '../abi/IERC20.sol/IERC20.json'
import { isTestnet, wallet } from '../config/constants'
import { sleep } from './sleep'

function chainSelect(fromNetwork: String, toNetwork: String) {
  let chains = isTestnet
    ? require('../config/testnet.json')
    : require('../config/local.json')

  const fromChain = chains.find(
    (chain: any) => chain.name == fromNetwork
  ) as any
  const toChain = chains.find((chain: any) => chain.name == toNetwork) as any
  if (!fromChain || !toChain) {
    process.exit(0)
  }

  const useMetamask = false // typeof window === 'object';

  const fromProvider = useMetamask
    ? new providers.Web3Provider((window as any).ethereum)
    : getDefaultProvider(fromChain.rpc)
  const fromConnectedWallet = useMetamask
    ? (fromProvider as providers.Web3Provider).getSigner()
    : wallet.connect(fromProvider)
  const toProvider = getDefaultProvider(toChain.rpc)
  const toConnectedWallet = wallet.connect(toProvider)

  const srcGatewayContract = new Contract(
    fromChain.gateway,
    AxelarGatewayContract.abi,
    fromConnectedWallet
  )
  const destGatewayContract = new Contract(
    toChain.gateway,
    AxelarGatewayContract.abi,
    toConnectedWallet
  )

  return {
    toChain,
    fromChain,
    srcGatewayContract,
    destGatewayContract,
    fromConnectedWallet,
    toConnectedWallet,
    toProvider,
    fromProvider,
  }
}

export async function gatewaySendToken(
  fromNetwork: String,
  toNetwork: String,
  amount: string,
  recipientAddress: string,
  srcToken: string,
  srcTokenAddress: string,
  destTokenAddress: string,
  // onSent: (data: { txHash: string; transferFee: number }) => void
  onSent: (data: { txHash: string }) => void
) {
  let contracts = chainSelect(fromNetwork, toNetwork)
  let provider = new providers.Web3Provider((window as any).ethereum)
  const signer = provider.getSigner()

  const srcERC20 = new Contract(srcTokenAddress, IERC20.abi, signer)

  const destERC20 = new Contract(destTokenAddress, IERC20.abi, provider)

  const destBalance = await destERC20.balanceOf(recipientAddress)

  const api = new AxelarQueryAPI({ environment: Environment.TESTNET })

  const gasFee = await api.estimateGasFee(
    EvmChain.AVALANCHE,
    EvmChain.FANTOM,
    GasToken.AVAX,
    700000,
    2
  )

  // Approve the token for the amount to be sent
  await srcERC20
    .approve(
      contracts.srcGatewayContract.address,
      ethers.utils.parseUnits(amount, 6)
    )
    .then((tx: any) => tx.wait())
  // Send the token

  const txHash: string = await contracts.srcGatewayContract
    .sendToken(
      toNetwork.toString(),
      recipientAddress,
      srcToken,
      ethers.utils.parseUnits(amount, 6),
      {
        gasLimit: 750000,
      }
    )
    .then((tx: any) => tx.wait())
    .then((receipt: any) => receipt.transactionHash)

  onSent({ txHash })

  // Wait destination contract to execute the transaction.
  return new Promise(async (resolve, reject) => {
    while (true) {
      const newBalance = await destERC20.balanceOf(recipientAddress)
      if (BigInt(destBalance) != BigInt(newBalance)) break
      await sleep(2000)
    }
    resolve(null)
  })
}
