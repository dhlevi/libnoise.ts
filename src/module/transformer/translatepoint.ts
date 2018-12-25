class TranslatePoint {
  private sourceModule: any;
  private translateX: number;
  private translateY: number;
  private translateZ: number;

  constructor(sourceModule?: any, translateX?: number, translateY?: number, translateZ?: number) {
    this.sourceModule = sourceModule || null;
    this.translateX = translateX || 0;
    this.translateY = translateY || 0;
    this.translateZ = translateZ || 0;
  }

  public setTranslation(x: number, y: number, z: number) {
    this.translateX = x;
    this.translateY = y;
    this.translateZ = z;
  }

  public getValue(x: number, y: number, z: number) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing source module!');
    }

    return this.sourceModule.getValue(
      x + this.translateX,
      y + this.translateY,
      z + this.translateZ,
    );
  }
}

export default TranslatePoint;
