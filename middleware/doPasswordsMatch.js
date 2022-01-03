function doPasswordsMatch(req, res, next) {
  const { password, repassword } = req.body;
  if (password !== repassword) {
    res.status(400).send(`Passwords don't match`);
    return;
  }
  next();
}


module.exports = {doPasswordsMatch}
