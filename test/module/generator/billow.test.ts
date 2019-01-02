import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Billow } from '@app/module/generator';
import NoiseGen from '@app/noisegen';

describe('module/generator/billow', () => {
  it("can construct successfully", () => {
    // Setup
    const frequency = 2;
    const lacunarity = 3;
    const octaves = 5;
    const persist = 0.4;
    const seed = 18;
    const quality = NoiseGen.QUALITY_STD;

    // Test
    const testFunc = () => {
      new Billow(frequency, lacunarity, octaves, persist, seed, quality);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue returns a number", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = 10;
    const mockModule = createMockModule();

    // Test
    const value = mockModule.getValue(x, y, z);

    // Assert
    expect(value).to.be.ok;
  });
});

function createMockModule(): Billow {
  const frequency = 2;
  const lacunarity = 3;
  const octaves = 5;
  const persist = 0.4;
  const seed = 18;
  const quality = NoiseGen.QUALITY_STD;

  return new Billow(frequency, lacunarity, octaves, persist, seed, quality);
}
