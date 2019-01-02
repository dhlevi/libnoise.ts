import { makeInt32Range } from '@app/util';
import GeneratorModule from './GeneratorModule';


class Checkerboard extends GeneratorModule {
  public getValue(x: number, y: number, z: number): number {
    let ix = Math.floor(makeInt32Range(x));
    let iy = Math.floor(makeInt32Range(y));
    let iz = Math.floor(makeInt32Range(z));

    return (ix & 1 ^ iy & 1 ^ iz & 1) ? -1.0 : 1.0;
  }
}

export default Checkerboard;
