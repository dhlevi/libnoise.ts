/**
 * Tuple class. For storing a pair of values.
 */
export default class Tuple<T> {
  /**
   * First item in pair.
   */
  public item1: T;
  /**
   * Second item in pair.
   */
  public item2: T;

  /**
   * @param item1 First item in pair.
   * @param item2 Second item in pair.
   */
  constructor(item1: T, item2: T) {
    this.item1 = item1;
    this.item2 = item2;
  }

  /**
   * Render the tuple in a pretty format.
   * @example "[1, 2]"
   */
  public toString(): string {
    return `[${this.item1}, ${this.item2}]`;
  }
}