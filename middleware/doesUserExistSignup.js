const { getUserByEmail } = require('../data/users');


async function doesUserExistSignup(req, res, next) {
  const user = await getUserByEmail(req.body.email);
  if (user) {
    res.status(400).send('User Already Exist');
    return;
  }
  next();
};


module.exports = {doesUserExistSignup}