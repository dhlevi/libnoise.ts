import { cleanBuild, getBaseBuildConstants } from './util';

const buildConstants = getBaseBuildConstants();

const foldersToClean: string[] = [
  buildConstants.publishDirectory,
  buildConstants.tsBuildFolder,
  'processing-package',
];

(async () => {
  await cleanBuild(foldersToClean);
})();