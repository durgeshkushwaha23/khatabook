const { isLoggendIn } = require("../middlewares/auth-middlewares");
const hisaabModel = require("../models/hisab-model");
const userModel = require("../models/user-model");

module.exports.createHisaabController = async function (req, res) {
  let { title, description, encrypted, shareable, passcode, editpermissions } =
    req.body;

  encrypted = encrypted === "on" ? true : false;
  shareable = shareable === "on" ? true : false;
  editpermissions = editpermissions === "on" ? true : false;

  let hisaabcreated = await hisaabModel.create({
    title,
    description,
    user: req.user._id,
    passcode,
    encrypted,
    shareable,
    editpermissions,
  });
  let user = await userModel.findOne({ email: req.user.email });
  user.hisaab.push(hisaabcreated._id);
  await user.save();

  res.redirect("/profile");
};

module.exports.hisaabPageController = async function (req, res) {
  res.render("create");
};


module.exports.readHisaabController = async function (req, res, next) {
    try {
        const id = req.params.id;
        const hisaab = await hisaabModel.findOne({
            _id: id,
        });
        if (!hisaab) {
            return res.redirect("/profile");
        }
        if (hisaab.encrypted) {
            return res.render("passcode", { isLoggedIn: true, id });
        }
        res.render("hisaab", { isLoggedIn: true, hisaab });
    } catch (error) {
        next(error); // Pass errors to Express error handler
    }
};


module.exports.readVerifiedHisaabController = async function (req, res, next) {
  try {
      const id = req.params.id;
      const hisaab = await hisaabModel.findOne({ _id: id });
      if (!hisaab) {
          return res.redirect('/profile');
      }
      if (hisaab.passcode !== req.body.passcode) {
          return res.redirect('/profile');
      }
      return res.render("hisaab", {
          isLoggedIn: true,
          hisaab
      });
  } catch (error) {
      next(error); // Pass errors to Express error handler
  }
};

module.exports.deletecontroller = async function (req, res, next) {
  try {
      const id = req.params.id;
      const hisaab = await hisaabModel.findOne({
          _id: id,
          user: req.user.id
      });

      if (!hisaab) {
          return res.redirect("/profile");
      }

      await hisaabModel.deleteOne({ _id: id });
      return res.redirect("/profile");
  } catch (error) {
      next(error); // Pass errors to Express error handler
  }
};


module.exports.editcontroller = async function(req,res,next){
  const id = req.params.id;
  const hisaab = await hisaabModel.findById(id);

  if(!hisaab){
    return res.redirect("/profile")
  }
  return res.render("edit",{isLoggendIn:true,hisaab})
}

module.exports.editpostcontroller = async function(req,res,next){
  const id = req.params.id;
  const hisaab = await hisaabModel.findById(id);

  if(!hisaab){
    return res.redirect("/profile")
  }
  hisaab.title = req.body.title;
  hisaab.description = req.body.description;
  hisaab.editpermissions = req.body.editpermissions == 'on'? true:false;
  hisaab. encrypted = req.body. encrypted == 'on'? true:false;
  hisaab.passcode = req.body.passcode;
  hisaab.shareable = req.body.shareable == 'on'? true:false;

  await hisaab.save();
  res.redirect("/profile")

}
