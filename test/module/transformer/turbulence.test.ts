import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Const } from '@app/module/generator';
import { Turbulence } from '@app/module/transformer';

describe('module/transformer/turbulence', () => {
  it("can construct successfully", () => {
    // Setup
    const sourceValue = 2;
    const sourceModule = new Const(sourceValue);
    const frequency = 1.5;
    const power = 1.5;
    const roughness = 4;
    const seed = 18;

    // Test
    const testFunc = () => {
      new Turbulence(sourceModule, frequency, power, roughness, seed);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue returns a number", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = 10;
    const mockModule = createMockModule();

    // Test
    const value = mockModule.getValue(x, y, z);

    // Assert
    expect(value).to.be.ok;
  });

  it("setting frequency updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 2;

    // Test
    mockModule.frequency = newValue;
    const updatedValue = mockModule.frequency;

    // Assert
    expect(updatedValue).to.equal(newValue);
  });

  it("setting roughness updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 5;

    // Test
    mockModule.roughness = newValue;
    const updatedValue = mockModule.roughness;

    // Assert
    expect(updatedValue).to.equal(newValue);
  });

  it("setting seed updates correctly", () => {
    // Setup
    const mockModule = createMockModule();
    const newValue = 5;

    // Test
    mockModule.seed = newValue;
    const updatedValue = mockModule.seed;

    // Assert
    expect(updatedValue).to.equal(newValue);
  });
});

function createMockModule() {
  const sourceValue = 2;
  const sourceModule = new Const(sourceValue);
  const frequency = 1.5;
  const power = 1.5;
  const roughness = 4;
  const seed = 18;

  return new Turbulence(sourceModule, frequency, power, roughness, seed);
}
