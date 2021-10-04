import { join } from 'path';

import { findFromDir } from '../lib/helpers';

const modelsPath = join(process.cwd(), 'models');
const condition = (file) => file.includes('.js') && file !== 'index.js';

export const applyModels = async () => {
  const files = await findFromDir(modelsPath, condition);
  files.forEach(async file => {
    // eslint-disable-next-line global-require
    require(join(modelsPath, file));
  });
};
