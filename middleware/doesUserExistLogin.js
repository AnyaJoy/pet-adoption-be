const { getUserByEmail } = require('../data/users');

async function doesUserExistLogin (req, res, next) {
  const user = await getUserByEmail(req.body.email);
  if (!user) {
    res.status(400).send('User with this email does not exist');
    return;
  }
  req.body.user = user;
  next();
};


module.exports = {doesUserExistLogin}