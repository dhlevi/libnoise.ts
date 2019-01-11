import { makeInt32Range } from '@app/util';
import GeneratorModule from './GeneratorModule';


/**
 * Noise module that outputs a checkerboard pattern.
 *
 * This noise module outputs unit-sized blocks of alternating values.
 * The values of these blocks alternate between -1.0 and +1.0.
 *
 * This noise module is not really useful by itself, but it is often used
 * for debugging purposes.
 *
 * This noise module does not require any source modules.
 */
class Checkerboard extends GeneratorModule {
  public getValue(x: number, y: number, z: number): number {
    let ix = Math.floor(makeInt32Range(x));
    let iy = Math.floor(makeInt32Range(y));
    let iz = Math.floor(makeInt32Range(z));

    return (ix & 1 ^ iy & 1 ^ iz & 1) ? -1.0 : 1.0;
  }
}

export default Checkerboard;
