const express = require("express");
const { getUsers, getUser, addUser, editUser } = require("../data/users");
const { validateBody } = require("../middleware/validateBody");
const { doesUserExistSignup } = require("../middleware/doesUserExistSignup");
const { doPasswordsMatch } = require("../middleware/doPasswordsMatch");
const { encryptPassword } = require("../middleware/encryptPassword");
const { doesUserExistLogin } = require("../middleware/doesUserExistLogin");
const { checkToken } = require("../middleware/checkToken");
const { checkUserType } = require("../middleware/checkUserType");
const schemas = require("../schemas/allSchemas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.get("/", checkToken, checkUserType, async (req, res) => {
  try {
    const allUsers = await getUsers();
    res.send(allUsers);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
});

router.get("/currentuser", checkToken, async (req, res) => {
  try {
    const user = await getUser(req.body.decodedToken.id);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", checkToken, checkUserType, async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    res.send(user);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/signup",
  validateBody(schemas.signupSchema),
  doesUserExistSignup,
  doPasswordsMatch,
  encryptPassword,
  async (req, res) => {
    try {
      const user = await addUser(req);
      console.log(user);
      res.send("Signup Successful");
    } catch (err) {
      console.log(err);
    }
  }
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  doesUserExistLogin,
  async (req, res) => {
    try {
      const { password, user } = req.body;

      bcrypt.compare(password, user.password_hash, (err, result) => {
        if (err) {
          res.status(400).send("Incorrect Password");
          return;
        }
        if (result) {
          const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
          res.send({ user, token });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
);

router.put(
  "/edit/:id",
  validateBody(schemas.updateUserSchema),
  checkToken,
  encryptPassword,
  async (req, res) => {
    try {
      const editedUser = await editUser(req);
      res.send(editedUser);
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
