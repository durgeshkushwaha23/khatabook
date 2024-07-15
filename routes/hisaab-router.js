const express = require("express");
const router = express.Router();

const {
  isLoggendIn,
  redirectIfLoggedIn,

} = require("../middlewares/auth-middlewares");
const {
  createHisaabController,
  hisaabPageController,
  readHisaabController,
  deletecontroller,
  editcontroller,
  editpostcontroller,
  readVerifiedHisaabController
} = require("../controllers/hisaab-controller");


router.post("/:id/verify", isLoggendIn, readVerifiedHisaabController);

router.get("/create", isLoggendIn, hisaabPageController);
router.post("/create", isLoggendIn, createHisaabController);

router.get("/delete/:id",isLoggendIn,deletecontroller)
router.get("/edit/:id",isLoggendIn,editcontroller)
router.post("/edit/:id",isLoggendIn,editpostcontroller)


router.get("/view/:id",isLoggendIn, readHisaabController);

module.exports = router;
