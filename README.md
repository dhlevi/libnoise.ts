# libnoise.ts

### Original project (by [jmcneese](https://github.com/jmcneese/libnoise.js)):
> A (mostly) direct port of C++ [libnoise](http://libnoise.sourceforge.net/index.html) for CommonJS/Node.js

This is a fork that ports the code to TypeScript and modernises things a bit. This library can be used with both Node.js and web projects.

## Backlog
  - Reconcile public/private members against libnoise source
  - Audit npm
  - JSDOC public methods
  - Align property and variable names with libnoise
  - Probably make script utils less modular and just call themselves
  
  - Probably remove dependency on src/types folder
  - Consider re-adding javascript-esque validation for npm consumption
  - Resolve @TODOs
  - Add types for array-based structures
  - Real enums for enum types
  - Re-align parameter orders with original library
  - Rename params to match libnoise
  - Set license