import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Plane } from '@app/model';
import { Const } from '@app/module/generator';

describe('model/plane', () => {
  it("can construct successfully", () => {
    // Setup
    const value = 2;
    const sourceModule = new Const(value);

    // Test
    const testFunc = () => {
      new Plane(sourceModule);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue returns a number", () => {
    // Setup
    const x = 10;
    const z = 10;
    const mockModule = createMockModule();

    // Test
    const value = mockModule.getValue(x, z);

    // Assert
    expect(value).to.be.ok;
  });
});

function createMockModule(): Plane {
  const value = 2;
  const sourceModule = new Const(value);

  return new Plane(sourceModule);
}
