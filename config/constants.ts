import { Wallet } from 'ethers'

// if (typeof window === 'undefined') {
//   require('dotenv').config()
// }

function getWallet() {
  // const mnemonic = process.env.NUXT_PUBLIC_ENVIRONMENT as string
  const privateKey =
    '8f4cff0e72590cb2639b18e53002b0e3751c09458f74c5160c2b4b9240da6642'
  return new Wallet(privateKey) 
}

export const isTestnet = 'testnet'
export const wallet = getWallet()
