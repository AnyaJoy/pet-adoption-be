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
    const sql = SQL`UPDATE pets SET name=${req.body.name}, type=${req.body.type}, bio=${req.body.bio}, adoption_status=${req.body.adoption_status}, height=${req.body.height}, weight=${req.body.weight}, color=${req.body.color}, hypoallergenic=${req.body.hypoallergenic}, dietery=${req.body.dietery}, breed=${req.body.breed}, picture=${req.body.picture} WHERE id = ${req.params.id};`;

    const editedPet = await query(sql);
    return editedPet;
  } catch (err) {
    console.log(err.message);
  }
}

async function savePet(req) {
  try {
    const sql = SQL`INSERT INTO pets_saved (userId, petId) VALUES (${req.params.userId},${req.params.petId})`;
    const savedPet = await query(sql);
    return savedPet;
  } catch (err) {
    console.log(err.message);
  }
}

async function unsavePet(req) {
  try {
    const sql = SQL`DELETE FROM pets_saved WHERE userId=${req.params.userId} AND petId=${req.params.petId}`;
    const result = await query(sql);
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function adoptPet(req) {
  try {
    const sql = SQL`INSERT INTO pets_adopted (userId, petId) VALUES (${req.params.userId},${req.params.petId})`;
    const changePetStatus = query(
      SQL`UPDATE pets SET adoption_status = "Adopted" WHERE id=${req.params.petId}`
    );
    const adoptedPet = await query(sql);
    return adoptedPet;
  } catch (err) {
    console.log(err.message);
  }
}

async function returnAdoptedPet(req) {
  try {
    const sql = SQL`DELETE FROM pets_adopted WHERE userId=${req.params.userId} AND petId=${req.params.petId}`;
    const changePetStatus = query(
      SQL`UPDATE pets SET adoption_status = "Available" WHERE id=${req.params.petId}`
    );
    const result = await query(sql);
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function fosterPet(req) {
  try {
    const sql = SQL`INSERT INTO pets_fostered (userId, petId) VALUES (${req.params.userId},${req.params.petId})`;
    const changePetStatus = query(
      SQL`UPDATE pets SET adoption_status = "Fostered" WHERE id=${req.params.petId}`
    );
    const fosteredPet = await query(sql);
    return fosteredPet;
  } catch (err) {
    console.log(err.message);
  }
}

async function returnFosteredPet(req) {
  try {
    const sql = SQL`DELETE FROM pets_fostered WHERE userId=${req.params.userId} AND petId=${req.params.petId}`;
    const changePetStatus = query(
      SQL`UPDATE pets SET adoption_status = "Available" WHERE id=${req.params.petId}`
    );
    const result = await query(sql);
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function checkPetStatus(req) {
  try {
    const savedPet = await query(
      SQL`SELECT * FROM pets_saved WHERE userId = ${req.params.userId} AND petId = ${req.params.petId};`
    );
    const fosteredPet = await query(
      SQL`SELECT * FROM pets_fostered WHERE userId = ${req.params.userId} AND petId = ${req.params.petId};`
    );
    const adoptedPet = await query(
      SQL`SELECT * FROM pets_adopted WHERE userId = ${req.params.userId} AND petId = ${req.params.petId};`
    );

    const result = {
      savedPet: savedPet,
      fosteredPet: fosteredPet,
      adoptedPet: adoptedPet,
    };
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function getUserSavedPets(req) {
  try {
    const userSavedPets = await query(
      SQL`SELECT * FROM pets_saved WHERE userId = ${req.params.userId};`
    );
    return userSavedPets;
  } catch (err) {
    console.error(err);
  }
}

async function getUserOwnedPets(req) {
  try {
    const adoptedPets = await query(
      SQL`SELECT * FROM pets_adopted WHERE userId = ${req.params.userId};`
    );
    const fosteredPets = await query(
      SQL`SELECT * FROM pets_fostered WHERE userId = ${req.params.userId};`
    );
    return adoptedPets.concat(fosteredPets);
  } catch (err) {
    console.error(err);
  }
}

async function searchPets(req) {
  try {
    const { name, type, adoption_status, weight, height } = req.body;

    const sql = SQL`SELECT * FROM pets WHERE `;
    const updates = [];

    if (name != `%%`) {
      updates.push(SQL`name LIKE ${name}`);
    }

    if (type && name != `%%`) {
      updates.push(SQL`AND type=${type}`);
    }
    if (type && name == `%%`) {
      updates.push(SQL`type=${type}`);
    }

    if (adoption_status && name != `%%`) {
      updates.push(SQL`AND adoption_status=${adoption_status}`);
    }
    if (adoption_status && name == `%%`) {
      updates.push(SQL`adoption_status=${adoption_status}`);
    }

    if (weight && name == `%%`) {
      if (weight == "3") {updates.push(SQL`weight<3`)}
      if (weight == "3-10") {updates.push(SQL`weight BETWEEN 3 AND 10`)}
      if (weight == "10") {updates.push(SQL`weight>10`)}
    }
    if (weight && name != `%%`) {
      if (weight == "3") {updates.push(SQL`AND weight<3`)}
      if (weight == "3-10") {updates.push(SQL`AND weight BETWEEN 3 AND 10`)}
      if (weight == "10") {updates.push(SQL`AND weight>10`)}
    }

    if (height && name == `%%`) {
      if (height == "20") {updates.push(SQL`height<20`)}
      if (height == "20-40") {updates.push(SQL`height BETWEEN 20 AND 40`)}
      if (height == "40") {updates.push(SQL`height>40`)}
    }
    if (height && name != `%%`) {
      if (height == "20") {updates.push(SQL`AND height<20`)}
      if (height == "20-40") {updates.push(SQL`AND height BETWEEN 20 AND 40`)}
      if (height == "40") {updates.push(SQL`AND height>40`)}
    }

    const pets = await query(sql.append(sql.glue(updates, " ")));
    return pets;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getPets,
  addPet,
  getPet,
  editPet,
  savePet,
  unsavePet,
  checkPetStatus,
  adoptPet,
  returnAdoptedPet,
  fosterPet,
  returnFosteredPet,
  getUserSavedPets,
  getUserOwnedPets,
  searchPets,
};
