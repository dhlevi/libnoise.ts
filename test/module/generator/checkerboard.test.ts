import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Checkerboard } from '@app/module/generator';

describe('module/generator/checkerboard', () => {
  it("can construct successfully", () => {
    // Test
    const testFunc = () => {
      new Checkerboard();
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

function createMockModule(): Checkerboard {
  return new Checkerboard();
}
