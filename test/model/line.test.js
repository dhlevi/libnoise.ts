const { expect } = require('chai');
const { describe, it } = require('mocha');

const { Line } = require('@app/model');
const { Const } = require('@app/module/generator');

describe('JavaScript/model/line', () => {
  it("constructed without a sourceModule throws an error", () => {
    // Setup / Test
    const testFunc = () => {
      new Line();
    };

    // Assert
    expect(testFunc).to.throw("Cannot construct Model - sourceModule is required");
  });

  it("calling getValue without a sourceModule throws an error", () => {
    // Setup
    const p = 0.5;
    const mockModule = createMockModule();
    mockModule.sourceModule = null;

    // Test
    const testFunc = () => {
      mockModule.getValue(p);
    };

    // Assert
    expect(testFunc).to.throw("Cannot call getValue on line model, source module is empty");
  });

  it("calling setEndPoint with a missing x parameter throws an error", () => {
    // Setup
    const x = undefined;
    const y = 10;
    const z = 10;
    const mockModule = createMockModule();

    // Test
    const testFunc = () => {
      mockModule.setEndPoint(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw(`Cannot set end point for line model. x, y, and z parameters are required. x: ${x}. y: ${y}. z: ${z}`);
  });

  it("calling setEndPoint with a missing y parameter throws an error", () => {
    // Setup
    const x = 10;
    const y = undefined;
    const z = 10;
    const mockModule = createMockModule();

    // Test
    const testFunc = () => {
      mockModule.setEndPoint(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw(`Cannot set end point for line model. x, y, and z parameters are required. x: ${x}. y: ${y}. z: ${z}`);
  });

  it("calling setEndPoint with a missing z parameter throws an error", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = undefined;
    const mockModule = createMockModule();

    // Test
    const testFunc = () => {
      mockModule.setEndPoint(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw(`Cannot set end point for line model. x, y, and z parameters are required. x: ${x}. y: ${y}. z: ${z}`);
  });

  it("calling setStartPoint with a missing x parameter throws an error", () => {
    // Setup
    const x = undefined;
    const y = 10;
    const z = 10;
    const mockModule = createMockModule();

    // Test
    const testFunc = () => {
      mockModule.setStartPoint(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw(`Cannot set start point for line model. x, y, and z parameters are required. x: ${x}. y: ${y}. z: ${z}`);
  });

  it("calling setStartPoint with a missing y parameter throws an error", () => {
    // Setup
    const x = 10;
    const y = undefined;
    const z = 10;
    const mockModule = createMockModule();

    // Test
    const testFunc = () => {
      mockModule.setStartPoint(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw(`Cannot set start point for line model. x, y, and z parameters are required. x: ${x}. y: ${y}. z: ${z}`);
  });

  it("calling setStartPoint with a missing z parameter throws an error", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = undefined;
    const mockModule = createMockModule();

    // Test
    const testFunc = () => {
      mockModule.setStartPoint(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw(`Cannot set start point for line model. x, y, and z parameters are required. x: ${x}. y: ${y}. z: ${z}`);
  });
});

function createMockModule() {
  const value = 2;
  const sourceModule = new Const(value);

  return new Line(sourceModule);
}
