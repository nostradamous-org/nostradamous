import fs from 'fs/promises'
import { getDefaultProvider } from 'ethers'
import { isTestnet, wallet } from '../config/constants'

const {
  utils: { deployContract },
} = require('@axelar-network/axelar-local-dev')

let chains = isTestnet
  ? require('../config/testnet.json')
  : require('../config/local.json')

// get chains

const moonbeamChain = chains.find((chain: any) => chain.name === 'Moonbeam')
const avalancheChain = chains.find((chain: any) => chain.name === 'Avalanche')
const polygonChain = chains.find((chain: any) => chain.name === 'Polygon')

const fantomChain = chains.find((chain: any) => chain.name === 'Fantom')

const ethereumChain = chains.find(
  (chain: any) => chain.name === 'Ethereum' || chain.name === 'ethereum-2'
)

// deploy script
async function main() {
  /**
   * DEPLOY ON MOONBEAM
   */
  const moonbeamProvider = getDefaultProvider(moonbeamChain.rpc)
  const moonbeamConnectedWallet = wallet.connect(moonbeamProvider)

  /**
   * DEPLOY ON POLYGON
   */

  const polygonProvider = getDefaultProvider(polygonChain.rpc)
  const polygonConnectedWallet = wallet.connect(polygonProvider)

  /**
   * DEPLOY ON FANTON
   */

  const fantomProvider = getDefaultProvider(fantomChain.rpc)
  const fantomConnectedWallet = wallet.connect(fantomProvider)

  /**
   * DEPLOY ON ETHEREUM
   */

  const ethereumProvider = getDefaultProvider(ethereumChain.rpc)
  const ethereumConnectedWallet = wallet.connect(ethereumProvider)

  /**
   * DEPLOY ON AVALANCHE
   */

  const avalancheProvider = getDefaultProvider(avalancheChain.rpc)
  const avalancheConnectedWallet = wallet.connect(avalancheProvider)

  // update chains
  const updatedChains = [
    moonbeamChain,
    avalancheChain,
    polygonChain,
    fantomChain,
    ethereumChain,
  ]
  if (isTestnet) {
    await fs.writeFile(
      'config/testnet.json',
      JSON.stringify(updatedChains, null, 2)
    )
  } else {
    await fs.writeFile(
      'config/local.json',
      JSON.stringify(updatedChains, null, 2)
    )
  }
}

main()
