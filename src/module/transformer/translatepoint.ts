import Module from '@app/module/Module';
import TransformerModule from './TransformerModule';

/**
 * Noise module that moves the coordinates of the input value before
 * returning the output value from a source module.
 *
 * The getValue() method moves the ( x, y, z ) coordinates of
 * the input value by a translation amount before returning the output
 * value from the source module.  To set the translation amount, call
 * the setTranslation() method.  To set the translation amount to
 * apply to the individual x, y, or z coordinates, set the
 * translateX(), translateY() or translateZ() properties, respectively.
 *
 * This noise module requires one source module.
 */
class TranslatePoint extends TransformerModule {
  /**
   * The translation amount to apply to the x coordinate.
   */
  public translateX: number;
  /**
   * The translation amount to apply to the y coordinate.
   */
  public translateY: number;
  /**
   * The translation amount to apply to the z coordinate.
   */
  public translateZ: number;

  /**
   * @param sourceModule The noise module that is used to generate the output values.
   * @param translateX The translation amount to apply to the x coordinate.
   * @param translateY The translation amount to apply to the y coordinate.
   * @param translateZ The translation amount to apply to the z coordinate.
   */
  constructor(sourceModule: Module, translateX?: number, translateY?: number, translateZ?: number) {
    super(sourceModule);

    this.translateX = translateX || 0;
    this.translateY = translateY || 0;
    this.translateZ = translateZ || 0;
  }

  /**
   * Sets the translation amounts to apply to the ( x, y, z )
   * coordinates of the input value.
   *
   * The getValue() method moves the ( x, y, z ) coordinates
   * of the input value by a translation amount before returning the
   * output value from the source module
   *
   * @param translateX The translation amount to apply to the x coordinate.
   * @param translateY The translation amount to apply to the y coordinate.
   * @param translateZ The translation amount to apply to the z coordinate.
   */
  public setTranslation(translateX: number, translateY: number, translateZ: number): void {
    this.translateX = translateX;
    this.translateY = translateY;
    this.translateZ = translateZ;
  }

  public getValue(x: number, y: number, z: number): number {
    return this.sourceModule.getValue(
      x + this.translateX,
      y + this.translateY,
      z + this.translateZ,
    );
  }
}

export default TranslatePoint;
