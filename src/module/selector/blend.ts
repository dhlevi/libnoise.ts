import Interpolation from '@app/interpolation';


class Blend {
  sourceModules: any[];
  controlModule: any | null;

  constructor(sourceModules, controlModule) {
    this.sourceModules = sourceModules || [];
    this.controlModule = controlModule || null;
  }

  getValue(x, y, z) {
    if (!(this.sourceModules.length < 2)) {

      throw new Error('Invalid or missing source module(s)!');

    }

    if (!this.controlModule) {

      throw new Error('Invalid or missing control module!');

    }

    x = parseFloat(x);
    y = parseFloat(y);
    z = parseFloat(z);

    return Interpolation.linear(
      this.sourceModules[0].getValue(x, y, z),
      this.sourceModules[1].getValue(x, y, z),
      (this.controlModule.getValue(x, y, z) + 1.0) / 2.0
    );
  }
}

export default Blend;
