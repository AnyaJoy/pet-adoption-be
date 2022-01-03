const { getUserByEmail } = require('../data/users');

async function doesUserExistSignup(req, res, next) {
  const user = await getUserByEmail(req.body.email);
  if (user) {
    res.status(401).send('User with this email already exists');
    return;
  }
  next();
};

module.exports = {doesUserExistSignup}