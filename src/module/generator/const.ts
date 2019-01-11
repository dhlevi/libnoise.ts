import GeneratorModule from './GeneratorModule';

/**
 * Noise module that outputs a constant value.
 *
 * This noise module is not useful by itself, but it is often used as a
 * source module for other noise modules.
 *
 * This noise module does not require any source modules.
 */
class Const extends GeneratorModule {
  public static readonly DEFAULT_CONST_VALUE: number = 0.0;

  /**
   * The constant output value for this noise module.
   */
  public value: number;

  /**
   * @param value The constant output value for this noise module.
   */
  constructor(value?: number) {
    super();

    this.value = value || Const.DEFAULT_CONST_VALUE;
  }

  public getValue(): number {
    return this.value;
  }
}

export default Const;
