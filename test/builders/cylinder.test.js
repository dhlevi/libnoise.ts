const { expect } = require('chai');
const { describe, it } = require('mocha');

const { Cylinder } = require('@app/builders');
const { Const } = require('@app/module/generator');

describe("JavaScript/builders/cylinder", () => {
  it("constructed without a sourceModule throws an error", () => {
    // Setup / Test
    const testFunc = () => {
      new Cylinder();
    };

    // Assert
    expect(testFunc).to.throw("Cannot construct Builder - sourceModule is required");
  });

  it("calling build without a sourceModule throws an error", () => {
    // Setup
    const mockModule = createMockModule();
    mockModule.sourceModule = null;

    // Test
    const testFunc = () => {
      mockModule.build();
    };

    // Assert
    expect(testFunc).to.throw("Cannot build cylinder model, source module is empty");
  });
});

function createMockModule() {
  const value = 2;
  const sourceModule = new Const(value);
  const width = 10;
  const height = 10;

  return new Cylinder(sourceModule, width, height);
}
