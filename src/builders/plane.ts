import Interpolation from '@app/interpolation';
import Plane from '@app/model/plane';
import Module from '@app/module/Module';
import NoiseMap from '@app/noisemap';
import Builder from './Builder';

/**
 * Builds a planar noise map.
 *
 * This class builds a noise map by filling it with coherent-noise values
 * generated from the surface of a plane.
 *
 * This class describes these input values using (x, z) coordinates.
 * Their z coordinates are always 0.0.
 *
 * The application must provide the lower and upper x coordinate bounds
 * of the noise map, in units, and the lower and upper z coordinate
 * bounds of the noise map, in units.
 *
 * To make a tileable noise map with no seams at the edges, set `seamless` to true.
 */
class NoiseMapBuilderPlane extends Builder {
  /**
   * A flag that enables or disables seamless tiling.
   *
   * Enabling seamless tiling builds a noise map with no seams at the
   * edges.  This allows the noise map to be tileable.
   */
  public isSeamless: boolean;
  private _lowerXBound: number = 0;
  private _lowerZBound: number = 0;
  private _upperXBound: number = 1;
  private _upperZBound: number = 1;

  /**
   * @param sourceModule The source module
   * @param width The width of the destination noise map, in points
   * @param height The height of the destination noise map, in points
   * @param isSeamless A flag that enables or disables seamless tiling
   */
  constructor(sourceModule: Module, width?: number, height?: number, isSeamless: boolean = false) {
    super(sourceModule, width, height);

    this.isSeamless = isSeamless;
  }

  /**
   * The lower x boundary of the noise map, in units.
   *
   * The lower x boundary must be less than the upper x boundary.
   */
  public get lowerXBound(): number {
    return this._lowerXBound;
  }
  public set lowerXBound(value: number) {
    if (value >= this.upperXBound) {
      throw new Error('Lower X bound cannot be equal to or exceed upper X bound!');
    }

    this._lowerXBound = value;
  }

  /**
   * The lower z boundary of the noise map, in units.
   *
   * The lower z boundary must be less than the upper z boundary.
   */
  public get lowerZBound(): number {
    return this._lowerZBound;
  }
  public set lowerZBound(value: number) {
    if (value >= this.upperZBound) {
      throw new Error('Lower Z bound cannot be equal to or exceed upper Z bound!');
    }

    this._lowerZBound = value;
  }

  /**
   * The upper x boundary of the noise map, in units.
   *
   * The upper x boundary must be greater than the lower x boundary.
   */
  public get upperXBound(): number {
    return this._upperXBound;
  }
  public set upperXBound(value: number) {
    if (value <= this.lowerXBound) {
      throw new Error('Upper X bound cannot be equal to or less than lower X bound!');
    }

    this._upperXBound = value;
  }

  /**
   * The upper z boundary of the noise map, in units.
   *
   * The upper z boundary must be greater than the lower z boundary.
   */
  public get upperZBound(): number {
    return this._upperZBound;
  }
  public set upperZBound(value: number) {
    if (value <= this.lowerZBound) {
      throw new Error('Upper Z bound cannot be equal to or less than lower Z bound!');
    }

    this._upperZBound = value;
  }

  public build(): NoiseMap {
    let xExtent = this.upperXBound - this.lowerXBound;
    let zExtent = this.upperZBound - this.lowerZBound;

    // Create the plane model.
    let plane = new Plane(this.sourceModule);
    let xDelta = xExtent / this.width;
    let zDelta = zExtent / this.height;

    let currentX = this.lowerXBound;
    let currentZ = this.lowerZBound;

    // Fill every point in the noise map with the output values from the model.
    for (let z = 0; z < this.height; z++) {
      currentX = this.lowerXBound;

      for (let x = 0; x < this.width; x++) {
        let value;
        if (!this.isSeamless) {
          value = plane.getValue(currentX, currentZ);
        } else {
          let xBlend = 1.0 - ((currentX - this.lowerXBound) / xExtent);

          value = Interpolation.linear(
            Interpolation.linear(
              plane.getValue(currentX, currentZ),
              plane.getValue(currentX + xExtent, currentZ),
              xBlend,
            ),
            Interpolation.linear(
              plane.getValue(currentX, currentZ + zExtent),
              plane.getValue(currentX + xExtent, currentZ + zExtent),
              xBlend,
            ),
            1.0 - ((currentZ - this.lowerZBound) / zExtent),
          );
        }

        this.noiseMap.setValue(x, z, value);

        currentX += xDelta;
      }

      currentZ += zDelta;
    }

    return this.noiseMap;
  }

  /**
   * Sets the boundaries of the planar noise map.
   *
   * @param lowerXBound The lower x boundary of the noise map, in units.
   * @param lowerZBound The lower z boundary of the noise map, in units.
   * @param upperXBound The upper x boundary of the noise map, in units.
   * @param upperZBound The upper z boundary of the noise map, in units.
   */
  public setBounds(lowerXBound: number, lowerZBound: number, upperXBound: number, upperZBound: number): void {
    this.upperXBound = upperXBound;
    this.upperZBound = upperZBound;
    this.lowerXBound = lowerXBound;
    this.lowerZBound = lowerZBound;
  }
}

export default NoiseMapBuilderPlane;
