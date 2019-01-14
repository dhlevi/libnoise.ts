const { expect } = require('chai');
const { describe, it } = require('mocha');

const { Cylinder } = require('@app/model');
const { Const } = require('@app/module/generator');

describe('JavaScript/model/cylinder', () => {
  it("constructed without a sourceModule throws an error", () => {
    // Setup / Test
    const testFunc = () => {
      new Cylinder();
    };

    // Assert
    expect(testFunc).to.throw("Cannot construct Model - sourceModule is required");
  });

  it("calling getValue without a sourceModule throws an error", () => {
    // Setup
    const angleDegrees = 45;
    const height = 10;
    const mockModule = createMockModule();
    mockModule.sourceModule = null;

    // Test
    const testFunc = () => {
      mockModule.getValue(angleDegrees, height);
    };

    // Assert
    expect(testFunc).to.throw("Cannot call getValue on cylinder model, source module is empty");
  });
});

function createMockModule() {
  const value = 2;
  const sourceModule = new Const(value);

  return new Cylinder(sourceModule);
}
