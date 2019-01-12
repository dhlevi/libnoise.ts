import MathConsts from '@app/mathconsts';
import Module from '@app/module/Module';
import TransformerModule from './TransformerModule';

/**
 * Noise module that rotates the input value around the origin before
 * returning the output value from a source module.
 *
 * The getValue() method rotates the coordinates of the input value
 * around the origin before returning the output value from the source
 * module.  To set the rotation angles, call the setAngles() method.  To
 * set the rotation angle around the individual x, y, or z axes,
 * set the xAngle(), yAngle() or zAngle() properties, respectively.
 *
 * The coordinate system of the input value is assumed to be
 * "left-handed" (x increases to the right, y increases upward,
 * and z increases inward.)
 *
 * This noise module requires one source module.
 */
class RotatePoint extends TransformerModule {
  public static readonly DEFAULT_ROTATE_X = 0.0;
  public static readonly DEFAULT_ROTATE_Y = 0.0;
  public static readonly DEFAULT_ROTATE_Z = 0.0;

  // @TODO dear lord make a matrix class
  private x1matrix: number = 0;
  private x2matrix: number = 0;
  private x3matrix: number = 0;
  private y1matrix: number = 0;
  private y2matrix: number = 0;
  private y3matrix: number = 0;
  private z1matrix: number = 0;
  private z2matrix: number = 0;
  private z3matrix: number = 0;
  private _xAngle: number = RotatePoint.DEFAULT_ROTATE_X;
  private _yAngle: number = RotatePoint.DEFAULT_ROTATE_Y;
  private _zAngle: number = RotatePoint.DEFAULT_ROTATE_Z;

  /**
   *
   * @param sourceModule The noise module that is used to generate the output values.
   * @param xAngle The rotation angle around the x axis, in degrees.
   * @param yAngle The rotation angle around the y axis, in degrees.
   * @param zAngle The rotation angle around the z axis, in degrees.
   */
  constructor(sourceModule: Module, xAngle?: number, yAngle?: number, zAngle?: number) {
    super(sourceModule);

    this.xAngle = xAngle || RotatePoint.DEFAULT_ROTATE_X;
    this.yAngle = yAngle || RotatePoint.DEFAULT_ROTATE_Y;
    this.zAngle = zAngle || RotatePoint.DEFAULT_ROTATE_Z;

    this.calcMatrices();
  }

  /**
   * The rotation angle around the x axis, in degrees.
   */
  public get xAngle(): number {
    return this._xAngle;
  }
  public set xAngle(v: number) {
    this._xAngle = v;

    this.calcMatrices();
  }

  /**
   * The rotation angle around the y axis, in degrees.
   */
  public get yAngle(): number {
    return this._yAngle;
  }
  public set yAngle(v: number) {
    this._yAngle = v;

    this.calcMatrices();
  }

  /**
   * The rotation angle around the z axis, in degrees.
   */
  public get zAngle(): number {
    return this._zAngle;
  }
  public set zAngle(v: number) {
    this._zAngle = v;

    this.calcMatrices();
  }

  /**
   * Recompute rotation matrices, to be called whenever either
   * xAngle, yAngle or zAngle updates.
   */
  private calcMatrices(): void {
    let xCos = Math.cos(this.xAngle * MathConsts.DEG_TO_RAD);
    let yCos = Math.cos(this.yAngle * MathConsts.DEG_TO_RAD);
    let zCos = Math.cos(this.zAngle * MathConsts.DEG_TO_RAD);
    let xSin = Math.sin(this.xAngle * MathConsts.DEG_TO_RAD);
    let ySin = Math.sin(this.yAngle * MathConsts.DEG_TO_RAD);
    let zSin = Math.sin(this.zAngle * MathConsts.DEG_TO_RAD);

    this.x1matrix = ySin * xSin * zSin + yCos * zCos;
    this.y1matrix = xCos * zSin;
    this.z1matrix = ySin * zCos - yCos * xSin * zSin;
    this.x2matrix = ySin * xSin * zCos - yCos * zSin;
    this.y2matrix = xCos * zCos;
    this.z2matrix = -yCos * xSin * zCos - ySin * zSin;
    this.x3matrix = -ySin * xCos;
    this.y3matrix = xSin;
    this.z3matrix = yCos * xCos;
  }

  public getValue(x: number, y: number, z: number): number {
    return this.sourceModule.getValue(
      (this.x1matrix * x) + (this.y1matrix * y) + (this.z1matrix * z),
      (this.x2matrix * x) + (this.y2matrix * y) + (this.z2matrix * z),
      (this.x3matrix * x) + (this.y3matrix * y) + (this.z3matrix * z),
    );
  }

  /**
   * Sets the rotation angles around all three axes to apply to the
   * input value.
   *
   * The getValue() method rotates the coordinates of the input value
   * around the origin before returning the output value from the
   * source module.
   *
   * @param xAngle The rotation angle around the x axis, in degrees.
   * @param yAngle The rotation angle around the y axis, in degrees.
   * @param zAngle The rotation angle around the z axis, in degrees.
   */
  public setAngles(xAngle: number, yAngle: number, zAngle: number): void {
    this.xAngle = xAngle;
    this.yAngle = yAngle;
    this.zAngle = zAngle;
  }
}

export default RotatePoint;
