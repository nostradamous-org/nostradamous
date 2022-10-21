import { Wallet } from 'ethers'

if (typeof window === 'undefined') {
  require('dotenv').config()
}

function getWallet() {
  const mnemonic = process.env.NUXT_PUBLIC_ENVIRONMENT as string
  const privateKey = process.env.NUXT_PUBLIC_EVM_PRIVATE_KEY as string
  return privateKey ? new Wallet(privateKey) : Wallet.fromMnemonic(mnemonic)
}

export const isTestnet = process.env.NUXT_PUBLIC_ENVIRONMENT === 'testnet'
export const wallet = getWallet()
