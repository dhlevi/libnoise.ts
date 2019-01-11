
import Interpolation from '@app/interpolation';
import Module from '@app/module/Module';
import SelectorModule from './SelectorModule';

/**
 * Noise module that outputs the value selected from one of two source
 * modules chosen by the output value from a control module.
 *
 * Source modules A and B output the values to blend.
 * The control module determines the value to select.  If
 * the output value from the control module is within a range of values
 * known as the *selection range*, this noise module outputs the
 * value from source module A.  Otherwise, this noise module outputs
 * the value from source module B.
 *
 * To specify the bounds of the selection range, call the setBounds()
 * method.
 *
 * By default, there is an abrupt transition between the output values
 * from the two source modules at the selection-range boundary.  To
 * smooth the transition, set a non-zero value to the edgeFalloff
 * property.  Higher values result in a smoother transition.
 *
 * This noise module requires two source modules and one control module.
 */
class Select extends SelectorModule {
  public static readonly DEFAULT_SELECT_EDGE_FALLOFF = 0.0;
  public static readonly DEFAULT_SELECT_LOWER_BOUND = -1.0;
  public static readonly DEFAULT_SELECT_UPPER_BOUND = 1.0;

  /**
   * The control module.
   *
   * The control module determines the output value to select.  If the
   * output value from the control module is within a range of values
   * known as the *selection range*, the getValue() method outputs
   * the value from the source module with an index value of 1.
   * Otherwise, this method outputs the value from the source module
   * with an index value of 0.
   */
  public controlModule: Module;

  private _edgeFalloff: number = Select.DEFAULT_SELECT_EDGE_FALLOFF;
  private _lowerBound: number = Select.DEFAULT_SELECT_LOWER_BOUND;
  private _upperBound: number = Select.DEFAULT_SELECT_UPPER_BOUND;

  /**
   * @param sourceModuleA Noise module that is used to generate the output values.
   * @param sourceModuleB Noise module that is used to generate the output values.
   * @param controlModule Noise module that is used to control the blend between
   *  sourceModuleA and sourceModuleB.
   */
  constructor(sourceModuleA: Module, sourceModuleB: Module, controlModule: Module, edge?: number, lowerBound?: number, upperBound?: number) {
    super(sourceModuleA, sourceModuleB);

    this.controlModule = controlModule;
    this.edgeFalloff = edge || Select.DEFAULT_SELECT_EDGE_FALLOFF;
    this.lowerBound = lowerBound || Select.DEFAULT_SELECT_LOWER_BOUND;
    this.upperBound = upperBound || Select.DEFAULT_SELECT_UPPER_BOUND;
  }

  /**
   * Edge-falloff value.
   *
   * The falloff value is the width of the edge transition at either
   * edge of the selection range.
   *
   * By default, there is an abrupt transition between the values from
   * the two source modules at the boundaries of the selection range.
   *
   * For example, if the selection range is 0.5 to 0.8, and the edge
   * falloff value is 0.1, then the getValue() method outputs:
   * - the output value from the source module with an index value of 0
   *   if the output value from the control module is less than 0.4
   *   ( = 0.5 - 0.1).
   * - a linear blend between the two output values from the two source
   *   modules if the output value from the control module is between
   *   0.4 ( = 0.5 - 0.1) and 0.6 ( = 0.5 + 0.1).
   * - the output value from the source module with an index value of 1
   *   if the output value from the control module is between 0.6
   *   ( = 0.5 + 0.1) and 0.7 ( = 0.8 - 0.1).
   * - a linear blend between the output values from the two source
   *   modules if the output value from the control module is between
   *   0.7 ( = 0.8 - 0.1 ) and 0.9 ( = 0.8 + 0.1).
   * - the output value from the source module with an index value of 0
   *   if the output value from the control module is greater than 0.9
   *   ( = 0.8 + 0.1).
   */
  public get edgeFalloff(): number {
    return this._edgeFalloff;
  }
  public set edgeFalloff(v: number) {
    // Make sure that the edge falloff curves do not overlap.
    let size = this.upperBound - this.lowerBound;
    let half = size / 2;

    this._edgeFalloff = (v > half) ? half : v;
  }

  /**
   * Lower bound of the selection range.
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
   * Upper bound of the selection range.
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

  /**
   * Sets the lower and upper bounds of the selection range.
   *
   * If the output value from the control module is within the
   * selection range, the getValue() method outputs the value from
   * source module B.  Otherwise, this method outputs the value
   * from the source module A.
   *
   * @param lowerBound The lower bound.
   * @param upperBound The upper bound.
   *
   */
  public setBounds(lowerBound: number, upperBound: number): void {
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
  }

  public getValue(x: number, y: number, z: number): number {
    let lowerCurve, upperCurve;
    let controlValue = this.controlModule.getValue(x, y, z);

    if (this.edgeFalloff > 0.0) {
      if (controlValue < (this.lowerBound - this.edgeFalloff)) {
        // The output value from the control module is below the selector
        // threshold; return the output value from the first source module.
        return this.sourceModuleA.getValue(x, y, z);
      } else if (controlValue < (this.lowerBound + this.edgeFalloff)) {
        // The output value from the control module is near the lower end of the
        // selector threshold and within the smooth curve. Interpolate between
        // the output values from the first and second source modules.
        lowerCurve = (this.lowerBound - this.edgeFalloff);
        upperCurve = (this.lowerBound + this.edgeFalloff);

        return Interpolation.linear(
          this.sourceModuleA.getValue(x, y, z),
          this.sourceModuleB.getValue(x, y, z),
          Interpolation.cubicSCurve((controlValue - lowerCurve) / (upperCurve - lowerCurve)),
        );
      } else if (controlValue < (this.upperBound - this.edgeFalloff)) {
        // The output value from the control module is within the selector
        // threshold; return the output value from the second source module.
        return this.sourceModuleB.getValue(x, y, z);
      } else if (controlValue < (this.upperBound + this.edgeFalloff)) {
        // The output value from the control module is near the upper end of the
        // selector threshold and within the smooth curve. Interpolate between
        // the output values from the first and second source modules.
        lowerCurve = (this.upperBound - this.edgeFalloff);
        upperCurve = (this.upperBound + this.edgeFalloff);

        return Interpolation.linear(
          this.sourceModuleB.getValue(x, y, z),
          this.sourceModuleA.getValue(x, y, z),
          Interpolation.cubicSCurve((controlValue - lowerCurve) / (upperCurve - lowerCurve)),
        );
      }

      // Output value from the control module is above the selector threshold;
      // return the output value from the first source module.
      return this.sourceModuleA.getValue(x, y, z);
    } else {
      return (controlValue < this.lowerBound || controlValue > this.upperBound)
        ? this.sourceModuleA.getValue(x, y, z)
        : this.sourceModuleB.getValue(x, y, z);
    }
  }
}

export default Select;
