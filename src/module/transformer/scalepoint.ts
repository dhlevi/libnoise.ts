import Module from '@app/module';
import TransformerModule from './TransformerModule';

class ScalePoint extends TransformerModule {
  public static readonly DEFAULT_SCALE_POINT_X = 1.0;
  public static readonly DEFAULT_SCALE_POINT_Y = 1.0;
  public static readonly DEFAULT_SCALE_POINT_Z = 1.0;

  public xScale: number;
  public yScale: number;
  public zScale: number;

  constructor(sourceModule: Module, xScale?: number, yScale?: number, zScale?: number) {
    super(sourceModule);

    this.xScale = xScale || ScalePoint.DEFAULT_SCALE_POINT_X;
    this.yScale = yScale || ScalePoint.DEFAULT_SCALE_POINT_Y;
    this.zScale = zScale || ScalePoint.DEFAULT_SCALE_POINT_Z;
  }

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
