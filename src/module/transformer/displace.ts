import Module from '@app/module/Module';
import TransformerModule from './TransformerModule';

/**
 * Noise module that uses three source modules to displace each
 * coordinate of the input value before returning the output value from
 * a source module.
 *
 * The source module outputs a value.
 * - xModule specifies the offset to apply to the x coordinate of the input value.
 * - yModule specifies the offset to apply to the y coordinate of the input value.
 * - zModule specifies the offset to apply to the z coordinate of the input value.
 *
 * The getValue() method modifies the ( x, y, z ) coordinates of
 * the input value using the output values from the three displacement
 * modules before retrieving the output value from the source module.
 *
 * This noise module requires one source module and three displacement modules.
 */
class Displace extends TransformerModule {
  /**
   * Displacement module that displaces the x coordinate of the input value.
   */
  public xModule: Module;
  /**
   * Displacement module that displaces the y coordinate of the input value.
   */
  public yModule: Module;
  /**
   * Displacement module that displaces the z coordinate of the input value.
   */
  public zModule: Module;

  /**
   *
   * @param sourceModule The noise module that is used to generate the output values.
   * @param xModule Displacement module that displaces the x coordinate of the input value.
   * @param yModule Displacement module that displaces the y coordinate of the input value.
   * @param zModule Displacement module that displaces the z coordinate of the input value.
   */
  constructor(sourceModule: Module, xModule: Module, yModule: Module, zModule: Module) {
    super(sourceModule);

    this.xModule = xModule;
    this.yModule = yModule;
    this.zModule = zModule;
  }

  public getValue(x: number, y: number, z: number): number {
    return this.sourceModule.getValue(
      x + this.xModule.getValue(x, y, z),
      y + this.yModule.getValue(x, y, z),
      z + this.zModule.getValue(x, y, z),
    );
  }
}

export default Displace;
