import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Const } from '@app/module/generator';

describe('module/generator/const', () => {
  it("can construct successfully", () => {
    // Setup
    const value = 2;

    // Test
    const testFunc = () => {
      new Const(value);
    };

    // Assert
    expect(testFunc).not.to.throw();
  });

  it("calling getValue returns a number", () => {
    // Setup
    const mockModule = createMockModule();

    // Test
    const value = mockModule.getValue();

    // Assert
    expect(value).to.be.ok;
  });
});

function createMockModule(): Const {
  const value = 2;

  return new Const(value);
}
