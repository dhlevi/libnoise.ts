import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Min } from '@app/module/combiner';
import { Const } from '@app/module/generator';

describe('module/combiner/min', () => {
  it("can construct successfully", () => {
    // Setup
    const valueA = 2;
    const valueB = 3;
    const sourceModuleA = new Const(valueA);
    const sourceModuleB = new Const(valueB);

    // Test
    const testFunc = () => {
      new Min([sourceModuleA, sourceModuleB]);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue with 0 sourceModules throws an error", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = 10;
    const mockModule = new Min();

    // Test
    const testFunc = () => {
      mockModule.getValue(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw();
  });

  it("calling getValue with only 1 sourceModule throws an error", () => {
    // Setup
    const x = 10;
    const y = 10;
    const z = 10;
    const valueA = 2;
    const sourceModuleA = new Const(valueA);
    const mockModule = new Min([sourceModuleA]);

    // Test
    const testFunc = () => {
      mockModule.getValue(x, y, z);
    };

    // Assert
    expect(testFunc).to.throw();
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
});

function createMockModule() {
  const valueA = 2;
  const valueB = 3;
  const sourceModuleA = new Const(valueA);
  const sourceModuleB = new Const(valueB);

  return new Min([sourceModuleA, sourceModuleB]);
}
