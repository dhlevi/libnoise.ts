import Interpolation from '@app/interpolation';
import Module from '@app/module/Module';
import SelectorModule from './SelectorModule';


/**
 * Noise module that outputs a weighted blend of the output values from
 * two source modules given the output value supplied by a control module.
 *
 * Source modules A and B output the values to blend.
 * The control module determines the weight of the blending operation.
 * Negative values weigh the blend towards the output value from the
 * source module with an index value of 0. Positive values weigh the
 * blend towards the output value from the source module with an index value of 1.
 *
 * This noise module uses linear interpolation to perform the blending
 * operation.
 *
 * This noise module requires two source modules and one control module.
 */
class Blend extends SelectorModule {
  /**
   * @param sourceModuleA Noise module that is used to generate the output values.
   * @param sourceModuleB Noise module that is used to generate the output values.
   * @param controlModule Noise module that is used to control the blend between
   *  sourceModuleA and sourceModuleB.
   */
  constructor(sourceModuleA: Module, sourceModuleB: Module, controlModule: Module) {
    super(sourceModuleA, sourceModuleB, controlModule);
  }

  public getValue(x: number, y: number, z: number): number {
    return Interpolation.linear(
      this.sourceModuleA.getValue(x, y, z),
      this.sourceModuleB.getValue(x, y, z),
      (this.controlModule.getValue(x, y, z) + 1.0) / 2.0,
    );
  }
}

export default Blend;
