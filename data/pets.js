const { query } = require("../lib/db");
const SQL = require("@nearform/sql");

async function getPets() {
  try {
    const allPets = await query(SQL`SELECT * FROM pets`);
    return allPets;
  } catch (err) {
    console.error(err);
  }
}

async function getPet(id) {
  try {
    const pet = await query(SQL`SELECT * FROM pets WHERE id = ${id};`);
    return pet;
  } catch (err) {
    console.error(err);
  }
}

async function addPet(req) {
  try {
    const sql = SQL`INSERT INTO pets (name, type, bio, adoption_status, picture, height, weight, color, hypoallergenic, dietery, breed) VALUES (${req.body.name},${req.body.type},${req.body.bio},${req.body.adoption_status},${req.body.picture},${req.body.height},${req.body.weight},${req.body.color},${req.body.hypoallergenic},${req.body.dietery},${req.body.breed})`;
    const insertedPet = await query(sql);
    return insertedPet;
  } catch (err) {
    console.log(err.message);
  }
}

async function editPet(req) {
  try {
    const sql = SQL`UPDATE pets SET name=${req.body.name}, type=${req.body.type}, bio=${req.body.bio}, adoption_status=${req.body.adoption_status}, height=${req.body.height}, weight=${req.body.weight}, color=${req.body.color}, hypoallergenic=${req.body.hypoallergenic}, dietery=${req.body.dietery}, breed=${req.body.breed}, picture=${req.body.picture} WHERE id = ${req.params.id};`
  
    const editedPet = await query(sql);
    return editedPet;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { getPets, addPet, getPet, editPet };
