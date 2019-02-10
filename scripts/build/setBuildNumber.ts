import { getBaseBuildConstants } from "../util";
import ERROR_CODES from './errorCodes';

(async () => {
  try {
    const buildConstants = getBaseBuildConstants();
    const branchName = process.env.BUILD_SOURCEBRANCHNAME as string;
    const buildId = process.env.BUILD_BUILDID as string;

    let version = buildConstants.packageJson.version;
    if (branchName !== 'master') {
      version += `-${branchName}b${buildId}`;
    }

    console.log(`##vso[build.updatebuildnumber]${version}`);
  } catch (e) {
    console.error(e);
    console.error("Failed to set build number. ");
    process.exit(ERROR_CODES.SET_BUILD_NUMBER_FAILED);
  }
})();