import _ from 'lodash';

import { execAsync } from "../util";
import ERROR_CODES from './errorCodes';

(async () => {
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
})();