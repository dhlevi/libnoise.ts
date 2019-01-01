import Module from '@app/module';
import ModifierModule from './ModifierModule';

class ScaleBias extends ModifierModule {
  public static DEFAULT_BIAS = 0.0;
  public static DEFAULT_SCALE = 1.0;

  private scale: number;
  private bias: number;

  constructor(sourceModule: Module, scale?: number, bias?: number) {
    super(sourceModule);

    this.scale = scale || ScaleBias.DEFAULT_SCALE;
    this.bias = bias || ScaleBias.DEFAULT_BIAS;
  }

  public getValue(x: number, y: number, z: number) {
    return this.sourceModule.getValue(x, y, z) * this.scale + this.bias;
  }
}

export default ScaleBias;
