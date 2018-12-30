import Interpolation from '@app/interpolation';


class Blend {
  private sourceModules: any[];
  private controlModule: any | null;

  constructor(sourceModules?: any, controlModule?: any) {
    this.sourceModules = sourceModules || [];
    this.controlModule = controlModule || null;
  }

  public getValue(x: number, y: number, z: number) {
    if (this.sourceModules.length < 2) {
      throw new Error('Invalid or missing source module(s)!');
    }

    if (!this.controlModule) {
      throw new Error('Invalid or missing control module!');
    }

    return Interpolation.linear(
      this.sourceModules[0].getValue(x, y, z),
      this.sourceModules[1].getValue(x, y, z),
      (this.controlModule.getValue(x, y, z) + 1.0) / 2.0,
    );
  }
}

export default Blend;
