import { Contract, ethers, getDefaultProvider, providers } from 'ethers'
import {
  AxelarAssetTransfer,
  AxelarQueryAPI,
  Environment,
  EvmChain,
  GasToken,
} from '@axelar-network/axelarjs-sdk'

import AxelarGatewayContract from '../abi/IAxelarGateway.sol/IAxelarGateway.json'
import IERC20 from '../abi/IERC20.sol/IERC20.json'
import { isTestnet, wallet } from '../config/constants'
import { sleep } from './sleep'
import { getTransferFee } from './getTransferFee'

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
    toChain.gateway,
    AxelarGatewayContract.abi,
    toConnectedWallet
  )
  const destGatewayContract = new Contract(
    fromChain.gateway,
    AxelarGatewayContract.abi,
    fromConnectedWallet
  )

  return {
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
  onSent: (data: { txHash: string; transferFee: number }) => void
) {
  let contracts = chainSelect(fromNetwork, toNetwork)
  let provider = new providers.Web3Provider((window as any).ethereum)
  const gasPrice = await provider.getGasPrice()
  // Get token address from the gateway contract for the src chain
  const srcTokenAddress = await contracts.srcGatewayContract.tokenAddresses(
    'aUSDC'
  )
  const srcErc20 = new Contract(
    srcTokenAddress,
    IERC20.abi,
    contracts.toConnectedWallet
  )

  // Get token address from the gateway contract for the destination chain
  const destinationTokenAddress =
    await contracts.destGatewayContract.tokenAddresses('aUSDC')

  const destERC20 = new Contract(
    destinationTokenAddress,
    IERC20.abi,
    contracts.fromConnectedWallet
  )

  const destBalance = await destERC20.balanceOf(recipientAddress)
  const transferFee: number = await getTransferFee(
    toNetwork.toString().toLowerCase(),
    fromNetwork.toString().toLowerCase(),
    'aUSDC',
    amount
  )
  // Approve the token for the amount to be sent
  await srcErc20
    .approve(
      contracts.srcGatewayContract.address,
      ethers.utils.parseUnits(amount, 6),
      {
        gasLimit: 100000,
        gasPrice: gasPrice,
      }
    )
    .then((tx: any) => tx.wait())
  // Send the token
  const txHash: string = await contracts.srcGatewayContract
    .sendToken(
      fromNetwork.toString(),
      recipientAddress,
      'aUSDC',
      ethers.utils.parseUnits(amount, 6),
      {
        gasPrice: gasPrice,
        gasLimit: 750000,
      }
    )
    .then((tx: any) => tx.wait())
    .then((receipt: any) => receipt.transactionHash)

  console.log({ txHash })
  onSent({ txHash, transferFee })

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
