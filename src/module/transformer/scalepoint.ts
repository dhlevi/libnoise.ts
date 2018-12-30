class ScalePoint {
  public static DEFAULT_SCALE_POINT_X = 1.0;
  public static DEFAULT_SCALE_POINT_Y = 1.0;
  public static DEFAULT_SCALE_POINT_Z = 1.0;

  private sourceModule: any;
  public xScale: number;
  public yScale: number;
  public zScale: number;

  constructor(sourceModule?: any, xScale?: number, yScale?: number, zScale?: number) {
    this.sourceModule = sourceModule || null;
    this.xScale = xScale || ScalePoint.DEFAULT_SCALE_POINT_X;
    this.yScale = yScale || ScalePoint.DEFAULT_SCALE_POINT_Y;
    this.zScale = zScale || ScalePoint.DEFAULT_SCALE_POINT_Z;
  }

  public setScales(xScale: number, yScale: number, zScale: number) {
    this.xScale = xScale;
    this.yScale = yScale;
    this.zScale = zScale;
  }

  public getValue(x: number, y: number, z: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing source module!');
    }

    return this.sourceModule.getValue(
      x * this.xScale,
      y * this.yScale,
      z * this.zScale,
    );
  }
}

export default ScalePoint;
