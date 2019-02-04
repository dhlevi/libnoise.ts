import rimraf from 'rimraf';

import { getBaseBuildConstants } from './util';

const buildConstants = getBaseBuildConstants();

const foldersToClean: string[] = [
  buildConstants.publishDirectory,
  buildConstants.tsBuildFolder,
];

foldersToClean.map((folder) => rimraf.sync(folder));