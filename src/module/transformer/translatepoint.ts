class TranslatePoint {
  private sourceModule: any;
  private translateX: number;
  private translateY: number;
  private translateZ: number;

  constructor(sourceModule, translateX, translateY, translateZ) {
    this.sourceModule = sourceModule || null;
    this.translateX = translateX || 0;
    this.translateY = translateY || 0;
    this.translateZ = translateZ || 0;
  }

  setTranslation(x, y, z) {
    this.translateX = x;
    this.translateY = y;
    this.translateZ = z;
  }

  getValue(x, y, z) {
    if (!this.sourceModule) {
      throw new Error('Invalid or missing source module!');
    }

    return this.sourceModule.getValue(
      x + this.translateX,
      y + this.translateY,
      z + this.translateZ
    );
  }
}

export default TranslatePoint;
