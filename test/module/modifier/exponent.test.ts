import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Const } from '@app/module/generator';
import { Exponent } from '@app/module/modifier';

describe('module/combiner/exponent', () => {
  it("can construct successfully", () => {
    // Setup
    const value = 2;
    const exponent = 2;
    const sourceModule = new Const(value);

    // Test
    const testFunc = () => {
      new Exponent(sourceModule, exponent);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue without a sourceModule throws an error", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = 10;
    const mockModule = new Exponent();

    // Test
    const testFunc = () => {
      mockModule.getValue(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw();
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

function createMockModule() {
  const value = 2;
  const exponent = 2;
  const sourceModule = new Const(value);

  return new Exponent(sourceModule, exponent);
}
