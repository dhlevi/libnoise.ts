const { expect } = require('chai');
const { describe, it } = require('mocha');

const { Plane } = require('@app/model');
const { Const } = require('@app/module/generator');

describe('JavaScript/model/plane', () => {
  it("constructed without a sourceModule throws an error", () => {
    // Setup / Test
    const testFunc = () => {
      new Plane();
    };

    // Assert
    expect(testFunc).to.throw("Cannot construct Model - sourceModule is required");
  });

  it("calling getValue without a sourceModule throws an error", () => {
    // Setup
    const x = 10;
    const z = 10;
    const mockModule = createMockModule();
    mockModule.sourceModule = null;

    // Test
    const testFunc = () => {
      mockModule.getValue(x, z);
    };

    // Assert
    expect(testFunc).to.throw("Cannot call getValue on plane model, source module is empty");
  });
});

function createMockModule() {
  const value = 2;
  const sourceModule = new Const(value);

  return new Plane(sourceModule);
}
