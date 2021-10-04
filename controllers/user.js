import User from '../models/user';
import { encryptString, generateSalt, hashCompare } from '../lib/encrypt';

let FIRST_REGISTRATION_EXIST = false;

export const comparePassword = (user, password) => {
  return hashCompare(password, user.passwordHash, user.passwordSalt);
};

export const createPassword = (password) => {
  const passwordSalt = generateSalt(32);
  const passwordHash = encryptString(password, passwordSalt);

  return { passwordHash, passwordSalt };
};

export const createUser = ({
  email, username, password, group
}) => {
  const { passwordHash, passwordSalt } = createPassword(password);

  const user = new User({
    email, username, passwordHash, passwordSalt, group
  });

  return user;
};

export const isUserExist = async (username) => {
  const user = await User.findOne({ username });

  return !!user;
};

export const isFirstRegistration = async () => {
  if (FIRST_REGISTRATION_EXIST) return false;

  const users = await User.find();

  if (users.length) FIRST_REGISTRATION_EXIST = true;

  return !users.length;
};

export const getUsersList = async (req, res) => {
  const { user } = req;
  const users = await User.find();

  return user.group >= 4 ? res.json(users) : res.status(403);
};
