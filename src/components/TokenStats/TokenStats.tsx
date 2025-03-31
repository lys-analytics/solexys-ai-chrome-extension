import { useSolanaConverter } from '../../hooks/useSolanaConverter';
import { TokenDetails } from '../../types/token-details';
import { FC } from 'react';
import { formatNumber } from '../../utils/utils';

interface TokenStatsCardProps {
  token: TokenDetails;
}

export const TokenStatsCard: FC<TokenStatsCardProps> = ({ token }) => {
  const { convertSolanaToCurrency } = useSolanaConverter();

  const formattedHolders = token.holders?.toLocaleString() || '0';
  const formattedPrice = token.price ? `$${convertSolanaToCurrency(token.price)}` : 'N/A';
  const formattedLiquidity = token.liquidity
    ? `$${convertSolanaToCurrency(token.liquidity)}`
    : 'N/A';

  // Calculate buy/sell volume ratio if available
  const buySellRatio = token.volume24h > 0 ? '50%' : '0%'; // Placeholder value

  // Get the total supply
  let totalSupply = 'N/A';
  if (token.totalSupply) {
    const decimals = 6; // This is an assumption, ideally we'd get decimals from the token info
    const supplyNumber = Number(token.totalSupply) / Math.pow(10, decimals);
    totalSupply = formatNumber(supplyNumber);
  }

  return (
    <div>
      <h3 className="text-sm text-center mb-4">Token Info</h3>

      <div className="grid grid-cols-3 border border-border rounded-md overflow-hidden">
        {/* Top Row */}
        <div className="flex flex-col items-center justify-center p-3 border-r border-b border-border">
          <div className="text-primary font-semibold text-xs">{totalSupply}</div>
          <div className="text-xs text-gray-500">Total Supply</div>
        </div>
        <div className="flex flex-col items-center justify-center p-3 border-r border-b border-border">
          <div className="text-green-500 font-semibold text-xs">{buySellRatio}</div>
          <div className="text-xs text-gray-500">Buy Volume</div>
        </div>
        <div className="flex flex-col items-center justify-center p-3 border-b border-border">
          <div className="text-red-500 font-semibold text-xs">{100 - parseInt(buySellRatio)}%</div>
          <div className="text-xs text-gray-500">Sell Volume</div>
        </div>

        {/* Middle Row */}
        <div className="flex flex-col items-center justify-center p-3 border-r border-b border-border">
          <div className="text-primary font-semibold text-xs">{formattedHolders}</div>
          <div className="text-xs text-gray-500">Holders</div>
        </div>
        <div className="flex flex-col items-center justify-center p-3 border-r border-b border-border">
          <div className="text-primary font-semibold text-xs">
            {token.uniqueTraders?.toLocaleString() || '0'}
          </div>
          <div className="text-xs text-gray-500">Unique Traders</div>
        </div>
        <div className="flex flex-col items-center justify-center p-3 border-b border-border">
          <div className="text-primary font-semibold text-xs">
            {token.markets?.toLocaleString() || '0'}
          </div>
          <div className="text-xs text-gray-500">Markets</div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col items-center justify-center p-3 border-r border-border">
          <div className="text-xs font-semibold">{formattedPrice}</div>
          <div className="text-xs text-gray-500">Price</div>
        </div>
        <div className="flex flex-col items-center justify-center p-3 border-r border-border">
          <div className="text-xs font-semibold">${formatNumber(token.volume24h || 0)}</div>
          <div className="text-xs text-gray-500">24h Volume</div>
        </div>
        <div className="flex flex-col items-center justify-center p-3">
          <div className="text-xs font-semibold">{formattedLiquidity}</div>
          <div className="text-xs text-gray-500">Liquidity</div>
        </div>
      </div>
    </div>
  );
};
