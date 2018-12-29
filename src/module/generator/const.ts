class Const {
  public static DEFAULT_CONST_VALUE: number = 0.0;

  private value: number;

  constructor(v?: number) {
    this.value = v || Const.DEFAULT_CONST_VALUE;
  }

  // @TODO probably this will need unused parameters
  public getValue() {
    return this.value;
  }
}

export default Const;
