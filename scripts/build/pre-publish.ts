import { getBaseBuildConstants, spawnAsync } from "../util";
import ERROR_CODES from './errorCodes';

(async () => {
  let buildConstants = getBaseBuildConstants();

  try {
    // Copy project to publish directory
    await spawnAsync(`cp -r ${buildConstants.tsBuildFolder}/src ${buildConstants.publishDirectory}`, true);
  } catch (e) {
    console.error(e);
    console.error("Failed to copy project to publish directory");
    // @FAILURE
    process.exit(ERROR_CODES.COPY_PROJECT_TO_PUBLISH_DIRECTORY_FAILED);
  }

  try {
    // Copy package.json into build directory
    await spawnAsync(`cp ./package.json ${buildConstants.publishDirectory}/package.json`, true);
  } catch (e) {
    console.error(e);
    console.error("Failed to copy package.json into output directory");
    // @FAILURE
    process.exit(ERROR_CODES.COPY_PACKAGE_JSON_FAILED);
  }

  // cd into build directory
  process.chdir(buildConstants.publishDirectory);

  console.log(`Success! Copied package.json and entered build directory '${buildConstants.publishDirectory}'.`);
})();