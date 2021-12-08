import React, { FC, useState } from 'react'
import { MarinadeUtils } from '@marinade.finance/marinade-ts-sdk'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@solana/wallet-adapter-react-ui/lib/Button'
import { WalletError } from '@solana/wallet-adapter-base'
import { Input } from '@mui/material'
import { useMarinade } from '../marinade/MarinadeProvider'
import { Loader } from '../utility/Loader'

interface DepositComponentProps {
  onTransaction?: (_: string) => void
  onError?: (_: Error) => void
}

export const Deposit: FC<DepositComponentProps> = ({ onError, onTransaction }) => {
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

  return <div className='deposit'>
    <Input
      onChange={(e) => setAmount(Number(e.target.value) || 0)}
      placeholder='SOL amount to stake'
    />
    <Button
      onClick={async () => {
        try {
          setProcessingTransaction(true)
          const { transaction } = await marinade.deposit(MarinadeUtils.solToLamports(amount))
          const transactionSignature = await sendTransaction(transaction, connection)
          onTransaction?.(transactionSignature)
        } catch (err) {
          if (err instanceof Error && !(err instanceof WalletError)) {
            onError?.(err)
          }
        } finally {
          setProcessingTransaction(false)
        }
      }}>Stake SOL using Marinade!</Button>
  </div>
}
