function calculateNumber(
  type: "increase" | "decrease" | "replace",
  currentValue: number,
  maxValue: number,
  minValue: number
) {
  if (type === "increase") {
    const nextValue = currentValue + 1;
    return nextValue <= maxValue ? nextValue : minValue;
  }
  if (type === "decrease") {
    const prevValue = currentValue - 1;
    return prevValue >= minValue ? prevValue : maxValue;
  }
  return currentValue;
}

export default calculateNumber;
