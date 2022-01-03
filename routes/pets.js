const express = require("express");
const { checkToken } = require("../middleware/checkToken");
const { validateBody } = require("../middleware/validateBody");
const { checkUserType } = require("../middleware/checkUserType");
const { uploadToCloudinary } = require("../middleware/cloudinary");
const { upload } = require("../middleware/multipart");
const schemas = require("../schemas/allSchemas");
const router = express.Router();
const petsController = require("../controllers/petsControllers");

router
.route("/")
.get(petsController.getPetsController)
.post(checkToken, checkUserType, upload.single("picture"), uploadToCloudinary, validateBody(schemas.petSchema), petsController.addPetController)

router
.route("/:id")
.get(petsController.getPetByIdController)
.put(checkToken, checkUserType, upload.single("picture"), uploadToCloudinary, validateBody(schemas.petSchema), petsController.editPetController)

router
.route("/save/:userId/:petId")
.post(checkToken, petsController.savePetController)
.delete(checkToken, petsController.unsavePetController)

router
.route("/adopt/:userId/:petId")
.post(checkToken, petsController.adoptPetController)
.delete(checkToken, petsController.unadoptPetController)

router
.route("/foster/:userId/:petId")
.post(checkToken, petsController.fosterPetController)
.delete(checkToken, petsController.unfosterPetController)

router.get("/checkstatus/:userId/:petId", checkToken, petsController.checkPetStatusController);

router.get("/saved/user/:userId", checkToken, petsController.getSavedPetsController);

router.get("/owned/user/:userId", checkToken, petsController.getOwnedPetsController);

router.post("/search", validateBody(schemas.searchPetSchema), petsController.searchPetsController);

module.exports = router;
