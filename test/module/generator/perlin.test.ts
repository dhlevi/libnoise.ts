import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Perlin } from '@app/module/generator';
import NoiseGen from '@app/noisegen';

describe('module/generator/perlin', () => {
  it("can construct successfully", () => {
    // Setup
    const frequency = 1;
    const lacunarity = 2;
    const octaves = 6;
    const persist = 0.5;
    const seed = 0;
    const quality = NoiseGen.QUALITY_STD;

    // Test
    const testFunc = () => {
      new Perlin(frequency, lacunarity, octaves, persist, seed, quality);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue returns a number", () => {
    // Setup
    const x = 0.5;
    const y = 1;
    const z = 1;
    const mockModule = createMockModule();

    // Test
    const value = mockModule.getValue(x, y, z);

    // Assert
    expect(value).to.be.ok;
  });
});

function createMockModule() {
  const frequency = 1;
  const lacunarity = 2;
  const octaves = 6;
  const persist = 0.5;
  const seed = 0;
  const quality = NoiseGen.QUALITY_STD;

  return new Perlin(frequency, lacunarity, octaves, persist, seed, quality);
}
