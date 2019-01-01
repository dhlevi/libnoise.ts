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
    const y = 10;
    const mockModule = createMockPlane();

    // Test
    const value = mockModule.getValue(x, y);

    // Assert
    expect(value).to.be.ok;
  });
});

function createMockPlane() {
  // Setup
  const value = 2;
  const sourceModule = new Const(value);

  // Test
  return new Plane(sourceModule);
}
