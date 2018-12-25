class Const {
  public static DEFAULT_CONST_VALUE: number = 0.0;
  value: number;

  constructor(v) {
    this.value = v || Const.DEFAULT_CONST_VALUE;
  }

  getValue() {
    return this.value;
  }
}

export default Const;
