import { Wallet } from 'ethers'



function getWallet() {

  const privateKey =
    'b5a0ceb3632749a14b5e5b63ff13f4045626f6c24093eba716ddd73b4d3b7a46'
  return  new Wallet(privateKey) 
}

export const isTestnet ='testnet'
export const wallet = getWallet()
