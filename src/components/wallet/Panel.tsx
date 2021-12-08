import React, { FC } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useMarinade } from '../marinade/MarinadeProvider'
import { Deposit } from './Deposit'
import { DepositStakeAccount } from './DepositStakeAccount'
import { LiquidUnstake } from './LiquidUnstake'

interface PanelComponentProps {
  onError?: (_: Error) => void
  onTransaction?: (_: string) => void
}

export const Panel: FC<PanelComponentProps> = ({ onError, onTransaction }) => {
  const { wallet } = useWallet()
  const { marinade } = useMarinade()

  return <div className='panel'>
    <nav>
      <WalletMultiButton />
      {wallet && <WalletDisconnectButton />}
    </nav>
    {marinade && <>
      <Deposit onTransaction={onTransaction} onError={onError} />
      <LiquidUnstake onTransaction={onTransaction} onError={onError} />
      <DepositStakeAccount onTransaction={onTransaction} onError={onError} />
    </>}
  </div>
}
