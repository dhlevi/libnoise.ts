import Module from '@app/module/Module';
import { clamp } from '@app/util';
import ModifierModule from './ModifierModule';

/**
 * Noise module that clamps the output value from a source module to a
 * range of values.
 *
 * The range of values in which to clamp the output value is called the
 * *clamping range*.
 *
 * If the output value from the source module is less than the lower
 * bound of the clamping range, this noise module clamps that value to
 * the lower bound.  If the output value from the source module is
 * greater than the upper bound of the clamping range, this noise module
 * clamps that value to the upper bound.
 *
 * This noise module requires one source module.
 */
class Clamp extends ModifierModule {
  public static readonly DEFAULT_CLAMP_LOWER_BOUND = -1;
  public static readonly DEFAULT_CLAMP_UPPER_BOUND = 1;

  private _lowerBound: number = Clamp.DEFAULT_CLAMP_LOWER_BOUND;
  private _upperBound: number = Clamp.DEFAULT_CLAMP_UPPER_BOUND;

  /**
   * @param sourceModule The noise module that is used to generate the output values.
   * @param lowerBound Lower bound of the clamping range.
   * @param upperBound Upper bound of the clamping range.
   */
  constructor(sourceModule: Module, lowerBound?: number, upperBound?: number) {
    super(sourceModule);

    this.lowerBound = lowerBound || Clamp.DEFAULT_CLAMP_LOWER_BOUND;
    this.upperBound = upperBound || Clamp.DEFAULT_CLAMP_UPPER_BOUND;
  }

  /**
   * Lower bound of the clamping range.
   */
  public get lowerBound(): number {
    return this._lowerBound;
  }
  public set lowerBound(v: number) {
    if (v > this.upperBound) {
      throw new Error('Lower bound cannot exceed upper bound!');
    }

    this._lowerBound = v;
  }

  /**
   * Upper bound of the clamping range.
   */
  public get upperBound(): number {
    return this._upperBound;
  }
  public set upperBound(v: number) {
    if (v < this.lowerBound) {
      throw new Error('Upper bound cannot be less than lower bound!');
    }

    this._upperBound = v;
  }

  public getValue(x: number, y: number, z: number): number {
    return clamp(this.sourceModule.getValue(x, y, z), this.lowerBound, this.upperBound);
  }

  /**
   * Sets the lower and upper bounds of the clamping range.
   *
   * If the output value from the source module is less than the lower
   * bound of the clamping range, this noise module clamps that value
   * to the lower bound.  If the output value from the source module
   * is greater than the upper bound of the clamping range, this noise
   * module clamps that value to the upper bound.
   *
   * @param lowerBound The lower bound.
   * @param upperBound The upper bound.
   */
  public setBounds(lowerBound: number, upperBound: number): void {
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
  }
}

export default Clamp;
