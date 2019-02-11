// @ts-ignore ignore missing types from `npm-registry`
import Registry from 'npm-registry';
import semver from 'semver';
import { promisify } from 'util';

import {
  getJson,
} from '../util';

import ERROR_CODES from './errorCodes';

/**
 * Compare latest version of package with current version
 * Fail the build if semver has not increased since last release
 */
(async () => {
  // Get package.json details
  const localPackageInfo = getJson('./package.json');

  // Create Registry object
  const npm = new Registry({
    registry: 'https://registry.npmjs.org',
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
})();