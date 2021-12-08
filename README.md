# <p align="center"><a href="https://marinade.finance/"><img src="https://raw.githubusercontent.com/marinade-finance/liquid-staking-program/main/Docs/img/MNDE.png" height="100" alt="Marinade"></a>

# liquid-staking-referral-app

This is a simple React app which showcases the usage of [Marinade TS SDK](https://github.com/marinade-finance/marinade-ts-sdk) to help you build your own applications based on [Marinade](https://marinade.finance)!

## Installation and usage
1) Clone the repo and install dependencies
```bash
git clone git@github.com:marinade-finance/liquid-staking-referral-app.git
cd liquid-staking-referral-app
npm run install
```
2) Set the `Referral Code` in `src/components/marinade/MarinadeProvider.tsx` so the code reads as:
```ts
...
const referralCode = new web3.PublicKey('<<YOUR REFERRAL CODE>>')
const config = new MarinadeConfig({ connection, publicKey, referralCode })
const marinade = new Marinade(config)
...
```
3) Run it:
```bash
npm run dev
```
Now a new tab in your browser should be opened with the example app loaded.


## Learn more
- [Marinade web](https://marinade.finance)
- [Marinade docs](https://docs.marinade.finance/)
- [Join on Discord](https://discord.com/invite/6EtUf4Euu6)
