export interface TokenDetails {
  name: string;
  symbol: string;
  imageUrl: string;
  mint: string;
  description: string;
  price: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  markets: number;
  volume24h: number;
  uniqueTraders: number;
  blockTime: number;

  // Add the new fields here
  bondingCurve: string;
  user: string;
  isSpecial: boolean;
  signature: string;
  txIndex: number;
  index: number;
  hasError: boolean | null;
  txFee: number;
  blockHeight: number;
  localTime: number;
  totalSupply?: string; // Total token supply from on-chain data
}
