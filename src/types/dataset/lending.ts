import type { Address } from "viem";
import type { IVaultRewards, LiquiditySupplyData, SupplyDexData, VaultToken } from "./vault";

export interface ILendingTokensResponse {
  totalAssetsInUsd: string;
  yearlyYieldInUsd: string;
  data: ILendingToken[];
}

export interface ISmartLendingToken {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  tokens: {
    token0: VaultToken;
    token1: VaultToken;
  };
  totalSupply: string;
  exchangePrice: string;
  dex: SupplyDexData;
  liquiditySupplyData: LiquiditySupplyData;
  totalUnderlyingAssetsToken0: string;
  totalUnderlyingAssetsToken1: string;
  rewards?: IVaultRewards[];
  rate: {
    liquidity: {
      token0: string;
      token1: string;
    };
    dex: {
      trading: string;
    };
    lending: {
      rate: string;
    };
  };
}


export interface ILendingToken {
  address: Address;
  eip2612Deposits: boolean;
  isNativeUnderlying: boolean;
  name: string;
  symbol: string;
  decimals: number;
  assetAddress: string;
  asset: Asset;
  totalAssets: string;
  totalSupply: string;
  convertToShares: string;
  convertToAssets: string;
  rewardsRate: string;
  supplyRate: string;
  totalRate: string;
  liquiditySupplyData: LiquiditySupplyDataToken;
  tokenRewards: ITokenRewards;
  rewards?: IVaultRewards[];
}

interface ITokenRewards {
  rewardPerToken: string;
  rewardContract: Address;
  getRewardForDuration: string;
  totalSupply: string;
  periodFinish: string;
  rewardRate: string;
  rewardsDuration: string;
  rewardsToken: string;
  token: string;
  apr: string;
}


interface LiquiditySupplyDataToken {
  modeWithInterest: boolean;
  supply: string;
  withdrawalLimit: string;
  lastUpdateTimestamp: string;
  expandPercent: string;
  expandDuration: string;
  baseWithdrawalLimit: string;
  withdrawableUntilLimit: string;
  withdrawable: string;
}
interface Asset {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  price: string;
  chainId: string;
  logoUrl: string;
  coingeckoId: string;
  stakingApr?: string;
}
