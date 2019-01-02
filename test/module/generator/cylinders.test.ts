import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Cylinders } from '@app/module/generator';

describe('module/generator/cylinders', () => {
  it("can construct successfully", () => {
    // Setup
    const frequency = 2;

    // Test
    const testFunc = () => {
      new Cylinders(frequency);
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

function createMockModule(): Cylinders {
  const frequency = 2;

  // Test
  return new Cylinders(frequency);
}
