const { getUser } = require("../data/users");

async function checkUserType(req, res, next) {
  const user = await getUser(req.body.decodedToken.id);
  if (user[0].type !== "Admin") {
    res.send("Protected to admin only");
    res.status(401);
    return;
  }
  next();
}

module.exports = { checkUserType };
