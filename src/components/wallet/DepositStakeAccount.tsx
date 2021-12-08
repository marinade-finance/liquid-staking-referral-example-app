import React, { FC, useState } from 'react'
import { web3 } from '@marinade.finance/marinade-ts-sdk'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@solana/wallet-adapter-react-ui/lib/Button'
import { WalletError } from '@solana/wallet-adapter-base'
import { Input } from '@mui/material'
import { useMarinade } from '../marinade/MarinadeProvider'
import { Loader } from '../utility/Loader'

interface DepositStakeAccountComponentProps {
  onTransaction?: (_: string) => void
  onError?: (_: Error) => void
}

export const DepositStakeAccount: FC<DepositStakeAccountComponentProps> = ({ onError, onTransaction }) => {
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

  return <div className='deposit'>
    <Input
      onChange={(e) => setStakeAccount(e.target.value)}
      placeholder='Delegated stake account'
    />
    <Button
      onClick={async () => {
        try {
          setProcessingTransaction(true)
          const { transaction } = await marinade.depositStakeAccount(new web3.PublicKey(stakeAccount))
          const transactionSignature = await sendTransaction(transaction, connection)
          onTransaction?.(transactionSignature)
        } catch (err) {
          if (err instanceof Error && !(err instanceof WalletError)) {
            onError?.(err)
          }
        } finally {
          setProcessingTransaction(false)
        }
      }}>Deposit stake account!</Button>
  </div>
}
