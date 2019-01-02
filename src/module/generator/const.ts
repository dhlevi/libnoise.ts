import GeneratorModule from './GeneratorModule';

class Const extends GeneratorModule {
  public static readonly DEFAULT_CONST_VALUE: number = 0.0;

  private value: number;

  constructor(v?: number) {
    super();

    this.value = v || Const.DEFAULT_CONST_VALUE;
  }

  public getValue(): number {
    return this.value;
  }
}

export default Const;
