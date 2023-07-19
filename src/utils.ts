export function calculateNumber(
  type: 'increase' | 'decrease' | 'replace',
  currentValue: number,
  maxValue: number,
  minValue: number
) {
  switch (type) {
    case 'increase':
      const nextValue = currentValue + 1;
      return nextValue <= maxValue ? nextValue : minValue;
    case 'decrease':
      const prevValue = currentValue - 1;
      return prevValue >= minValue ? prevValue : maxValue;
    default:
      return currentValue;
  }
}
