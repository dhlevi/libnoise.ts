import Sphere from '@app/model/sphere';
import Module from '@app/module/Module';
import NoiseMap from '@app/noisemap';
import Builder from './Builder';

/**
 * Builds a spherical noise map.
 *
 * This class builds a noise map by filling it with coherent-noise values
 * generated from the surface of a sphere.
 *
 * This class describes these input values using a (latitude, longitude)
 * coordinate system.  After generating the coherent-noise value from the
 * input value, it then "flattens" these coordinates onto a plane so that
 * it can write the values into a two-dimensional noise map.
 *
 * The sphere model has a radius of 1.0 unit.  Its center is at the
 * origin.
 *
 * The x coordinate in the noise map represents the longitude.  The y
 * coordinate in the noise map represents the latitude.
 *
 * The application must provide the southern, northern, western, and
 * eastern bounds of the noise map, in degrees.
 */
class NoiseMapBuilderSphere extends Builder {
  private _eastLonBound: number;
  private _northLatBound: number;
  private _southLatBound: number;
  private _westLonBound: number;

  /**
   * @param sourceModule The source module
   * @param width The width of the destination noise map, in points
   * @param height The height of the destination noise map, in points
   */
  constructor(sourceModule: Module, width: number = 256, height: number = 256) {
    super(sourceModule, width, height);

    this._northLatBound = 0.0;
    this._southLatBound = 0.0;
    this._eastLonBound = 0.0;
    this._westLonBound = 0.0;
  }

  /**
   * Northern boundary of the spherical noise map, in degrees.
   *
   * The northern latitudinal bound must be greater than the southern latitudinal bound.
   */
  public get northLatBound(): number {
    return this._northLatBound;
  }
  public set northLatBound(v: number) {
    if (v <= this.southLatBound) {
      throw new Error('North latitudinal bound cannot be equal to or less than south latitudinal bound!');
    }

    this._northLatBound = v;
  }

  /**
   * Southern boundary of the spherical noise map, in degrees.
   *
   * The southern latitudinal bound must be less than the northern latitudinal bound.
   */
  public get southLatBound(): number {
    return this._southLatBound;
  }
  public set southLatBound(v: number) {
    if (v >= this.northLatBound) {
      throw new Error('South latitudinal bound cannot be equal to or exceed north latitudinal bound!');
    }

    this._southLatBound = v;
  }

  /**
   * Eastern boundary of the spherical noise map, in degrees.
   *
   * The eastern longitudinal bound must be greater than the western longitudinal bound.
   */
  public get eastLonBound(): number {
    return this._eastLonBound;
  }
  public set eastLonBound(v: number) {
    if (v <= this.westLonBound) {
      throw new Error('East longitudinal bound cannot be equal to or less than west longitudinal bound!');
    }

    this._eastLonBound = v;
  }

  /**
   * Western boundary of the spherical noise map, in degrees.
   *
   * The western longitudinal bound must be greater than the eastern longitudinal bound.
   */
  public get westLonBound(): number {
    return this._westLonBound;
  }
  public set westLonBound(v: number) {
    if (v >= this.eastLonBound) {
      throw new Error('West longitudinal bound cannot be equal to or exceed east longitudinal bound!');
    }

    this._westLonBound = v;
  }

  public build(): NoiseMap {
    // Create the cylinder model.
    let sphere = new Sphere(this.sourceModule);
    let xDelta = (this.eastLonBound - this.westLonBound) / this.width;
    let yDelta = (this.northLatBound - this.southLatBound) / this.height;
    let curLon = this.westLonBound;
    let curLat = this.eastLonBound;

    // Fill every point in the noise map with the output values from the model.
    for (let y = 0; y < this.height; y++) {
      curLon = this.westLonBound;

      for (let x = 0; x < this.width; x++) {
        this.noiseMap.setValue(x, y, sphere.getValue(curLat, curLon));

        curLon += xDelta;
      }

      curLat += yDelta;
    }

    return this.noiseMap;

  }

  /**
   * Sets the coordinate boundaries of the noise map.
   *
   * @param southLatBound The southern boundary of the noise map, in degrees.
   * @param northLatBound The northern boundary of the noise map, in degrees.
   * @param westLonBound The western boundary of the noise map, in degrees.
   * @param eastLonBound The eastern boundary of the noise map, in degrees.
   */
  public setBounds(southLatBound: number, northLatBound: number, westLonBound: number, eastLonBound: number): void {
    this.southLatBound = southLatBound;
    this.northLatBound = northLatBound;
    this.westLonBound = westLonBound;
    this.eastLonBound = eastLonBound;
  }
}

export default NoiseMapBuilderSphere;
