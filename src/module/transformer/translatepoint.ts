import Module from '@app/module';
import TransformerModule from './TransformerModule';

class TranslatePoint extends TransformerModule {
  public translateX: number;
  public translateY: number;
  public translateZ: number;

  constructor(sourceModule: Module, translateX?: number, translateY?: number, translateZ?: number) {
    super(sourceModule);

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
    return this.sourceModule.getValue(
      x + this.translateX,
      y + this.translateY,
      z + this.translateZ,
    );
  }
}

export default TranslatePoint;
