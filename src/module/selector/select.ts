
import Interpolation from '@app/interpolation';
import Module from '@app/module';
import SelectorModule from './SelectorModule';

class Select extends SelectorModule {
  public static DEFAULT_SELECT_EDGE_FALLOFF = 0.0;
  public static DEFAULT_SELECT_LOWER_BOUND = -1.0;
  public static DEFAULT_SELECT_UPPER_BOUND = 1.0;

  private controlModule: Module;
  private _edge: number = Select.DEFAULT_SELECT_EDGE_FALLOFF;
  private _lowerBound: number = Select.DEFAULT_SELECT_LOWER_BOUND;
  private _upperBound: number = Select.DEFAULT_SELECT_UPPER_BOUND;

  constructor(sourceModuleA: Module, sourceModuleB: Module, controlModule: Module, edge?: number, lowerBound?: number, upperBound?: number) {
    super(sourceModuleA, sourceModuleB);

    this.controlModule = controlModule;
    this.edge = edge || Select.DEFAULT_SELECT_EDGE_FALLOFF;
    this.lowerBound = lowerBound || Select.DEFAULT_SELECT_LOWER_BOUND;
    this.upperBound = upperBound || Select.DEFAULT_SELECT_UPPER_BOUND;
  }

  public get edge() {
    return this._edge;
  }
  public set edge(v: number) {
    // Make sure that the edge falloff curves do not overlap.
    let size = this.upperBound - this.lowerBound;
    let half = size / 2;

    this._edge = (v > half) ? half : v;
  }

  public get lowerBound() {
    return this._lowerBound;
  }
  public set lowerBound(v: number) {
    if (v > this.upperBound) {
      throw new Error('Lower bound cannot exceed upper bound!');
    }

    this._lowerBound = v;
  }

  public get upperBound() {
    return this._upperBound;
  }
  public set upperBound(v: number) {
    if (v < this.lowerBound) {
      throw new Error('Upper bound cannot be less than lower bound!');
    }

    this._upperBound = v;
  }

  public setBounds(lower: number, upper: number) {
    this.upperBound = upper;
    this.lowerBound = lower;
  }

  public getValue(x: number, y: number, z: number) {
    let lowerCurve, upperCurve;
    let controlValue = this.controlModule.getValue(x, y, z);

    if (this.edge > 0.0) {
      if (controlValue < (this.lowerBound - this.edge)) {
        // The output value from the control module is below the selector
        // threshold; return the output value from the first source module.
        return this.sourceModuleA.getValue(x, y, z);
      } else if (controlValue < (this.lowerBound + this.edge)) {
        // The output value from the control module is near the lower end of the
        // selector threshold and within the smooth curve. Interpolate between
        // the output values from the first and second source modules.
        lowerCurve = (this.lowerBound - this.edge);
        upperCurve = (this.lowerBound + this.edge);

        return Interpolation.linear(
          this.sourceModuleA.getValue(x, y, z),
          this.sourceModuleB.getValue(x, y, z),
          Interpolation.cubicSCurve((controlValue - lowerCurve) / (upperCurve - lowerCurve)),
        );
      } else if (controlValue < (this.upperBound - this.edge)) {
        // The output value from the control module is within the selector
        // threshold; return the output value from the second source module.
        return this.sourceModuleB.getValue(x, y, z);
      } else if (controlValue < (this.upperBound + this.edge)) {
        // The output value from the control module is near the upper end of the
        // selector threshold and within the smooth curve. Interpolate between
        // the output values from the first and second source modules.
        lowerCurve = (this.upperBound - this.edge);
        upperCurve = (this.upperBound + this.edge);

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
