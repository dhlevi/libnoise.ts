const { expect } = require('chai');
const { describe, it } = require('mocha');

const { Sphere } = require('@app/model');
const { Const } = require('@app/module/generator');

describe('JavaScript/model/sphere', () => {
  it("constructed without a sourceModule throws an error", () => {
    // Setup / Test
    const testFunc = () => {
      new Sphere();
    };

    // Assert
    expect(testFunc).to.throw("Cannot construct Model - sourceModule is required");
  });

  it("calling getValue without a sourceModule throws an error", () => {
    // Setup
    const latitude = 10;
    const longitude = 10;
    const mockModule = createMockModule();
    mockModule.sourceModule = null;

    // Test
    const testFunc = () => {
      mockModule.getValue(latitude, longitude);
    };

    // Assert
    expect(testFunc).to.throw("Cannot call getValue on sphere model, source module is empty");
  });
});

function createMockModule() {
  const value = 2;
  const sourceModule = new Const(value);

  return new Sphere(sourceModule);
}
