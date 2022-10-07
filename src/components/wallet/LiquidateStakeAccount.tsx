import React, { FC, useState } from 'react'
import { web3 } from '@marinade.finance/marinade-ts-sdk'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletError } from '@solana/wallet-adapter-base'
import { Button, Input } from '@mui/material'
import { useMarinade } from '../marinade/MarinadeProvider'
import { Loader } from '../utility/Loader'

interface LiquidateStakeAccountComponentProps {
  onTransaction?: (_: string) => void
  onError?: (_: Error) => void
}

export const LiquidateStakeAccount: FC<LiquidateStakeAccountComponentProps> = ({ onError, onTransaction }) => {
  const [stakeAccount, setStakeAccount] = useState('')
  const [processingTransaction, setProcessingTransaction] = useState(false)

  const { connection } = useConnection()
  const { sendTransaction } = useWallet()
  const { marinade } = useMarinade()

  if (!marinade) {
    return <></>
  }

  if (processingTransaction) {
    return <><Loader /></>
  }

  return <div className='action-field'>
    <div className='input-background'>
      <Input
        onChange={(e) => setStakeAccount(e.target.value)}
        placeholder='Stake account to liquidate'
      />
    </div>
    <Button
      onClick={async () => {
        try {
          setProcessingTransaction(true)
          const { transaction } = await marinade.liquidateStakeAccount(new web3.PublicKey(stakeAccount))
          const transactionSignature = await sendTransaction(transaction, connection)
          onTransaction?.(transactionSignature)
        } catch (err) {
          if (err instanceof Error && !(err instanceof WalletError)) {
            onError?.(err)
          }
        } finally {
          setProcessingTransaction(false)
        }
      }}>Liquidate stake account!</Button>
  </div>
}
