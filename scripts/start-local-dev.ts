import { createAndExport } from '@axelar-network/axelar-local-dev'
import { Network } from '@axelar-network/axelar-local-dev/dist/Network'
import { wallet } from '../config/constants'

// deploy network
createAndExport({
  accountsToFund: [wallet.address],
  chains: [
    'Moonbeam',
    'Avalanche',
    'aurora',
    'binance',
    'ethereum-2',
    'Fantom',
    'Polygon',
  ],
  chainOutputPath: 'config/local.json',
  async callback(network: Network) {
    await network.deployToken('USDC', 'aUSDC', 6, BigInt(100_000_000e6))

    if (network.name === 'Avalanche') {
      await network.giveToken(
        wallet.address,
        'aUSDC',
        BigInt('100000000000000')
      )
    }
  },
})
