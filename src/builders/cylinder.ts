import Cylinder from '@app/model/cylinder';
import NoiseMap from '@app/noisemap';
import Builder from './Builder';

class NoiseMapBuilderCylinder extends Builder {
  private _lowerAngleBound: number = 0;
  private _lowerHeightBound: number = 0;
  private _upperAngleBound: number = 1;
  private _upperHeightBound: number = 1;

  public get lowerAngleBound(): number {
    return this._lowerAngleBound;
  }
  public set lowerAngleBound(v: number) {
    if (v >= this.upperAngleBound) {
      throw new Error('Lower angle bound cannot be equal to or exceed upper angle bound!');
    }

    this._lowerAngleBound = v;
  }

  public get lowerHeightBound(): number {
    return this._lowerHeightBound;
  }
  public set lowerHeightBound(v: number) {
    if (v >= this.upperHeightBound) {
      throw new Error('Lower angle height cannot be equal to or exceed upper angle height!');
    }

    this._lowerHeightBound = v;
  }

  public get upperAngleBound(): number {
    return this._upperAngleBound;
  }
  public set upperAngleBound(v: number) {
    if (v <= this.lowerAngleBound) {
      throw new Error('Upper angle bound cannot be equal to or less than lower angle bound!');
    }

    this._upperAngleBound = v;
  }

  public get upperHeightBound(): number {
    return this._upperHeightBound;
  }
  public set upperHeightBound(v: number) {
    if (v <= this.lowerHeightBound) {
      throw new Error('Upper angle height cannot be equal to or less than lower angle height!');
    }

    this._upperHeightBound = v;
  }

  public build(): NoiseMap {
    // Create the cylinder model.
    let cylinder = new Cylinder(this.sourceModule);
    let xDelta = (this.upperAngleBound - this.lowerAngleBound) / this.width;
    let yDelta = (this.upperHeightBound - this.lowerHeightBound) / this.height;
    let curAngle = this.lowerAngleBound;
    let curHeight = this.lowerHeightBound;

    // Fill every point in the noise map with the output values from the model.
    for (let y = 0; y < this.height; y++) {
      curAngle = this.lowerAngleBound;

      for (let x = 0; x < this.width; x++) {
        this.noiseMap.setValue(x, y, cylinder.getValue(curAngle, curHeight));
        curAngle += xDelta;
      }

      curHeight += yDelta;
    }

    return this.noiseMap;
  }

  public setBounds(lowerAngleBound: number, lowerHeightBound: number, upperAngleBound: number, upperHeightBound: number): void {
    this.lowerAngleBound = lowerAngleBound;
    this.lowerHeightBound = lowerHeightBound;
    this.upperAngleBound = upperAngleBound;
    this.upperHeightBound = upperHeightBound;
  }
}

export default NoiseMapBuilderCylinder;
