import Module from '@app/module/Module';
import TransformerModule from './TransformerModule';

/**
 * Noise module that scales the coordinates of the input value before
 * returning the output value from a source module.
 *
 * The getValue() method multiplies the ( x, y, z ) coordinates
 * of the input value with a scaling factor before returning the output
 * value from the source module.  To set the scaling factor, call the
 * setScales() method.  To set the scaling factor to apply to the
 * individual x, y, or z coordinates, set the xScale,
 * yScale or zScale properties, respectively.
 *
 * This noise module requires one source module.
 */
class ScalePoint extends TransformerModule {
  public static readonly DEFAULT_SCALE_POINT_X = 1.0;
  public static readonly DEFAULT_SCALE_POINT_Y = 1.0;
  public static readonly DEFAULT_SCALE_POINT_Z = 1.0;

  /**
   * The scaling factor to apply to the x coordinate.
   */
  public xScale: number;
  /**
   * The scaling factor to apply to the y coordinate.
   */
  public yScale: number;
  /**
   * The scaling factor to apply to the z coordinate.
   */
  public zScale: number;

  /**
   * @param sourceModule The noise module that is used to generate the output values.
   * @param xScale The scaling factor to apply to the x coordinate.
   * @param yScale The scaling factor to apply to the y coordinate.
   * @param zScale The scaling factor to apply to the z coordinate.
   */
  constructor(sourceModule: Module, xScale?: number, yScale?: number, zScale?: number) {
    super(sourceModule);

    this.xScale = xScale || ScalePoint.DEFAULT_SCALE_POINT_X;
    this.yScale = yScale || ScalePoint.DEFAULT_SCALE_POINT_Y;
    this.zScale = zScale || ScalePoint.DEFAULT_SCALE_POINT_Z;
  }

  /**
   * Sets the scaling factor to apply to the ( x, y, z )
   * coordinates of the input value.
   *
   * The getValue() method multiplies the ( x, y, z )
   * coordinates of the input value with a scaling factor before
   * returning the output value from the source module.
   *
   * @param xScale The scaling factor to apply to the x coordinate.
   * @param yScale The scaling factor to apply to the y coordinate.
   * @param zScale The scaling factor to apply to the z coordinate.
   */
  public setScales(xScale: number, yScale: number, zScale: number): void {
    this.xScale = xScale;
    this.yScale = yScale;
    this.zScale = zScale;
  }

  public getValue(x: number, y: number, z: number): number {
    return this.sourceModule.getValue(
      x * this.xScale,
      y * this.yScale,
      z * this.zScale,
    );
  }
}

export default ScalePoint;
