import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Plane } from '@app/builders';
import { Const } from '@app/module/generator';
import NoiseMap from '@app/noisemap';

describe("builders/plane", () => {
  it("can construct successfully", () => {
    // Setup
    const value: number = 2;
    const sourceModule = new Const(value);
    const width: number = 10;
    const height: number = 10;
    const seamless = false;

    // Test
    const testFunc = () => {
      new Plane(sourceModule, width, height, seamless);
    };

    // Assert
    expect(testFunc).not.to.throw;
  });

  it("lowerXBound defaults to 0", () => {
    // Setup
    const mockModule = createMockPlane();

    // Test
    let lowerXBound: number = mockModule.lowerXBound;

    // Assert
    expect(lowerXBound).to.equal(0);
  });

  it("setting lowerXBound updates correctly", () => {
    // Setup
    const mockModule = createMockPlane();
    const newValue = 0.5;

    // Test
    mockModule.lowerXBound = newValue;
    const updatedLowerXBound = mockModule.lowerXBound;

    // Assert
    expect(updatedLowerXBound).to.equal(newValue);
  });

  it("setting lowerXBound to a value higher than upperXBound throws an error", () => {
    // Setup
    const mockModule = createMockPlane();
    const newValue = mockModule.upperXBound + 1;

    // Test
    const testFunc = () => {
      mockModule.lowerXBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("lowerYBound defaults to 0", () => {
    // Setup
    const mockModule = createMockPlane();

    // Test
    let lowerYBound: number = mockModule.lowerYBound;

    // Assert
    expect(lowerYBound).to.equal(0);
  });

  it("setting lowerYBound updates correctly", () => {
    // Setup
    const mockModule = createMockPlane();
    const newValue = 0.5;

    // Test
    mockModule.lowerYBound = newValue;
    const updatedLowerYBound = mockModule.lowerYBound;

    // Assert
    expect(updatedLowerYBound).to.equal(newValue);
  });

  it("setting lowerYBound to a value higher than upperYBound throws an error", () => {
    // Setup
    const mockModule = createMockPlane();
    const newValue = mockModule.upperYBound + 1;

    // Test
    const testFunc = () => {
      mockModule.lowerYBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("upperXBound defaults to 1", () => {
    // Setup
    const mockModule = createMockPlane();

    // Test
    let upperXBound: number = mockModule.upperXBound;

    // Assert
    expect(upperXBound).to.equal(1);
  });

  it("setting upperXBound updates correctly", () => {
    // Setup
    const mockModule = createMockPlane();
    const newValue = 0.5;

    // Test
    mockModule.upperXBound = newValue;
    const updatedUpperXBound = mockModule.upperXBound;

    // Assert
    expect(updatedUpperXBound).to.equal(newValue);
  });

  it("setting upperXBound to a value lower than lowerXBound throws an error", () => {
    // Setup
    const mockModule = createMockPlane();
    const newValue = mockModule.lowerXBound - 1;

    // Test
    const testFunc = () => {
      mockModule.upperXBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("upperYBound defaults to 1", () => {
    // Setup
    const mockModule = createMockPlane();

    // Test
    let upperYBound: number = mockModule.upperYBound;

    // Assert
    expect(upperYBound).to.equal(1);
  });

  it("setting upperYBound updates correctly", () => {
    // Setup
    const mockModule = createMockPlane();
    const newValue = 0.5;

    // Test
    mockModule.upperYBound = newValue;
    const updatedUpperAngleBound = mockModule.upperYBound;

    // Assert
    expect(updatedUpperAngleBound).to.equal(newValue);
  });

  it("setting upperYBound to a value lower than lowerYBound throws an error", () => {
    // Setup
    const mockModule = createMockPlane();
    const newValue = mockModule.lowerYBound - 1;

    // Test
    const testFunc = () => {
      mockModule.upperYBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("calling build returns a noise map", () => {
    // Setup
    const mockModule = createMockPlane();

    // Test
    const noiseMap: NoiseMap = mockModule.build();

    // Assert
    expect(noiseMap).not.to.be.null;
  });
});

function createMockPlane(): Plane {
  // Setup
  const value: number = 2;
  const sourceModule = new Const(value);
  const width: number = 10;
  const height: number = 10;
  const seamless = false;

  return new Plane(sourceModule, width, height, seamless);
}