import Module from '@app/module/Module';
import ModifierModule from './ModifierModule';

/**
 * Noise module that maps the output value from a source module onto an
 * exponential curve.
 *
 * Because most noise modules will output values that range from -1.0 to
 * +1.0, this noise module first normalizes this output value (the range
 * becomes 0.0 to 1.0), maps that value onto an exponential curve, then
 * rescales that value back to the original range.
 *
 * This noise module requires one source module.
 */
class Exponent extends ModifierModule {
  /**
   * Exponent to apply to the output value from the source module.
   */
  public exp: number;

  /**
   * @param sourceModule The noise module that is used to generate the output values.
   * @param exponent Exponent to apply to the output value from the source module.
   */
  constructor(sourceModule: Module, exponent?: number) {
    super(sourceModule);

    this.exp = exponent || 1;
  }

  public getValue(x: number, y: number, z: number): number {
    return Math.pow(Math.abs((this.sourceModule.getValue(x, y, z) + 1.0) / 2.0), this.exp) * 2.0 - 1.0;
  }
}

export default Exponent;
