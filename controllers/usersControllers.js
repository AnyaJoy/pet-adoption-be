const { getUsers, getUser, addUser, editUser } = require("../data/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signupController(req, res) {
  try {
    const user = await addUser(req);
    console.log(user);
    res.send("Signup Successful");
  } catch (err) {
    console.log(err);
  }
}

async function loginController(req, res) {
  try {
    const { password, user } = req.body;

    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (result) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        res.send({ user, token });
      } else {
        res.status(400).send("Incorrect Password");
        return;
      }
    });
  } catch (err) {
    console.log(err);
  }
}

async function getUsersController(req, res) {
  try {
    const allUsers = await getUsers();
    res.send(allUsers);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function getCurrentUserController(req, res) {
  try {
    const user = await getUser(req.body.decodedToken.id);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
}

async function getUserByIdController(req, res) {
  try {
    const user = await getUser(req.params.id);
    res.send(user);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function editUserController(req, res) {
  try {
    const editedUser = await editUser(req);
    res.send(editedUser);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getUsersController,
  getCurrentUserController,
  getUserByIdController,
  getUserByIdController,
  signupController,
  loginController,
  editUserController,
};
