const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    //accept a file
    cb(null, true);
  } else {
    // reject a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.post(
  "/signup",
  upload.single("profilePicture"),
  UserController.user_signup
);
router.post(
  "/provider-signup",
  upload.single("profilePicture"),
  UserController.provider_user_signup
);

router.post("/login", UserController.user_login);

router.get("/:username/services", UserController.get_user_services);
router.get("/:username", UserController.get_user_profile);
module.exports = router;
