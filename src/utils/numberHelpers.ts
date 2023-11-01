export function formatNumberString(number: string, decimalPlaces: number) {
  const [whole, decimal] = number.split('.');
  if (decimal) {
    return `${whole}.${decimal.slice(0, decimalPlaces)}`;
  }
  return whole;
}

export function formatNumberIsNeeded(number: string, decimalPlaces: number) {
  // eslint-disable-next-line
  const [whole, decimal] = number.split('.');
  if (decimal) {
    return decimal.length > decimalPlaces;
  }
  return false;
}
