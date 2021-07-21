const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/service");
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
  "/create",
  upload.single("servicePicture"),
  ServiceController.create_service
);
router.post("/promote", ServiceController.promote);

router.get("/:category", ServiceController.get_services_by_category);
router.get("/:category/:id", ServiceController.get_service);
router.get("/", ServiceController.get_all_services);
module.exports = router;
