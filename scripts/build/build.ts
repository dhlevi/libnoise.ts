import { spawnAsync } from "../util";
import ERROR_CODES from './errorCodes';

(async () => {
  try {
    // Invoke build command
    await spawnAsync('npm run build');

    console.log("Success! Built project without error.");
  } catch (e) {
    console.error(e);
    console.error("Build failed.");
    // @FAILURE
    process.exit(ERROR_CODES.BUILD_FAILED);
  }
})();