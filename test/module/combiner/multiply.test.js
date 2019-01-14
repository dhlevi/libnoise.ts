const { expect } = require('chai');
const { describe, it } = require('mocha');

const { Multiply } = require('@app/module/combiner');
const { Const } = require('@app/module/generator');

describe('JavaScript/module/combiner/multiply', () => {
  it("constructed without a sourceModuleA throws an error", () => {
    // Setup
    const valueB = 3;
    const sourceModuleB = new Const(valueB);

    // Test
    const testFunc = () => {
      new Multiply(undefined, sourceModuleB);
    };

    // Assert
    expect(testFunc).to.throw("Cannot construct Model - sourceModuleA is required");
  });

  it("constructed without a sourceModuleB throws an error", () => {
    // Setup
    const valueA = 3;
    const sourceModuleA = new Const(valueA);

    // Test
    const testFunc = () => {
      new Multiply(sourceModuleA);
    };

    // Assert
    expect(testFunc).to.throw("Cannot construct Model - sourceModuleB is required");
  });

  it("calling getValue without a sourceModuleA throws an error", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = 10;
    const mockModule = createMockModule();
    mockModule.sourceModuleA = null;

    // Test
    const testFunc = () => {
      mockModule.getValue(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw("Cannot call getValue on multiply combiner module, sourceModuleA is empty");
  });

  it("calling getValue without a sourceModuleB throws an error", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = 10;
    const mockModule = createMockModule();
    mockModule.sourceModuleB = null;

    // Test
    const testFunc = () => {
      mockModule.getValue(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw("Cannot call getValue on multiply combiner module, sourceModuleB is empty");
  });
});

function createMockModule() {
  const valueA = 2;
  const valueB = 3;
  const sourceModuleA = new Const(valueA);
  const sourceModuleB = new Const(valueB);

  return new Multiply(sourceModuleA, sourceModuleB);
}
