const express = require("express");
const { getPets, addPet, getPet, editPet } = require("../data/pets");
const { checkToken } = require("../middleware/checkToken");
const { validateBody } = require("../middleware/validateBody");
const { checkUserType } = require("../middleware/checkUserType");
const { uploadToCloudinary } = require("../middleware/cloudinary")
const { upload } = require("../middleware/multipart");
const schemas = require("../schemas/allSchemas");
const router = express.Router();

router.get("/", async (req, res) => {
  const allPets = await getPets();
  res.send(allPets);
  res.status(200);
});

router.get("/:id", async (req, res) => {
  const pet = await getPet(req.params.id);
  res.send(pet);
  res.status(200);
});

router.post(
  "/add",
  checkToken,
  checkUserType,
  upload.single('picture'),
  uploadToCloudinary,
  validateBody(schemas.petSchema),
  async (req, res) => {
    try {
      const addedPet = await addPet(req);
      res.send(addedPet);
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  }
);

router.put(
  "/edit/:id",
  checkToken,
  checkUserType,
  upload.single('picture'),
  uploadToCloudinary,
  validateBody(schemas.petSchema),
  async (req, res) => {
    try {
      const editedPet = await editPet(req);
      res.send(editedPet);
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  }
);

router.post(
  "/save",
  checkToken,
  // validateBody(schemas.handlePet),
  async (req, res) => {
    try {
      const savedPet = await savePet(req);
      res.send(savedPet);
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  }
);

router.post(
  "/adopt",
  checkToken,
  // validateBody(schemas.handlePet),
  async (req, res) => {
    try {
      const savedPet = await adoptPet(req);
      res.send(savedPet);
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  }
);

router.post(
  "/foster",
  checkToken,
  // validateBody(schemas.handlePet),
  async (req, res) => {
    try {
      const savedPet = await fosterPet(req);
      res.send(savedPet);
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
