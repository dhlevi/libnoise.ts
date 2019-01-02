export default function clamp(value: number, lowerBound: number, upperBound: number): number {
  if (value < lowerBound) {
    return lowerBound;
  } else if (value > upperBound) {
    return upperBound;
  } else {
    return value;
  }
}
