const bcrypt = require("bcrypt");
const { getUser } = require("../data/users");

async function encryptPassword(req, res, next) {
  const { password } = req.body;

  //checking if the user is changing his password
  if (req.params.id) {
    const user = await getUser(req.params.id);
    if (user[0].password_hash == password) {
      req.body.hashPassword = password;
      next();
    }
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send("Error Encrypting");
      return;
    }
    req.body.hashPassword = hash;
    next();
  });
}

module.exports = { encryptPassword };
