import MathConsts from '@app/mathconsts';
import Module from '@app/module';
import TransformerModule from './TransformerModule';

class RotatePoint extends TransformerModule {
  public static DEFAULT_ROTATE_X = 0.0;
  public static DEFAULT_ROTATE_Y = 0.0;
  public static DEFAULT_ROTATE_Z = 0.0;

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

  constructor(sourceModule: Module, xAngle?: number, yAngle?: number, zAngle?: number) {
    super(sourceModule);

    this.xAngle = xAngle || RotatePoint.DEFAULT_ROTATE_X;
    this.yAngle = yAngle || RotatePoint.DEFAULT_ROTATE_Y;
    this.zAngle = zAngle || RotatePoint.DEFAULT_ROTATE_Z;

    this.calcMatrices();
  }

  public get xAngle(): number {
    return this._xAngle;
  }
  public set xAngle(v: number) {
    this._xAngle = v;

    this.calcMatrices();
  }

  public get yAngle(): number {
    return this._yAngle;
  }
  public set yAngle(v: number) {
    this._yAngle = v;

    this.calcMatrices();
  }

  public get zAngle(): number {
    return this._zAngle;
  }
  public set zAngle(v: number) {
    this._zAngle = v;

    this.calcMatrices();
  }

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

  public setAngles(xAngle: number, yAngle: number, zAngle: number): void {
    this.xAngle = xAngle;
    this.yAngle = yAngle;
    this.zAngle = zAngle;
  }
}

export default RotatePoint;
