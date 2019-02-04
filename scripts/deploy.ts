import _ from 'lodash';
// @ts-ignore ignore missing types from `npm-registry`
import Registry from 'npm-registry';
import semver from 'semver';
import { promisify } from 'util';

import {
  execAsync,
  getBaseBuildConstants,
  getJson,
} from './util';

// Error codes for determining the cause of failures
const ERROR_CODES = {
  REGISTRY_INFO_FAILED: 100,
  LOCAL_VERSION_NOT_GREATER_THAN_REGISTRY: 101,
  LINT_FAILED: 102,
  TEST_FAILED: 103,
  BUILD_FAILED: 104,
  COPY_PACKAGE_JSON_FAILED: 105,
  NPM_ACCESS_TOKEN_EMPTY: 106,
  CREATING_NPMRC_FAILED: 107,
  PUBLISH_FAILED: 108,
  REMOVE_BUILT_TESTS_FAILED: 109,
  COPY_PROJECT_TO_PUBLISH_DIRECTORY_FAILED: 111,
};

export enum Steps {
  step01,
  step02,
  step03,
  step04,
  step05,
  step06,
  step07,
}

(async () => {
  let buildConstants = getBaseBuildConstants();

  // ------------------------------------------------------------

  console.log(`-- STEP 01 --`);
  console.log(`-- Compare latest version of package with current version`);
  console.log(`-- Fail the build if semver has not increased since last release`);

  // Get package.json details
  const localPackageInfo = getJson('./package.json');

  // Create Registry object
  const npm = new Registry({
    registry: 'https://skimdb.npmjs.com/registry',
  });

  try {
    // Get first package from list
    const [registryPackageInfo] = await promisify(npm.packages.get.bind(npm.packages))(localPackageInfo.name);

    if (!semver.gt(localPackageInfo.version, registryPackageInfo.version)) {
      // @FAILURE
      console.error(`Local version of '${localPackageInfo.name}' (${localPackageInfo.version}) is not greater than registry version: '${registryPackageInfo.version}'`);
      process.exit(ERROR_CODES.LOCAL_VERSION_NOT_GREATER_THAN_REGISTRY);
    } else {
      console.log(`Success! Local version of '${localPackageInfo.name}@${localPackageInfo.version}' is greater than remote '${registryPackageInfo.name}@${registryPackageInfo.version}'.`);
    }

  } catch (e) {
    // Do not stop execution if error is because of 404
    if (e.message === 'Invalid status code: 404' && e.statusCode === 404) {
      console.log(`Package '${localPackageInfo.name}' not found on npm registry. Presumably this is because this is the first deployment. Publish shall continue…`);
    } else {
      // Any other error occurred
      console.error(e);
      console.error(`Failed getting registry details for '${localPackageInfo.name}'`);
      // @FAILURE
      process.exit(ERROR_CODES.REGISTRY_INFO_FAILED);
    }
  }

  // ------------------------------------------------------------

  console.log(`-- STEP 02 --`);
  console.log(`-- Ensure the linter returns no issues`);

  try {
    // Invoke lint command
    console.log(await execAsync('npm run lint'));

    console.log("Success! Linting returned no errors.");
  } catch (e) {
    console.error(e);
    console.error("Linting failed.");
    // @FAILURE
    process.exit(ERROR_CODES.LINT_FAILED);
  }

  // ------------------------------------------------------------

  console.log(`-- STEP 03 -- `);
  console.log(`-- Ensure all tests pass`);

  try {
    // Invoke test command
    console.log(await execAsync('npm test'));

    console.log("Success! All tests executed without error.");
  } catch (e) {
    console.error(e);
    console.error("Testing failed.");
    // @FAILURE
    process.exit(ERROR_CODES.TEST_FAILED);
  }

  // ------------------------------------------------------------

  console.log(`-- STEP 04 -- `);
  console.log(`-- Build the project. Fail the build if this does not succeed`);

  try {
    // Invoke build command
    console.log(await execAsync('npm run build'));

    console.log("Success! Built project without error.");
  } catch (e) {
    console.error(e);
    console.error("Build failed.");
    // @FAILURE
    process.exit(ERROR_CODES.BUILD_FAILED);
  }

  // ------------------------------------------------------------

  console.log(`-- STEP 05 --`);
  console.log(`-- Copy project, package.json, and cd into the build directory`);

  try {
    // Copy project to publish directory
    await execAsync(`cp -r ${buildConstants.tsBuildFolder}/src ${buildConstants.publishDirectory}`, true);
  } catch (e) {
    console.error(e);
    console.error("Failed to copy project to publish directory");
    // @FAILURE
    process.exit(ERROR_CODES.COPY_PROJECT_TO_PUBLISH_DIRECTORY_FAILED);
  }

  try {
    // Copy package.json into build directory
    await execAsync(`cp package.json ${buildConstants.publishDirectory}`, true);
  } catch (e) {
    console.error(e);
    console.error("Failed to copy package.json into output directory");
    // @FAILURE
    process.exit(ERROR_CODES.COPY_PACKAGE_JSON_FAILED);
  }

  // cd into build directory
  process.chdir(buildConstants.publishDirectory);

  console.log(`Success! Copied package.json and entered build directory '${buildConstants.publishDirectory}'.`);

  // ------------------------------------------------------------

  // @TODO re-enable
  const isDryRun = true; // argv['dry-run'];

  console.log(`-- STEP 06 ${isDryRun ? '(SKIPPED)' : ''} --`);
  console.log(`-- Set up environment for publishing to npm`);

  if (!isDryRun) {
    try {
      // Get npm access token for deployment
      const NPM_ACCESS_TOKEN = process.env.NPM_ACCESS_TOKEN;

      // Ensure access token is not empty
      if (_.isEmpty(NPM_ACCESS_TOKEN)) {
        console.error("npm access token is empty");
        // @FAILURE
        process.exit(ERROR_CODES.NPM_ACCESS_TOKEN_EMPTY);
      }

      // Create .npmrc
      await execAsync(`echo '//registry.npmjs.org/:_authToken=${NPM_ACCESS_TOKEN}' > .npmrc`);

      console.log("Success! Created .npmrc file with npm access token.");
    } catch (e) {
      console.error(e);
      console.error("Failed to create .npmrc file");
      // @FAILURE
      process.exit(ERROR_CODES.CREATING_NPMRC_FAILED);
    }
  }

  // ------------------------------------------------------------

  console.log(`-- STEP 07 ${isDryRun ? '(SKIPPED)' : ''} --`);
  console.log(`-- Publish to npm`);

  // Don't deploy if --dry-run`
  if (!isDryRun) {
    try {
      // Publish package to npm
      console.log(await execAsync('npm publish'));

      console.log("Success! Published to npm.");
    } catch (e) {
      console.error(e);
      console.error("Failed to publish package to npm");
      // @FAILURE
      process.exit(ERROR_CODES.PUBLISH_FAILED);
    }
  }

  console.log("Deployment succeeded.");
})();
