import Misc from '@app/misc';
import Module from '@app/module';
import ModifierModule from './ModifierModule';

class Clamp extends ModifierModule {
  public static DEFAULT_CLAMP_LOWER_BOUND = -1;
  public static DEFAULT_CLAMP_UPPER_BOUND = 1;

  private _lowerBound: number = Clamp.DEFAULT_CLAMP_LOWER_BOUND;
  private _upperBound: number = Clamp.DEFAULT_CLAMP_UPPER_BOUND;

  constructor(sourceModule: Module, lowerBound?: number, upperBound?: number) {
    super(sourceModule);

    this.lowerBound = lowerBound || Clamp.DEFAULT_CLAMP_LOWER_BOUND;
    this.upperBound = upperBound || Clamp.DEFAULT_CLAMP_UPPER_BOUND;
  }

  public get lowerBound(): number {
    return this._lowerBound;
  }
  public set lowerBound(v: number) {
    if (v > this.upperBound) {
      throw new Error('Lower bound cannot exceed upper bound!');
    }

    this._lowerBound = v;
  }

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
    return Misc.clampValue(this.sourceModule.getValue(x, y, z), this.lowerBound, this.upperBound);
  }

  public setBounds(lowerBound: number, upperBound: number): void {
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
  }
}

export default Clamp;
