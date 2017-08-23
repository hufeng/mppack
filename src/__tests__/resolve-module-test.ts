import {
  resolveNodeModuleMainEntry,
  resolveNodeModuleSubModule
} from '../resolve-module';

describe('test module resolve', () => {
  it('test main entry', async () => {
    const mainBabelFile = await resolveNodeModuleMainEntry('babel-core');
    expect(mainBabelFile).toEqual('node_modules/babel-core/index.js');

    const mainTypeScriptFile = await resolveNodeModuleMainEntry('typescript');
    expect(mainTypeScriptFile).toEqual(
      'node_modules/typescript/lib/typescript.js'
    );

    const mainGulpFile = await resolveNodeModuleMainEntry('gulp');
    expect(mainGulpFile).toEqual('node_modules/gulp/index.js');
  });

  it('test sub module', async () => {
    const babelSub = await resolveNodeModuleSubModule(
      'babel-core/lib/api/node'
    );
    expect(babelSub).toEqual('node_modules/babel-core/lib/api/node.js');

    const babelPresetEnvSub = await resolveNodeModuleSubModule(
      'babel-preset-env/lib'
    );
    expect(babelPresetEnvSub).toEqual(
      'node_modules/babel-preset-env/lib/index.js'
    );
  });
});
