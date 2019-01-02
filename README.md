# libnoise.ts

### Original project (by [jmcneese](https://github.com/jmcneese/libnoise.js)):
> A (mostly) direct port of C++ [libnoise](http://libnoise.sourceforge.net/index.html) for CommonJS/Node.js

This is a fork that ports the code to TypeScript and modernises things a bit. This library can be used with both Node.js and web projects.

## Backlog
  - Explicit return types on functions
  - Reconcile public/private members against libnoise source
  - Audit npm
  - JSDOC public methods
  - Remove random // SETUP and // TEST comments from createMock___() functions
  - Rename createMock___() functions to createMockModule()
  - Align property and variable names with libnoise
  - Probably make script utils less modular and just call themselves
  
  - Probably remove dependency on src/types folder
  - Test base classes?
  - Consider re-adding javascript-esque validation for npm consumption
  - @TODO
  - Write a main module lol
  - Add types for array-based structures
  - Real enums for enum types
  - Add `readonly` to public static defaults