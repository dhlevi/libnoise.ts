import getJson from './getJson';

export interface IBuildConstantsBase {
  tsConfig: any;
  tsBuildFolder: string;
  packageJson: any;
  publishDirectory: string;
}

export default function getBaseBuildConstants(): IBuildConstantsBase {
  // Build folder constants
  // @TODO make/find a type declaration for tsconfig
  const tsConfig = getJson('./tsconfig.json');
  const packageJson = getJson('./package.json');

  return {
    tsConfig,                                                   // Instance of tsConfig
    tsBuildFolder: tsConfig.compilerOptions.outDir,        // Folder tsconfig is set to build into
    packageJson,
    publishDirectory: '_publish',
  };
}