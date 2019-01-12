import Cylinder from '@app/model/cylinder';
import NoiseMap from '@app/noisemap';
import Builder from './Builder';

/**
 * Builds a cylindrical noise map.
 *
 * This class builds a noise map by filling it with coherent-noise values
 * generated from the surface of a cylinder.
 *
 * This class describes these input values using an (angle, height)
 * coordinate system.  After generating the coherent-noise value from the
 * input value, it then "flattens" these coordinates onto a plane so that
 * it can write the values into a two-dimensional noise map.
 *
 * The cylinder model has a radius of 1.0 unit and has infinite height.
 * The cylinder is oriented along the y axis.  Its center is at the
 * origin.
 *
 * The x coordinate in the noise map represents the angle around the
 * cylinder's y axis.  The y coordinate in the noise map represents the
 * height above the x-z plane.
 *
 * The application must provide the lower and upper angle bounds of the
 * noise map, in degrees, and the lower and upper height bounds of the
 * noise map, in units.
 */
class NoiseMapBuilderCylinder extends Builder {
  private _lowerAngleBound: number = 0;
  private _lowerHeightBound: number = 0;
  private _upperAngleBound: number = 1;
  private _upperHeightBound: number = 1;

  /**
   * Lower angle boundary of the cylindrical noise map, in degrees.
   *
   * The lower angle boundary must be less than the upper angle boundary.
   */
  public get lowerAngleBound(): number {
    return this._lowerAngleBound;
  }
  public set lowerAngleBound(value: number) {
    if (value >= this.upperAngleBound) {
      throw new Error('Lower angle bound cannot be equal to or exceed upper angle bound!');
    }

    this._lowerAngleBound = value;
  }

  /**
   * Lower height boundary of the cylindrical noise map, in units.
   * One unit is equal to the radius of the cylinder.
   *
   * The lower height boundary must be less than the upper height boundary.
   */
  public get lowerHeightBound(): number {
    return this._lowerHeightBound;
  }
  public set lowerHeightBound(value: number) {
    if (value >= this.upperHeightBound) {
      throw new Error('Lower angle height cannot be equal to or exceed upper angle height!');
    }

    this._lowerHeightBound = value;
  }

  /**
   * Upper angle boundary of the cylindrical noise map, in degrees.
   *
   * The upper angle boundary must be greater than the lower angle boundary.
   */
  public get upperAngleBound(): number {
    return this._upperAngleBound;
  }
  public set upperAngleBound(value: number) {
    if (value <= this.lowerAngleBound) {
      throw new Error('Upper angle bound cannot be equal to or less than lower angle bound!');
    }

    this._upperAngleBound = value;
  }

  /**
   * Upper height boundary of the cylindrical noise map, in units.
   * One unit is equal to the radius of the cylinder.
   *
   * The upper height boundary must be greater than the lower height boundary.
   */
  public get upperHeightBound(): number {
    return this._upperHeightBound;
  }
  public set upperHeightBound(value: number) {
    if (value <= this.lowerHeightBound) {
      throw new Error('Upper angle height cannot be equal to or less than lower angle height!');
    }

    this._upperHeightBound = value;
  }

  public build(): NoiseMap {
    if (!this.sourceModule) {
      throw new Error("Cannot build cylinder model, source module is empty");
    }

    // Create the cylinder model.
    let cylinder = new Cylinder(this.sourceModule);
    let xDelta = (this.upperAngleBound - this.lowerAngleBound) / this.width;
    let yDelta = (this.upperHeightBound - this.lowerHeightBound) / this.height;
    let currentAngle = this.lowerAngleBound;
    let currentHeight = this.lowerHeightBound;

    // Fill every point in the noise map with the output values from the model.
    for (let y = 0; y < this.height; y++) {
      currentAngle = this.lowerAngleBound;

      for (let x = 0; x < this.width; x++) {
        this.noiseMap.setValue(x, y, cylinder.getValue(currentAngle, currentHeight));
        currentAngle += xDelta;
      }

      currentHeight += yDelta;
    }

    return this.noiseMap;
  }

  /**
   * Sets the coordinate boundaries of the noise map.
   *
   * @param lowerAngleBound The lower angle boundary of the noise map, in degrees.
   * @param upperAngleBound The upper angle boundary of the noise map, in degrees.
   * @param lowerHeightBound The lower height boundary of the noise map, in units.
   * @param upperHeightBound The upper height boundary of the noise map, in units.
   *
   * One unit is equal to the radius of the cylinder.
   */
  public setBounds(lowerAngleBound: number, upperAngleBound: number, lowerHeightBound: number, upperHeightBound: number): void {
    this.lowerAngleBound = lowerAngleBound;
    this.upperAngleBound = upperAngleBound;
    this.lowerHeightBound = lowerHeightBound;
    this.upperHeightBound = upperHeightBound;
  }
}

export default NoiseMapBuilderCylinder;
