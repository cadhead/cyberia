export default {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 6 * 60 * 60 * 1000,
    secure: false
  },
  // store: sessionStore,
  rolling: true,
  resave: false,
  saveUninitialized: false
};
