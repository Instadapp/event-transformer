import type { Hex } from 'viem';

export type { IVault} from './vault'
export type { ITokenPrice } from './token'
export type { ILendingTokensResponse, ISmartLendingToken } from './lending'
export type { IDex } from './dex'


export interface SimulationRaw {
 address: string;
 topics: [Hex, ...Hex[]];
 data: Hex;
}

export type SupportedChainIds =  1 | 42_161 | 8453 | 137;