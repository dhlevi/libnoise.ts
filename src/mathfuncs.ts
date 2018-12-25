const MathFuncs = {
  makeInt32Range(n: number) {
    if (n >= 1073741824.0) {
      return (2.0 * (n % 1073741824.0)) - 1073741824.0;
    } else if (n <= -1073741824.0) {
      return (2.0 * (n % 1073741824.0)) + 1073741824.0;
    }

    return n;
  }
};

export default MathFuncs;
