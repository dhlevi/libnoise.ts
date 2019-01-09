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
 * This class describes these input values using (x, y) coordinates.
 * Their z coordinates are always 0.0.
 *
 * The application must provide the lower and upper x coordinate bounds
 * of the noise map, in units, and the lower and upper y coordinate
 * bounds of the noise map, in units.
 *
 * To make a tileable noise map with no seams at the edges, set `seamless` to true.
 */
// @TODO refactor y coordinates into z coordinates
class NoiseMapBuilderPlane extends Builder {
  /**
   * A flag that enables or disables seamless tiling.
   *
   * Enabling seamless tiling builds a noise map with no seams at the
   * edges.  This allows the noise map to be tileable.
   */
  public seamless: boolean;
  private _lowerXBound: number = 0;
  private _lowerYBound: number = 0;
  private _upperXBound: number = 1;
  private _upperYBound: number = 1;

  /**
   * @param sourceModule The source module
   * @param width The width of the destination noise map, in points
   * @param height The height of the destination noise map, in points
   * @param seamless A flag that enables or disables seamless tiling
   */
  constructor(sourceModule: Module, width: number = 256, height: number = 256, seamless: boolean = false) {
    super(sourceModule, width, height);

    this.seamless = seamless;
  }

  /**
   * The lower x boundary of the noise map, in units.
   *
   * The lower x boundary must be less than the upper x boundary.
   */
  public get lowerXBound(): number {
    return this._lowerXBound;
  }
  public set lowerXBound(v: number) {
    if (v >= this.upperXBound) {
      throw new Error('Lower X bound cannot be equal to or exceed upper X bound!');
    }

    this._lowerXBound = v;
  }

  /**
   * The lower y boundary of the noise map, in units.
   *
   * The lower y boundary must be less than the upper y boundary.
   */
  public get lowerYBound(): number {
    return this._lowerYBound;
  }
  public set lowerYBound(v: number) {
    if (v >= this.upperYBound) {
      throw new Error('Lower Y bound cannot be equal to or exceed upper Y bound!');
    }

    this._lowerYBound = v;
  }

  /**
   * The upper x boundary of the noise map, in units.
   *
   * The upper x boundary must be greater than the lower x boundary.
   */
  public get upperXBound(): number {
    return this._upperXBound;
  }
  public set upperXBound(v: number) {
    if (v <= this.lowerXBound) {
      throw new Error('Upper X bound cannot be equal to or less than lower X bound!');
    }

    this._upperXBound = v;
  }

  /**
   * The upper y boundary of the noise map, in units.
   *
   * The upper y boundary must be greater than the lower y boundary.
   */
  public get upperYBound(): number {
    return this._upperYBound;
  }
  public set upperYBound(v: number) {
    if (v <= this.lowerYBound) {
      throw new Error('Upper Y bound cannot be equal to or less than lower Y bound!');
    }

    this._upperYBound = v;
  }

  public build(): NoiseMap {
    let xExtent = this.upperXBound - this.lowerXBound;
    let yExtent = this.upperYBound - this.lowerYBound;

    // @TODO is this possible? seems to be covered by validation in setters
    if (xExtent < 0 || yExtent < 0) {
      throw new Error('Invalid bounds!');
    }

    // Create the plane model.
    let plane = new Plane(this.sourceModule);
    let xDelta = xExtent / this.width;
    let yDelta = yExtent / this.height;
    let curX = this.lowerXBound;
    let curY = this.lowerYBound;
    let value;
    let xBlend;

    // Fill every point in the noise map with the output values from the model.
    for (let y = 0; y < this.height; y++) {
      curX = this.lowerXBound;

      for (let x = 0; x < this.width; x++) {
        if (!this.seamless) {
          value = plane.getValue(curX, curY);
        } else {
          xBlend = 1.0 - ((curX - this.lowerXBound) / xExtent);

          value = Interpolation.linear(
            Interpolation.linear(
              plane.getValue(curX, curY),
              plane.getValue(curX + xExtent, curY),
              xBlend,
            ),
            Interpolation.linear(
              plane.getValue(curX, curY + yExtent),
              plane.getValue(curX + xExtent, curY + yExtent),
              xBlend,
            ),
            1.0 - ((curY - this.lowerYBound) / yExtent),
          );
        }

        this.noiseMap.setValue(x, y, value);

        curX += xDelta;
      }

      curY += yDelta;
    }

    return this.noiseMap;
  }

  /**
   * Sets the boundaries of the planar noise map.
   *
   * @param lowerXBound The lower x boundary of the noise map, in units.
   * @param lowerYBound The lower y boundary of the noise map, in units.
   * @param upperXBound The upper x boundary of the noise map, in units.
   * @param upperYBound The upper y boundary of the noise map, in units.
   */
  public setBounds(lowerXBound: number, lowerYBound: number, upperXBound: number, upperYBound: number): void {
    this.upperXBound = upperXBound;
    this.upperYBound = upperYBound;
    this.lowerXBound = lowerXBound;
    this.lowerYBound = lowerYBound;
  }
}

export default NoiseMapBuilderPlane;
