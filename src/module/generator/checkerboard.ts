import MathFuncs from '@app/mathfuncs';
import GeneratorModule from './GeneratorModule';


class Checkerboard extends GeneratorModule {
  public getValue(x: number, y: number, z: number) {
    let ix = Math.floor(MathFuncs.makeInt32Range(x));
    let iy = Math.floor(MathFuncs.makeInt32Range(y));
    let iz = Math.floor(MathFuncs.makeInt32Range(z));

    return (ix & 1 ^ iy & 1 ^ iz & 1) ? -1.0 : 1.0;
  }
}

export default Checkerboard;
