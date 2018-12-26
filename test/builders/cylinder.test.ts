import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Cylinder } from '@app/builders';
import { Const } from '@app/module/generator';
import NoiseMap from '@app/noisemap';

describe("builders/cylinder", () => {
  it("can construct successfully", () => {
    // Setup
    const value = 2;
    const sourceModule = new Const(value);
    const width = 10;
    const height = 10;

    // Test
    const testFunc = () => {
      new Cylinder(sourceModule, width, height);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("lowerAngleBound defaults to 0", () => {
    // Setup
    const mockModule = createMockCylinder();

    // Test
    let lowerAngleBound: number = mockModule.lowerAngleBound;

    // Assert
    expect(lowerAngleBound).to.equal(0);
  });

  it("setting lowerAngleBound updates correctly", () => {
    // Setup
    const mockModule = createMockCylinder();
    const newValue = 0.5;

    // Test
    mockModule.lowerAngleBound = newValue;
    const updatedLowerAngleBound = mockModule.lowerAngleBound;

    // Assert
    expect(updatedLowerAngleBound).to.equal(newValue);
  });

  it("setting lowerAngleBound to a value higher than upperAngleBound throws an error", () => {
    // Setup
    const mockModule = createMockCylinder();
    const newValue = mockModule.upperAngleBound + 1;

    // Test
    const testFunc = () => {
      mockModule.lowerAngleBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("lowerHeightBound defaults to 0", () => {
    // Setup
    const mockModule = createMockCylinder();

    // Test
    let lowerHeightBound: number = mockModule.lowerHeightBound;

    // Assert
    expect(lowerHeightBound).to.equal(0);
  });

  it("setting lowerHeightBound updates correctly", () => {
    // Setup
    const mockModule = createMockCylinder();
    const newValue = 0.5;

    // Test
    mockModule.lowerHeightBound = newValue;
    const updatedLowerHeightBound = mockModule.lowerHeightBound;

    // Assert
    expect(updatedLowerHeightBound).to.equal(newValue);
  });

  it("setting lowerHeightBound to a value higher than upperHeightBound throws an error", () => {
    // Setup
    const mockModule = createMockCylinder();
    const newValue = mockModule.upperHeightBound + 1;

    // Test
    const testFunc = () => {
      mockModule.lowerHeightBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("upperAngleBound defaults to 1", () => {
    // Setup
    const mockModule = createMockCylinder();

    // Test
    let upperAngleBound: number = mockModule.upperAngleBound;

    // Assert
    expect(upperAngleBound).to.equal(1);
  });

  it("setting upperAngleBound updates correctly", () => {
    // Setup
    const mockModule = createMockCylinder();
    const newValue = 0.5;

    // Test
    mockModule.upperAngleBound = newValue;
    const updatedUpperAngleBound = mockModule.upperAngleBound;

    // Assert
    expect(updatedUpperAngleBound).to.equal(newValue);
  });

  it("setting upperAngleBound to a value lower than lowerAngleBound throws an error", () => {
    // Setup
    const mockModule = createMockCylinder();
    const newValue = mockModule.lowerAngleBound - 1;

    // Test
    const testFunc = () => {
      mockModule.upperAngleBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("upperHeightBound defaults to 1", () => {
    // Setup
    const mockModule = createMockCylinder();

    // Test
    let upperHeightBound: number = mockModule.upperHeightBound;

    // Assert
    expect(upperHeightBound).to.equal(1);
  });

  it("setting upperHeightBound updates correctly", () => {
    // Setup
    const mockModule = createMockCylinder();
    const newValue = 0.5;

    // Test
    mockModule.upperHeightBound = newValue;
    const updatedUpperAngleBound = mockModule.upperHeightBound;

    // Assert
    expect(updatedUpperAngleBound).to.equal(newValue);
  });

  it("setting upperHeightBound to a value lower than lowerHeightBound throws an error", () => {
    // Setup
    const mockModule = createMockCylinder();
    const newValue = mockModule.lowerHeightBound - 1;

    // Test
    const testFunc = () => {
      mockModule.upperHeightBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("calling build returns a noise map", () => {
    // Setup
    const mockModule: Cylinder = createMockCylinder();

    // Test
    const noiseMap: NoiseMap = mockModule.build();

    // Assert
    expect(noiseMap).not.to.be.null;
  });

  it("calling build with missing source module throws an error", () => {
    // Setup
    const mockModule: Cylinder = new Cylinder();

    // Test
    const testFunc = () => {
      mockModule.build();
    };

    // Assert
    expect(testFunc).to.throw();
  });
});

function createMockCylinder(): Cylinder {
  const value: number = 2;
  const sourceModule: any = new Const(value);
  const width: number = 10;
  const height: number = 10;

  return new Cylinder(sourceModule, width, height);
}