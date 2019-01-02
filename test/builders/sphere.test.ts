import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Sphere } from '@app/builders';
import { Const } from '@app/module/generator';
import NoiseMap from '@app/noisemap';

describe("builders/sphere", () => {
  it("can construct successfully", () => {
    // Setup
    const value: number = 2;
    const sourceModule = new Const(value);
    const width: number = 10;
    const height: number = 10;

    // Test
    const testFunc = () => {
      new Sphere(sourceModule, width, height);
    };

    // Assert
    expect(testFunc).not.to.throw;
  });

  it("westLonBound defaults to 0", () => {
    // Setup
    const mockModule = createMockSphere();

    // Test
    let westLonBound: number = mockModule.westLonBound;

    // Assert
    expect(westLonBound).to.equal(0);
  });

  it("setting westLonBound updates correctly", () => {
    // Setup
    const mockModule = createMockSphere();
    const newValue = -0.5;

    // Test
    mockModule.westLonBound = newValue;
    const updatedWestLonBound = mockModule.westLonBound;

    // Assert
    expect(updatedWestLonBound).to.equal(newValue);
  });

  it("setting westLonBound to a value higher than eastLonBound throws an error", () => {
    // Setup
    const mockModule = createMockSphere();
    const newValue = mockModule.eastLonBound + 1;

    // Test
    const testFunc = () => {
      mockModule.westLonBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("southLatBound defaults to 0", () => {
    // Setup
    const mockModule = createMockSphere();

    // Test
    let southLatBound: number = mockModule.southLatBound;

    // Assert
    expect(southLatBound).to.equal(0);
  });

  it("setting southLatBound updates correctly", () => {
    // Setup
    const mockModule = createMockSphere();
    const newValue = -0.5;

    // Test
    mockModule.southLatBound = newValue;
    const updatedSouthLatBound = mockModule.southLatBound;

    // Assert
    expect(updatedSouthLatBound).to.equal(newValue);
  });

  it("setting southLatBound to a value higher than northLatBound throws an error", () => {
    // Setup
    const mockModule = createMockSphere();
    const newValue = mockModule.northLatBound + 1;

    // Test
    const testFunc = () => {
      mockModule.southLatBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("eastLonBound defaults to 0", () => {
    // Setup
    const mockModule = createMockSphere();

    // Test
    let eastLonBound: number = mockModule.eastLonBound;

    // Assert
    expect(eastLonBound).to.equal(0);
  });

  it("setting eastLonBound updates correctly", () => {
    // Setup
    const mockModule = createMockSphere();
    const newValue = 0.5;

    // Test
    mockModule.eastLonBound = newValue;
    const updatedEastLonBound = mockModule.eastLonBound;

    // Assert
    expect(updatedEastLonBound).to.equal(newValue);
  });

  it("setting eastLonBound to a value lower than westLonBound throws an error", () => {
    // Setup
    const mockModule = createMockSphere();
    const newValue = mockModule.westLonBound - 1;

    // Test
    const testFunc = () => {
      mockModule.eastLonBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("northLatBound defaults to 0", () => {
    // Setup
    const mockModule = createMockSphere();

    // Test
    let northLatBound: number = mockModule.northLatBound;

    // Assert
    expect(northLatBound).to.equal(0);
  });

  it("setting northLatBound updates correctly", () => {
    // Setup
    const mockModule = createMockSphere();
    const newValue = 0.5;

    // Test
    mockModule.northLatBound = newValue;
    const updatedNorthLatBound = mockModule.northLatBound;

    // Assert
    expect(updatedNorthLatBound).to.equal(newValue);
  });

  it("setting northLatBound to a value lower than southLatBound throws an error", () => {
    // Setup
    const mockModule = createMockSphere();
    const newValue = mockModule.southLatBound - 1;

    // Test
    const testFunc = () => {
      mockModule.northLatBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("calling build returns a noise map", () => {
    // Setup
    const mockModule = createMockSphere();

    // Test
    const noiseMap: NoiseMap = mockModule.build();

    // Assert
    expect(noiseMap).not.to.be.null;
  });
});

function createMockSphere(): Sphere {
  const value: number = 2;
  const sourceModule = new Const(value);
  const width: number = 10;
  const height: number = 10;



  return new Sphere(sourceModule, width, height);
}