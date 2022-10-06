import React, { FC, useMemo } from 'react'
import { Adapter, WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js'
import { Link } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
import { MarinadeProvider } from '../marinade/MarinadeProvider'
import { Panel } from './Panel'
import { Notification, NotificationType } from '../utility/Notification'

import '@solana/wallet-adapter-react-ui/styles.css'
import './Wallet.css'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

const exploreTransactionLink = (network: string, tx: string) => `https://explorer.solana.com/tx/${tx}?cluster=${network}`

export const Wallet: FC = () => {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  // @solana/wallet-adapter-wallets imports all the adapters but supports tree shaking --
  // Only the wallets you want to support will be compiled into your application
  const wallets = useMemo(() => [
    new SolflareWalletAdapter(),
    new PhantomWalletAdapter(),
  ], [])

  const onTransaction = (tx: string) => toast.custom(<Notification type={NotificationType.SUCCESS}><Link href={exploreTransactionLink(network, tx)} target='_blank'>{tx}</Link></Notification>)
  const onError = (error: Error) => toast.custom(<Notification type={NotificationType.ERROR}>{error.message}</Notification>)

  return <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets as Adapter[]} onError={onError} autoConnect>
      <WalletModalProvider>
        <MarinadeProvider>
          <Panel onError={onError} onTransaction={onTransaction} />
          <Toaster position='bottom-right' reverseOrder={false} />
        </MarinadeProvider>
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
}
