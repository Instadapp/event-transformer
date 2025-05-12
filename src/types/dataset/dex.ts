import type { Address } from "viem";
import type { VaultToken } from "./vault";

export interface IDex {
  dex: Address;
  address: Address;
  id: string;
  token0Address: Address;
  token0: VaultToken;
  token1Address: Address;
  token1: VaultToken;
  totalSupplyShares: string;
  collateral: Collateral;
  totalBorrowShares: string;
  debt: Debt;
  state: State;
  pex: Pex;
  configs: IDexConfigs;
  shifts: Shifts;
  limitsAndAvailability: IDexLimitsAndAvailability;
}

interface Collateral {
  isSmartCollateralEnabled: boolean;
  isSmartCollateral: boolean;
  token0RealReserves: string;
  token1RealReserves: string;
  token0ImaginaryReserves: string;
  token1ImaginaryReserves: string;
  token0PerShare: string;
  token1PerShare: string;
}

interface Debt {
  isSmartDebtEnabled: boolean;
  token0Debt: string;
  token1Debt: string;
  token0RealReserves: string;
  token1RealReserves: string;
  token0ImaginaryReserves: string;
  token1ImaginaryReserves: string;
  token0PerShare: string;
  token1PerShare: string;
}

interface State {
  isSwapAndArbitragePaused: boolean;
  centerPrice: string;
  lastUpdateTimestamp: string;
  lastPricesTimeDiff: string;
  oracleCheckPoint: string;
  oracleMapping: string;
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

interface IDexConfigs {
  fee: string;
  revenueCut: string;
  upperRange: string;
  lowerRange: string;
  upperShiftThreshold: string;
  lowerShiftThreshold: string;
  shiftingTime: string;
  centerPriceAddress: string;
  hookAddress: string;
  maxCenterPrice: string;
  minCenterPrice: string;
  utilizationLimitToken0: string;
  utilizationLimitToken1: string;
  totalOracleMapingSlots: string;
  maxSupplyShares: string;
  maxBorrowShares: string;
}

interface Shifts {
  isRangeChangeActive: boolean;
  isThresholdChangeActive: boolean;
  isCenterPriceShiftActive: boolean;
  rangeShift: RangeShift;
  thresholdShift: ThresholdShift;
  centerPriceShift: CenterPriceShift;
}

interface RangeShift {
  oldUpper: string;
  oldLower: string;
  duration: string;
  startTimestamp: string;
  oldTime: string;
}

interface ThresholdShift {
  oldUpper: string;
  oldLower: string;
  duration: string;
  startTimestamp: string;
  oldTime: string;
}

interface CenterPriceShift {
  shiftPercentage: string;
  duration: string;
  startTimestamp: string;
}

interface IDexLimitsAndAvailability {
  liquiditySupplyToken0: string;
  liquiditySupplyToken1: string;
  liquidityBorrowToken0: string;
  liquidityBorrowToken1: string;
  liquidityWithdrawableToken0: string;
  liquidityWithdrawableToken1: string;
  liquidityBorrowableToken0: string;
  liquidityBorrowableToken1: string;
  utilizationLimitToken0: string;
  utilizationLimitToken1: string;
  withdrawableUntilUtilizationLimitToken0: string;
  withdrawableUntilUtilizationLimitToken1: string;
  borrowableUntilUtilizationLimitToken0: string;
  borrowableUntilUtilizationLimitToken1: string;
  liquidityUserSupplyDataToken0: LiquidityUserSupplyDataToken0;
  liquidityUserSupplyDataToken1: LiquidityUserSupplyDataToken1;
  liquidityUserBorrowDataToken0: LiquidityUserBorrowDataToken0;
  liquidityUserBorrowDataToken1: LiquidityUserBorrowDataToken1;
}

interface LiquidityUserSupplyDataToken0 {
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

interface LiquidityUserSupplyDataToken1 {
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

interface LiquidityUserBorrowDataToken0 {
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

interface LiquidityUserBorrowDataToken1 {
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
