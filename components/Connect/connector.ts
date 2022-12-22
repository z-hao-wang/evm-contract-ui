import { InjectedConnector } from '@web3-react/injected-connector'

export const CHAIN_IDS = [
  1,
  42, // Kovan
  420, //goerli
  56, //bsc
  137, // polygon
  128, // HECO
]

export const injected = new InjectedConnector({ supportedChainIds: CHAIN_IDS })
