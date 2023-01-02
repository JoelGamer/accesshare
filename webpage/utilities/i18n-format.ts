export const formatNumber = (
  value: number,
  options?: Intl.NumberFormatOptions,
  locale?: string | string[],
) => (Number.isNaN(value) ? '' : Intl.NumberFormat(locale, { useGrouping: false, ...options }).format(value));

export const currencyFormat = (value: number) => formatNumber(value, { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 });