import path from 'path';
import { getFilenamesFromDirMatching } from '../lib/helpers';

const { log } = console;

export const collection = new Set();

export const pathModules = path.join(process.cwd(), 'modules');

export const applyModules = async () => {
  const modulesNames = await getFilenamesFromDirMatching(
    pathModules,
    (file) => !file.includes('.')
  );

  modulesNames.forEach(async (moduleName) => {
    const pathModule = path.join(pathModules, moduleName);
    import(pathModule).then((module) => {
      const Module = module.default;

      if (Module.allow) {
        collection.add(new Module());
      }
    }).catch((e) => {
      log(`Module ${moduleName} not loaded: `);
      if (process.env.NODE_ENV === 'development') {
        log(e.message);
      }
    });
  });
};
