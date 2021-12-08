import { Marinade, MarinadeConfig, web3 } from '@marinade.finance/marinade-ts-sdk'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React, { Context, createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

export interface MarinadeContext {
  marinade: Marinade | null
}

const defaultContext: MarinadeContext = { marinade: null }
const MarinadeContext: Context<MarinadeContext> = createContext(defaultContext)

export const useMarinade = () => useContext(MarinadeContext)

interface MarinadeProviderProps {
  children: ReactNode
}

export const MarinadeProvider: FC<MarinadeProviderProps> = ({ children }) => {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [marinade, setMarinade] = useState<Marinade | null>(null)

  useEffect(() => {
    if (!publicKey) {
      setMarinade(null)
      return
    }

    // !!! You have to put in your own Referral Code on the line below !!!
    const referralCode = new web3.PublicKey('mRtnRH2M3rMLP4BBcrxkk4WBKsSi3JvoyUEog7gf3qE')
    // !!! Then uncomment the `referralCode` configuration option !!!
    const config = new MarinadeConfig({ connection, publicKey/*, referralCode*/ })
    const marinade = new Marinade(config)

    setMarinade(marinade)
  }, [connection, publicKey])

  return <MarinadeContext.Provider value={{ marinade }}>
    {children}
  </MarinadeContext.Provider>
}
