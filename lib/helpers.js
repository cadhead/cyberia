import fs from 'fs';
import assertString from 'validator/lib/util/assertString';

export function isNonEmptyObject(o) {
  return (typeof o === 'object' && o !== null && !Array.isArray(o) && Object.keys(o).length);
}

export async function findFromDir(dirname, cond = null) {
  return new Promise((resolve, reject) => {
    assertString(dirname);

    fs.readdir(dirname, (err, filenames) => {
      if (err) {
        reject(err);
      }

      let matchingFiles = null;

      if (typeof cond === 'function') {
        matchingFiles = [];

        filenames.forEach(file => {
          if (cond(file)) {
            matchingFiles.push(file);
          }
        });
      }

      resolve(matchingFiles || filenames);
    });
  });
}
