import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Const } from '@app/module/generator';
import { Clamp } from '@app/module/modifier';

describe('module/modifier/clamp', () => {
  it("can construct successfully", () => {
    // Setup
    const value = 2;
    const lowerBound = 0;
    const upperBound = 1;
    const sourceModule = new Const(value);

    // Test
    const testFunc = () => {
      new Clamp(sourceModule, lowerBound, upperBound);
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

  it("setting lowerBound updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 0.5;

    // Test
    mockModule.lowerBound = newValue;
    const updatedLowerBound = mockModule.lowerBound;

    // Assert
    expect(updatedLowerBound).to.equal(newValue);
  });

  it("setting lowerBound to a value higher than upperBound throws an error", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = mockModule.upperBound + 1;

    // Test
    const testFunc = () => {
      mockModule.lowerBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("setting upperBound updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 3;

    // Test
    mockModule.upperBound = newValue;
    const updatedUpperBound = mockModule.upperBound;

    // Assert
    expect(updatedUpperBound).to.equal(newValue);
  });

  it("setting upperBound to a value lower than lowerBound throws an error", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = mockModule.lowerBound - 1;

    // Test
    const testFunc = () => {
      mockModule.upperBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });
});

function createMockModule() {
  const value = 2;
  const lowerBound = 0;
  const upperBound = 1;
  const sourceModule = new Const(value);

  return new Clamp(sourceModule, lowerBound, upperBound);
}
