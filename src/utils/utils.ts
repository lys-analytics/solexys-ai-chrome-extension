import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(
  value: number,
  options?: { includePrefix?: boolean; maxSignificantDigits?: number },
): string {
  // Handle invalid inputs
  if (value === undefined || value === null || isNaN(value)) {
    return 'N/A';
  }

  const { includePrefix = false, maxSignificantDigits = 3 } = options || {};
  const prefix = includePrefix ? '$' : '';

  if (value >= 1_000_000_000) {
    return `${prefix}${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${prefix}${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${prefix}${(value / 1_000).toFixed(1)}K`;
  }

  // Handle small numbers with subscript notation
  if (value > 0 && value < 0.01) {
    // Convert to string and remove leading "0."
    const strValue = value.toString();

    // Handle scientific notation if present
    if (strValue.includes('e-')) {
      const [base, exponent] = strValue.split('e-');
      const zeroCount = parseInt(exponent) - 1;

      // Get the digits after removing zeros
      const significantDigits = base.replace('.', '');

      // Create the subscript number (how many zeros after decimal point)
      const subscriptNumber = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
      const subscriptStr = zeroCount
        .toString()
        .split('')
        .map((d) => subscriptNumber[parseInt(d)])
        .join('');

      // Limit significant digits and add subscript for truncated part
      const visibleDigits = significantDigits.substring(0, maxSignificantDigits);

      // Validate that truncatedDigits.length is a number before using it
      const truncatedDigits = significantDigits.substring(maxSignificantDigits);
      const truncatedLength = truncatedDigits.length;

      // Only add trailing subscript if there are truncated digits and the length is valid
      const trailingSubscript =
        truncatedLength > 0 && truncatedLength <= 9 ? subscriptNumber[truncatedLength] : '';

      // Format as 0.0₍subscript₎ + limited significant digits + truncation subscript
      return `${prefix}0.0${subscriptStr}${visibleDigits}${trailingSubscript}`;
    } else {
      // Count zeros after decimal point
      let zeroCount = 0;
      for (let i = 2; i < strValue.length; i++) {
        if (strValue[i] === '0') {
          zeroCount++;
        } else {
          break;
        }
      }

      if (zeroCount > 0) {
        // Create the subscript number
        const subscriptNumber = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
        const subscriptStr = zeroCount
          .toString()
          .split('')
          .map((d) => subscriptNumber[parseInt(d)])
          .join('');

        // Get the significant digits after the zeros
        const significantDigits = strValue.substring(2 + zeroCount);

        // Limit significant digits and add subscript for truncated part
        const visibleDigits = significantDigits.substring(0, maxSignificantDigits);

        // Validate that truncatedDigits.length is a number before using it
        const truncatedDigits = significantDigits.substring(maxSignificantDigits);
        const truncatedLength = truncatedDigits.length;

        // Only add trailing subscript if there are truncated digits and the length is valid
        const trailingSubscript =
          truncatedLength > 0 && truncatedLength <= 9 ? subscriptNumber[truncatedLength] : '';

        // Format as 0.0₍subscript₎ + limited significant digits + truncation subscript
        return `${prefix}0.0${subscriptStr}${visibleDigits}${trailingSubscript}`;
      }
    }
  }

  // Default case for normal numbers
  return `${prefix}${value.toFixed(2)}`;
}

export interface RAGSource {
  id: string;
  fileName: string;
  snippet: string;
  score: number;
}
