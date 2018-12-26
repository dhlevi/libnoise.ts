import Cylinder from '@app/model/cylinder';
import NoiseMap from '@app/noisemap';

class NoiseMapBuilderCylinder {
  private sourceModule: any;
  private width: number;
  private height: number;
  private noiseMap: NoiseMap;
  private _lowerAngleBound: number;
  private _lowerHeightBound: number;
  private _upperAngleBound: number;
  private _upperHeightBound: number;

  constructor(sourceModule?: any, width?: number, height?: number) {
    this.sourceModule = sourceModule || null;
    this.width = width || 256;
    this.height = height || 256;

    this.lowerAngleBound = 0.0;
    this.lowerHeightBound = 0.0;
    this.upperAngleBound = 1.0;
    this.upperHeightBound = 1.0;

    this.noiseMap = new NoiseMap(this.width, this.height);
  }

  public get lowerAngleBound() {
    return this._lowerAngleBound;
  }
  public set lowerAngleBound(v: number) {
    if (v >= this.upperAngleBound) {
      throw new Error('Lower angle bound cannot be equal to or exceed upper angle bound!');
    }

    this._lowerAngleBound = v;
  }

  public get lowerHeightBound() {
    return this._lowerHeightBound;
  }
  public set lowerHeightBound(v: number) {
    if (v >= this.upperHeightBound) {
      throw new Error('Lower angle height cannot be equal to or exceed upper angle height!');
    }

    this._lowerHeightBound = v;
  }

  public get upperAngleBound() {
    return this._upperAngleBound;
  }
  public set upperAngleBound(v: number) {
    if (v <= this.lowerAngleBound) {
      throw new Error('Upper angle bound cannot be equal to or less than lower angle bound!');
    }

    this._upperAngleBound = v;
  }

  public get upperHeightBound() {
    return this._upperHeightBound;
  }
  public set upperHeightBound(v: number) {
    if (v <= this.lowerHeightBound) {
      throw new Error('Upper angle height cannot be equal to or less than lower angle height!');
    }

    this._upperHeightBound = v;
  }

  public build() {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing module!');
    }

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

  public setBounds(lowerAngleBound: number, lowerHeightBound: number, upperAngleBound: number, upperHeightBound: number) {
    this.lowerAngleBound = lowerAngleBound;
    this.lowerHeightBound = lowerHeightBound;
    this.upperAngleBound = upperAngleBound;
    this.upperHeightBound = upperHeightBound;
  }
}

export default NoiseMapBuilderCylinder;
