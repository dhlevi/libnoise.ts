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
    const mockModule = createMockModule();

    // Test
    let lowerXBound: number = mockModule.lowerXBound;

    // Assert
    expect(lowerXBound).to.equal(0);
  });

  it("setting lowerXBound updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 0.5;

    // Test
    mockModule.lowerXBound = newValue;
    const updatedLowerXBound = mockModule.lowerXBound;

    // Assert
    expect(updatedLowerXBound).to.equal(newValue);
  });

  it("setting lowerXBound to a value higher than upperXBound throws an error", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = mockModule.upperXBound + 1;

    // Test
    const testFunc = () => {
      mockModule.lowerXBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("lowerZBound defaults to 0", () => {
    // Setup
    const mockModule = createMockModule();

    // Test
    let lowerZBound: number = mockModule.lowerZBound;

    // Assert
    expect(lowerZBound).to.equal(0);
  });

  it("setting lowerZBound updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 0.5;

    // Test
    mockModule.lowerZBound = newValue;
    const updatedLowerYBound = mockModule.lowerZBound;

    // Assert
    expect(updatedLowerYBound).to.equal(newValue);
  });

  it("setting lowerZBound to a value higher than upperZBound throws an error", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = mockModule.upperZBound + 1;

    // Test
    const testFunc = () => {
      mockModule.lowerZBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("upperXBound defaults to 1", () => {
    // Setup
    const mockModule = createMockModule();

    // Test
    let upperXBound: number = mockModule.upperXBound;

    // Assert
    expect(upperXBound).to.equal(1);
  });

  it("setting upperXBound updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 0.5;

    // Test
    mockModule.upperXBound = newValue;
    const updatedUpperXBound = mockModule.upperXBound;

    // Assert
    expect(updatedUpperXBound).to.equal(newValue);
  });

  it("setting upperXBound to a value lower than lowerXBound throws an error", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = mockModule.lowerXBound - 1;

    // Test
    const testFunc = () => {
      mockModule.upperXBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("upperZBound defaults to 1", () => {
    // Setup
    const mockModule = createMockModule();

    // Test
    let upperZBound: number = mockModule.upperZBound;

    // Assert
    expect(upperZBound).to.equal(1);
  });

  it("setting upperZBound updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 0.5;

    // Test
    mockModule.upperZBound = newValue;
    const updatedUpperAngleBound = mockModule.upperZBound;

    // Assert
    expect(updatedUpperAngleBound).to.equal(newValue);
  });

  it("setting upperZBound to a value lower than lowerZBound throws an error", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = mockModule.lowerZBound - 1;

    // Test
    const testFunc = () => {
      mockModule.upperZBound = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("calling build returns a noise map", () => {
    // Setup
    const mockModule = createMockModule();

    // Test
    const noiseMap: NoiseMap = mockModule.build();

    // Assert
    expect(noiseMap).not.to.be.null;
  });
});

function createMockModule(): Plane {
  const value: number = 2;
  const sourceModule = new Const(value);
  const width: number = 10;
  const height: number = 10;
  const seamless = false;

  return new Plane(sourceModule, width, height, seamless);
}