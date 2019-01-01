import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Const } from '@app/module/generator';
import { Select } from '@app/module/selector';

describe('module/selector/select', () => {
  it("can construct successfully", () => {
    // Setup
    const sourceValueA = 2;
    const sourceModuleA = new Const(sourceValueA);
    const sourceValueB = 2;
    const sourceModuleB = new Const(sourceValueB);
    const controlValue = 0.5;
    const controlModule = new Const(controlValue);
    const edgeFalloff = 1;
    const lowerBound = -0.5;
    const upperBound = 0.5;

    // Test
    const testFunc = () => {
      new Select(sourceModuleA, sourceModuleB, controlModule, edgeFalloff, lowerBound, upperBound);
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

  it("setting edge updates correctly", () => {
    // Setup
    const newEdgeValue = 0.2;
    const mockModule = createMockModule();

    // Test
    mockModule.edge = newEdgeValue;
    const updatedEdgeValue = mockModule.edge;

    // Assert
    expect(updatedEdgeValue).to.equal(newEdgeValue);
  });

  it("setting lowerBound updates correctly", () => {
    // Setup
    const newLowerBoundValue = -1;
    const mockModule = createMockModule();

    // Test
    mockModule.lowerBound = newLowerBoundValue;
    const updatedLowerBoundValue = mockModule.lowerBound;

    // Assert
    expect(updatedLowerBoundValue).to.equal(newLowerBoundValue);
  });

  it("setting lowerBound to a value higher than upperBound throws an error", () => {
    // Setup
    const mockModule = createMockModule();
    const newLowerBoundValue = mockModule.upperBound + 1;

    // Test
    const testFunc = () => {
      mockModule.lowerBound = newLowerBoundValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("setting upperBound updates correctly", () => {
    // Setup
    const newUpperBoundValue = 2;
    const mockModule = createMockModule();

    // Test
    mockModule.upperBound = newUpperBoundValue;
    const updatedUpperBoundValue = mockModule.upperBound;

    // Assert
    expect(updatedUpperBoundValue).to.equal(newUpperBoundValue);
  });

  it("setting upperBound to a value higher than lowerBound throws an error", () => {
    // Setup
    const mockModule = createMockModule();
    const newUpperBoundValue = mockModule.lowerBound - 1;

    // Test
    const testFunc = () => {
      mockModule.upperBound = newUpperBoundValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });
});

function createMockModule() {
  const sourceValueA = 2;
  const sourceModuleA = new Const(sourceValueA);
  const sourceValueB = 2;
  const sourceModuleB = new Const(sourceValueB);
  const controlValue = 0.5;
  const controlModule = new Const(controlValue);
  const edgeFalloff = 1;
  const lowerBound = -0.5;
  const upperBound = 0.5;

  // Test
  return new Select(sourceModuleA, sourceModuleB, controlModule, edgeFalloff, lowerBound, upperBound);
}
