const { query } = require("../lib/db");
const SQL = require("@nearform/sql");

async function getUsers() {
  try {
    const allUsers = await query(SQL`SELECT * FROM users;`);
    return allUsers;
  } catch (err) {
    console.error(err);
  }
}

async function getUser(id) {
  try {
    const user = await query(SQL`SELECT * FROM users WHERE id = ${id};`);
    return user;
  } catch (err) {
    console.error(err);
  }
}

async function addUser(req) {
  try {
    const sql = SQL`INSERT INTO users (email, password_hash, first_name, last_name, type, bio, picture) VALUES (${req.body.email}, ${req.body.hashPassword}, ${req.body.first_name}, ${req.body.last_name}, ${req.body.type}, ${req.body.bio}, ${req.body.picture})`;
    console.log("addUser")
    const user = await query(sql);
  } catch (err) {
    console.log(err);
  }
}

async function getUserByEmail(email) {
  try {
    const sql = `SELECT * FROM users WHERE email='${email}'`;
    const user = await query(sql);
    return user[0];
  } catch (err) {
    console.log(err);
  }
}

async function editUser(req) {
  try {
    const sql = SQL`UPDATE users SET email=${req.body.email}, bio=${req.body.bio}, first_name=${req.body.first_name}, last_name=${req.body.last_name}, password_hash=${req.body.hashPassword}, picture=${req.body.picture} WHERE id = ${req.params.id};`
  
    const editedUser = await query(sql);
    return editedUser;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { getUsers, getUser, addUser, getUserByEmail, editUser };
