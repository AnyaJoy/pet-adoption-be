async function addUserStatus(req, res, next) {
  req.body.type = "User";
  req.body.bio = "Change your bio...";
  req.body.picture = "";
  next();
}

module.exports = { addUserStatus };
