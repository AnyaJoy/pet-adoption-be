const {
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
} = require("../data/pets");

async function getPetsController(req, res) {
  try {
    const allPets = await getPets();
    res.send(allPets);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function searchPetsController(req, res) {
  try {
    const pets = await searchPets(req);
    res.send(pets);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function getPetByIdController(req, res) {
  try {
    const pet = await getPet(req.params.id);
    res.send(pet);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function addPetController(req, res) {
  try {
    const addedPet = await addPet(req);
    res.send(addedPet);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function editPetController(req, res) {
  try {
    const editedPet = await editPet(req);
    res.send(editedPet);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function savePetController(req, res) {
  try {
    const savedPet = await savePet(req);
    res.send(savedPet);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function unsavePetController(req, res) {
  try {
    const result = await unsavePet(req);
    res.send(result);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function adoptPetController(req, res) {
  try {
    const adoptedPet = await adoptPet(req);
    res.send(adoptedPet);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function unadoptPetController(req, res) {
  try {
    const result = await returnAdoptedPet(req);
    res.send(result);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function fosterPetController(req, res) {
  try {
    const fosteredPet = await fosterPet(req);
    res.send(fosteredPet);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function unfosterPetController(req, res) {
  try {
    const result = await returnFosteredPet(req);
    res.send(result);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function checkPetStatusController(req, res) {
  try {
    const result = await checkPetStatus(req);
    res.send(result);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function getSavedPetsController(req, res) {
  try {
    const userSavedPets = await getUserSavedPets(req);
    res.send(userSavedPets);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

async function getOwnedPetsController(req, res) {
  try {
    const userOwnedPets = await getUserOwnedPets(req);
    res.send(userOwnedPets);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getPetsController,
  getPetByIdController,
  addPetController,
  editPetController,
  savePetController,
  unsavePetController,
  adoptPetController,
  unadoptPetController,
  fosterPetController,
  unfosterPetController,
  checkPetStatusController,
  getSavedPetsController,
  getOwnedPetsController,
  searchPetsController,
};
