const express = require("express");
const router = express.Router();
const {
landingPageController,
registerPageController,
registerController,
logincontrollers,
logoutControllers,
profileController
} = require("../controllers/index.controller");

const {isLoggendIn} = require("../middlewares/auth-middlewares")

router.get("/", landingPageController);
router.get("/register", registerPageController);
router.get("/logout", logoutControllers);
router.get("/profile",isLoggendIn, profileController);


router.post("/register", registerController);
router.post("/login", logincontrollers);


module.exports = router;