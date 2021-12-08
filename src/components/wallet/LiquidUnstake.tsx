import React, { FC, useState } from 'react'
import { MarinadeUtils } from '@marinade.finance/marinade-ts-sdk'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@solana/wallet-adapter-react-ui/lib/Button'
import { WalletError } from '@solana/wallet-adapter-base'
import { Input } from '@mui/material'
import { useMarinade } from '../marinade/MarinadeProvider'
import { Loader } from '../utility/Loader'

interface LiquidUnstakeComponentProps {
  onTransaction?: (_: string) => void
  onError?: (_: Error) => void
}

export const LiquidUnstake: FC<LiquidUnstakeComponentProps> = ({ onError, onTransaction }) => {
  const [amount, setAmount] = useState(0)
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

  return <div>
    <Input
      onChange={(e) => setAmount(Number(e.target.value) || 0)}
      placeholder='SOL amount to unstake'
    />
    <Button
      onClick={async () => {
        try {
          setProcessingTransaction(true)
          const { transaction } = await marinade.liquidUnstake(MarinadeUtils.solToLamports(amount))
          const transactionSignature = await sendTransaction(transaction, connection)
          onTransaction?.(transactionSignature)
        } catch (err) {
          if (err instanceof Error && !(err instanceof WalletError)) {
            onError?.(err)
          }
        } finally {
          setProcessingTransaction(false)
        }
      }}>Unstake SOL immediately!</Button>
  </div>
}
