import { execAsync } from "../util";
import ERROR_CODES from './errorCodes';

(async () => {
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
})();