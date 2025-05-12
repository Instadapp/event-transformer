import type { Address } from "viem";

export interface VaultToken {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  price: string;
  chainId: string;
  logoUrl: string;
  coingeckoId: string;
  stakingApr: string;
}

export interface IVault {
  id: string;
  type: string;
  address: Address;
  supplyToken: {
    token0: VaultToken;
    token1?: VaultToken;
  };
  borrowToken: {
    token0: VaultToken;
    token1?: VaultToken;
  };
  totalSupply: string;
  totalSupplyLiquidity: string;
  totalBorrow: string;
  totalBorrowShares: string;
  totalSupplyShares: string;
  totalBorrow1: string;
  totalSupply1: string;
  totalBorrowLiquidity: string;
  absorbedSupply: string;
  absorbedBorrow: string;
  supplyRateMagnifier: number;
  borrowRateMagnifier: number;
  collateralFactor: number;
  liquidationThreshold: number;
  liquidationMaxLimit: number;
  liquidationPenalty: number;
  withdrawLimit: string;
  withdrawableUntilLimit: string;
  withdrawable: string;
  borrowLimit: string;
  borrowableUntilLimit: string;
  borrowable: string;
  borrowLimitUtilization: string;
  minimumBorrowing: string;
  totalPositions: string;
  oracle: string;
  withdrawalGap: number;
  oraclePriceLiquidate: string;
  oraclePriceOperate: string;
  liquiditySupplyData: LiquiditySupplyData;
  liquidityBorrowData: LiquidityBorrowData;
  supplyDexData: SupplyDexData;
  borrowDexData: BorrowDexData;
  borrowRate: VaultRate;
  supplyRate: VaultRate;
  rewards?: IVaultRewards[];
}

interface BorrowDexData {
  id: string;
  address: Address;
  lastStoredPrice: string;
  token0Debt: string;
  token1Debt: string;
  token0RealReserves: string;
  token1RealReserves: string;
  token0ImaginaryReserves: string;
  token1ImaginaryReserves: string;
  totalShares: string;
  maxShares: string;
  token0PerShare: string;
  token1PerShare: string;
  fee: string;
  pex: Pex;
}

interface Pex {
  lastStoredPrice: string;
  centerPrice: string;
  upperRange: string;
  lowerRange: string;
  geometricMean: string;
  supplyToken0ExchangePrice: string;
  borrowToken0ExchangePrice: string;
  supplyToken1ExchangePrice: string;
  borrowToken1ExchangePrice: string;
}

export interface SupplyDexData {
  id: string;
  address: Address;
  lastStoredPrice: string;
  token0RealReserves: string;
  token1RealReserves: string;
  token0ImaginaryReserves: string;
  token1ImaginaryReserves: string;
  totalShares: string;
  token0PerShare: string;
  token1PerShare: string;
  maxShares: string;
  fee: string;
  pex: Pex;
}

export interface IVaultRewards {
  token: VaultToken;
  rate: string;
  endBlock: number;
  type: "borrow" | "supply";
}

interface VaultRate {
  liquidity: {
    token0: string;
    token1: string;
  };
  dex: {
    trading: string;
  };
  vault: {
    rate: string;
    feeRate: string;
  };
}

export interface LiquiditySupplyData {
  token0: LiquiditySupplyDataToken;
  token1: LiquiditySupplyDataToken;
  dex: LiquiditySupplyDataToken;
}

interface LiquidityBorrowData {
  token0: LiquidityBorrowDataToken;
  token1: LiquidityBorrowDataToken;
  dex: LiquidityBorrowDataToken;
}

interface LiquidityBorrowDataToken {
  modeWithInterest: boolean;
  borrow: string;
  borrowLimit: string;
  lastUpdateTimestamp: string;
  expandPercent: string;
  expandDuration: string;
  baseBorrowLimit: string;
  maxBorrowLimit: string;
  borrowableUntilLimit: string;
  borrowable: string;
  borrowLimitUtilization: string;
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
