const express = require("express");
const router = express.Router();

const {
  isLoggendIn,
  redirectIfLoggedIn,
} = require("../middlewares/auth-middlewares");
const {
  createHisaabController,
  hisaabPageController,
} = require("../controllers/hisaab-controller");

router.get("/create", isLoggendIn, hisaabPageController);
router.post("/create", isLoggendIn, createHisaabController);

module.exports = router;
