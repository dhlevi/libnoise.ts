export default class Tuple<T> {
  public item1: T;
  public item2: T;

  constructor(item1: T, item2: T) {
    this.item1 = item1;
    this.item2 = item2;
  }

  public toString(): string {
    return `[${this.item1}, ${this.item2}]`;
  }
}