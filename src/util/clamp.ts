/**
 * Clamp a value to within a lower and upper bound.
 * If the value is lower than the lower bound, the lower bound is returned.
 * If the value is above the upper bound, the upper bound is returned.
 *
 * @param value The value to be clamped.
 * @param lowerBound The lower bound to restrict the value to.
 * @param upperBound The upper bound to restrict the value to.
 */
export default function clamp(value: number, lowerBound: number, upperBound: number): number {
  if (value < lowerBound) {
    return lowerBound;
  } else if (value > upperBound) {
    return upperBound;
  } else {
    return value;
  }
}
