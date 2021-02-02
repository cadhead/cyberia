import crypto from 'crypto';

export function encryptString(string, salt) {
  return crypto.createHmac('sha256', salt).update(string).digest('hex');
}

export function hashCompare(string, hash, salt) {
  let hashedString = encryptString(string, salt);

  return hashedString === hash;
}

export function generateSalt(size = 32) {
  return crypto.randomBytes(size).toString('hex');
}
