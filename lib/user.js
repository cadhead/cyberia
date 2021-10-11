import { encryptString, generateSalt, hashCompare } from './encrypt';

export const getEncryptedPassword = (password) => {
  const passSalt = generateSalt();
  const passHash = encryptString(password, passSalt);

  return { passHash, passSalt };
};

export const checkPassword = (pass, hash, salt) => {
  return hashCompare(pass, hash, salt);
};

export const getUserProfile = (user) => {
  const { username, group, avatar } = user;

  const profile = {
    username: username || '',
    group: group || '',
    avatar: avatar || ''
  };

  return profile;
};
