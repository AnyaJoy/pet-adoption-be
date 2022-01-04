async function addUserStatus(req, res, next) {
  req.body.type = "User";
  req.body.bio = "Change your bio...";
  req.body.picture = "https://res.cloudinary.com/deaqcrhah/image/upload/v1641327982/default-profile-pic_fku9i9.png";
  next();
}

module.exports = { addUserStatus };
