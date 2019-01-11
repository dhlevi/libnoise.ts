import Module from '@app/module/Module';
import ModifierModule from './ModifierModule';

/**
 * Noise module that applies a scaling factor and a bias to the output
 * value from a source module.
 *
 * The getValue() method retrieves the output value from the source
 * module, multiplies it with a scaling factor, adds a bias to it, then
 * outputs the value.
 *
 * This noise module requires one source module.
 */
class ScaleBias extends ModifierModule {
  public static readonly DEFAULT_BIAS = 0.0;
  public static readonly DEFAULT_SCALE = 1.0;

  /**
   * Bias to apply to the scaled output value from the source module.
   */
  public bias: number;
  /**
   * Scaling factor to apply to the output value from the source module.
   */
  public scale: number;

  /**
   * @param sourceModule The noise module that is used to generate the output values.
   * @param scale Scaling factor to apply to the output value from the source module.
   * @param bias Bias to apply to the scaled output value from the source module.
   */
  constructor(sourceModule: Module, scale?: number, bias?: number) {
    super(sourceModule);

    this.scale = scale || ScaleBias.DEFAULT_SCALE;
    this.bias = bias || ScaleBias.DEFAULT_BIAS;
  }

  public getValue(x: number, y: number, z: number): number {
    return this.sourceModule.getValue(x, y, z) * this.scale + this.bias;
  }
}

export default ScaleBias;
