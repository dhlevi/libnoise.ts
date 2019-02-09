import _ from 'lodash';
import { argv } from 'yargs';

import {
  spawnAsync,
} from './util';

export enum Steps {
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
}

(async () => {
  console.log(`-- STEP 01 --`);
  console.log(`-- Compare latest version of package with current version`);
  console.log(`-- Fail the build if semver has not increased since last release`);

  await spawnAsync(`npm run ts-node -- scripts/build/checkRegistry.ts`);

  // ------------------------------------------------------------

  console.log(`-- STEP 02 --`);
  console.log(`-- Ensure the linter returns no issues`);

  await spawnAsync(`npm run ts-node -- scripts/build/lint.ts`);

  // ------------------------------------------------------------

  console.log(`-- STEP 03 -- `);
  console.log(`-- Ensure all tests pass`);

  await spawnAsync(`npm run ts-node -- scripts/build/test.ts`);

  // ------------------------------------------------------------

  console.log(`-- STEP 04 -- `);
  console.log(`-- Build the project. Fail the build if this does not succeed`);

  await spawnAsync(`npm run ts-node -- scripts/build/build.ts`);

  // ------------------------------------------------------------

  console.log(`-- STEP 05 --`);
  console.log(`-- Copy project, package.json, and cd into the build directory`);

  await spawnAsync(`npm run ts-node -- scripts/build/pre-publish.ts`);

  // ------------------------------------------------------------

  // @NOTE In case, for whatever reason, you wanted to actually run
  //  the build to its completion and publish the package on npm,
  //  you must pass the --publish flag specifically
  const isDryRun = !argv.publish;

  console.log(`-- STEP 06 ${isDryRun ? '(SKIPPED)' : ''} --`);
  console.log(`-- Set up environment for publishing to npm`);
  console.log(`-- Publish to npm`);

  if (!isDryRun) {
    await spawnAsync(`npm run ts-node -- scripts/build/publish.ts`);
  }

  console.log("Deployment succeeded.");
})();
