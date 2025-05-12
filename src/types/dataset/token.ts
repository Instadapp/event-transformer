import type { Address } from "viem";

export interface ITokenPrice {
  address: Address;
  chain_id: string;
  name: string;
  symbol: string;
  decimals: number;
  logo_url: string;
  price: string;
  coingecko_id: string;
  sparkline_price_7d: number[];
}
