import Module from '@app/module/Module';
import NoiseMap from '@app/noisemap';

/**
 * Abstract base class for a noise-map builder
 *
 * A builder class builds a noise map by filling it with coherent-noise
 * values generated from the surface of a three-dimensional mathematical
 * object.  Each builder class defines a specific three-dimensional
 * surface, such as a cylinder, sphere, or plane.
 *
 * A builder class describes these input values using a coordinate system
 * applicable for the mathematical object (e.g., a latitude/longitude
 * coordinate system for the spherical noise-map builder.)  It then
 * "flattens" these coordinates onto a plane so that it can write the
 * coherent-noise values into a two-dimensional noise map.
 */
export default abstract class Builder {
  /**
   * The source module.
   *
   * This object fills in a noise map with the coherent-noise values
   * from this source module.
   *
   * The source module must exist throughout the lifetime of this
   * object unless another noise module replaces that noise module.
   */
  public sourceModule: Module;
  /**
   * The destination noise map.
   *
   * The destination noise map will contain the coherent-noise values
   * from this noise map after a successful call to the build() method.
   *
   * The destination noise map must exist throughout the lifetime of
   * this object unless another noise map replaces that noise map.
   */
  public noiseMap: NoiseMap;

  /**
   * @param sourceModule The source module
   * @param width The width of the destination noise map, in points
   * @param height The height of the destination noise map, in points
   */
  public constructor(sourceModule: Module, width?: number, height?: number) {
    this.sourceModule = sourceModule;
    this.noiseMap = new NoiseMap(width, height);
  }

  // Functions
  /**
   * Builds the noise map.
   * @returns Updated instance of noise map
   */
  public abstract build(): NoiseMap;

  /**
   * Sets the size of the destination noise map.
   *
   * @param width The width of the destination noise map, in points.
   * @param height The height of the destination noise map, in points.
   *
   * This method does not change the size of the destination noise map
   * until the build() method is called.
   */
  public setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  // Properties
  /**
   * The width of the destination noise map, in points.
   *
   * This object does not change the width in the destination noise
   * map object until the build() method is called.
   */
  public get width(): number {
    return this.noiseMap.width;
  }
  public set width(width: number) {
    this.noiseMap.width = width;
  }

  /**
   * The height of the destination noise map, in points.
   *
   * This object does not change the height in the destination noise
   * map object until the build() method is called.
   */
  public get height(): number {
    return this.noiseMap.height;
  }
  public set height(height: number) {
    this.noiseMap.height = height;
  }
}