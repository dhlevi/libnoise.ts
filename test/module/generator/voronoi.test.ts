import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Voronoi } from '@app/module/generator';

describe('module/generator/voronoi', () => {
  it("can construct successfully", () => {
    // Setup
    const frequency = 2;
    const displacement = 1.5;
    const distance = false;
    const seed = 18;

    // Test
    const testFunc = () => {
      new Voronoi(frequency, displacement, distance, seed);
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

function createMockModule(): Voronoi {
  const frequency = 2;
  const displacement = 1.5;
  const distance = false;
  const seed = 18;

  // Test
  return new Voronoi(frequency, displacement, distance, seed);
}
