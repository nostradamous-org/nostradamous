import { AxelarQueryAPI, Environment } from '@axelar-network/axelarjs-sdk'
import { ethers } from 'ethers'

export const getTransferFee = async (
  srcChain: string,
  destChain: string,
  symbol: string,
  amount: string
) => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
    return 1
  } else {
    const axelarQueryApi = new AxelarQueryAPI({
      environment: Environment.TESTNET,
    })
    const denom = (await axelarQueryApi.getDenomFromSymbol(
      symbol,
      srcChain
    )) as string
    const feeResponse = await axelarQueryApi.getTransferFee(
      srcChain,
      destChain,
      denom,
      ethers.utils.parseUnits(amount, 6).toNumber()
    )
    let feeAmount = feeResponse.fee?.amount as any
    return +ethers.utils.formatUnits(feeAmount, 6)
  }
}
