const Misc = {
  clampValue(value: number, lowerBound: number, upperBound: number): number {
    if (value < lowerBound) {
      return lowerBound;
    } else if (value > upperBound) {
      return upperBound;
    } else {
      return value;
    }
  },

  exponentFilter(value: number, cover: number, sharpness: number): number {
    let c = value - (255 - cover);

    if (c < 0) {
      c = 0;
    }

    return 255 - Math.floor(Math.pow(sharpness, c) * 255);
  },

  normalizeValue(value: number, lowerBound: number, upperBound: number): number {
    return (value - lowerBound) / (upperBound - lowerBound);
  },

  // @TODO overload instead of this mess
  // @TODO tuple type again
  swapValues(a: any | any[], b?: any): number[] {
    if (Array.isArray(a)) {
      a = a[0];
      b = a[1];
    }

    return [b, a];
  },
};

export default Misc;
