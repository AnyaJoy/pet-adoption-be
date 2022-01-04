const express = require("express");
const { validateBody } = require("../middleware/validateBody");
const { doesUserExistSignup } = require("../middleware/doesUserExistSignup");
const { doPasswordsMatch } = require("../middleware/doPasswordsMatch");
const { encryptPassword } = require("../middleware/encryptPassword");
const { doesUserExistLogin } = require("../middleware/doesUserExistLogin");
const { checkToken } = require("../middleware/checkToken");
const { checkUserType } = require("../middleware/checkUserType");
const { addUserStatus } = require("../middleware/addUserStatus");
const { upload } = require("../middleware/multipart");
const { uploadToCloudinary } = require("../middleware/cloudinary");
const schemas = require("../schemas/allSchemas");
const usersController = require("../controllers/usersControllers");

const router = express.Router();

router.post("/signup", addUserStatus, validateBody(schemas.signupSchema), doesUserExistSignup, doPasswordsMatch, encryptPassword, usersController.signupController);

router.post("/login", validateBody(schemas.loginSchema), doesUserExistLogin, usersController.loginController);

router.get("/", checkToken, checkUserType, usersController.getUsersController);

router.get("/currentuser", checkToken, usersController.getCurrentUserController);

router
.route("/:id")
.get(checkToken, checkUserType, usersController.getUserByIdController)
.put(upload.single("picture"), uploadToCloudinary, validateBody(schemas.updateUserSchema), checkToken, encryptPassword, usersController.editUserController)






module.exports = router;
