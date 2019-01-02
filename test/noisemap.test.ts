import { expect } from 'chai';
import { describe, it } from 'mocha';

import NoiseMap from '@app/noisemap';

describe('noisemap', () => {
  it("can construct successfully", () => {
    // Setup
    const width = 10;
    const height = 10;

    // Test
    const testFunc = () => {
      new NoiseMap(width, height);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("setting height updates correctly", () => {
    // Setup
    const mockMap = createMockMap();
    const newValue = 20;

    // Test
    mockMap.height = newValue;
    const updatedValue = mockMap.height;

    // Assert
    expect(updatedValue).to.equal(newValue);
  });

  it("setting height to 0 throws an error", () => {
    // Setup
    const mockMap = createMockMap();
    const newValue = 0;

    // Test
    const testFunc = () => {
      mockMap.height = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("setting height to less than 0 throws an error", () => {
    // Setup
    const mockMap = createMockMap();
    const newValue = -10;

    // Test
    const testFunc = () => {
      mockMap.height = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("setting width updates correctly", () => {
    // Setup
    const mockMap = createMockMap();
    const newValue = 20;

    // Test
    mockMap.width = newValue;
    const updatedValue = mockMap.width;

    // Assert
    expect(updatedValue).to.equal(newValue);
  });

  it("setting width to 0 throws an error", () => {
    // Setup
    const mockMap = createMockMap();
    const newValue = 0;

    // Test
    const testFunc = () => {
      mockMap.width = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("setting width to less than 0 throws an error", () => {
    // Setup
    const mockMap = createMockMap();
    const newValue = -10;

    // Test
    const testFunc = () => {
      mockMap.width = newValue;
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("calling addValue correctly adds to the existing value", () => {
    // Setup
    const mockMap = createMockMap();
    const x = 1;
    const y = 1;
    const originalValue = 10;
    mockMap.setValue(x, y, originalValue);
    const addValue = 3;
    const expectedValue = originalValue + addValue;

    // Test
    mockMap.addValue(x, y, addValue);
    const updatedValue = mockMap.getValue(x, y);


    // Assert
    expect(updatedValue).to.equal(expectedValue);
  });

  it("calling getValue returns the correct value", () => {
    // Setup
    const mockMap = createMockMap();
    const x = 1;
    const y = 1;
    const value = 13;
    mockMap.setValue(x, y, value);

    // Test
    const retrievedValue = mockMap.getValue(x, y);

    // Assert
    expect(retrievedValue).to.equal(value);
  });

  it("calling setSize correctly updates width and height", () => {
    // Setup
    const mockMap = createMockMap();
    const newWidth = 20;
    const newHeight = 25;

    // Test
    mockMap.setSize(newWidth, newHeight);
    const updatedWidth = mockMap.width;
    const updatedHeight = mockMap.height;

    // Assert
    expect(updatedWidth).to.equal(newWidth);
    expect(updatedHeight).to.equal(newHeight);
  });

  it("calling setValue correctly updates the correct value", () => {
    // Setup
    const mockMap = createMockMap();
    const x = 1;
    const y = 1;
    mockMap.setValue(x, y, 13);
    const newValue = 27;

    // Test
    mockMap.setValue(x, y, newValue);
    const updatedValue = mockMap.getValue(x, y);

    // Assert
    expect(updatedValue).to.equal(newValue);
  });

  it("calling subtractValue correctly subtracts to the existing value", () => {
    // Setup
    const mockMap = createMockMap();
    const x = 1;
    const y = 1;
    const originalValue = 10;
    mockMap.setValue(x, y, originalValue);
    const subtractValue = 3;
    const expectedValue = originalValue - subtractValue;

    // Test
    mockMap.subtractValue(x, y, subtractValue);
    const updatedValue = mockMap.getValue(x, y);

    // Assert
    expect(updatedValue).to.equal(expectedValue);
  });
});

function createMockMap(): NoiseMap {
  const width = 10;
  const height = 10;

  return new NoiseMap(width, height);
}