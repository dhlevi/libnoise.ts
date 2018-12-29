import { expect } from 'chai';
import { describe, it } from 'mocha';

import { RidgedMulti } from '@app/module/generator';
import NoiseGen from '@app/noisegen';

describe('module/generator/ridgedmulti', () => {
  it("can construct successfully", () => {
    // Setup
    const frequency = 1;
    const lacunarity = 2;
    const octaves = 6;
    const seed = 0;
    const quality = NoiseGen.QUALITY_STD;
    const offset = 1;
    const gain = 2;

    // Test
    const testFunc = () => {
      new RidgedMulti(frequency, lacunarity, octaves, seed, quality, offset, gain);
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
  it("lacunarity can be updated successfully", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 3;

    // Test
    mockModule.lacunarity = newValue;
    const updatedLacunarity = mockModule.lacunarity;

    // Assert
    expect(updatedLacunarity).to.equal(newValue);
  })
});

function createMockModule() {
  const frequency = 1;
  const lacunarity = 2;
  const octaves = 6;
  const seed = 0;
  const quality = NoiseGen.QUALITY_STD;
  const offset = 1;
  const gain = 2;

  return new RidgedMulti(frequency, lacunarity, octaves, seed, quality, offset, gain);
}
