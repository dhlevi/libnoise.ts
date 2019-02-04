import {
  execAsync,
  getBaseBuildConstants,
  rewriteImports,
} from './util';

(async () => {
  const buildConstants = getBaseBuildConstants();

  // Subscribe to SIGINT for this process
  process.on('SIGINT', safeExit);
  process.on('exit', safeExit);

  try {
    // Clean previous build before building
    console.log(await execAsync(`npm run build:clean`));

    // Compile typescript
    console.log(await execAsync(`tsc --project .`, true));

    // Enter build folder
    process.chdir(buildConstants.tsBuildFolder);

    console.log("Rewriting import statements");
    rewriteImports('./', buildConstants);
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
})();

function safeExit(): void {
  // Exit
  process.exit();
}