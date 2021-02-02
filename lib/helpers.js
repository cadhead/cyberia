import fs from 'fs';

export function isNonEmptyObject(o) {
  return (typeof o === 'object' && o !== null && !Array.isArray(o) && Object.keys(o).length);
}

export async function getFilenamesFromDirMatching(dirname, cond = null) {
  return new Promise((resolve, reject) => {
    if (typeof dirname !== 'string') {
      reject(new Error('Expected string dirname.'));
    }

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
