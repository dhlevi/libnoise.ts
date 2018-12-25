import Misc from '@app/misc';


class Clamp {
  private sourceModule: any;
  private _lowerBound: number;
  private _upperBound: number;

  constructor(sourceModule?: any, lowerBound?: number, upperBound?: number) {
    this.sourceModule = sourceModule || null;
    this.lowerBound = lowerBound || null;
    this.upperBound = upperBound || null;
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

  public getValue(x: number, y: number, z: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing source module!');
    }

    return Misc.clampValue(this.sourceModule.getValue(x, y, z), this.lowerBound, this.upperBound);
  }

  public setBounds(lowerBound: number, upperBound: number) {
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
  }
}

export default Clamp;
