var express = require("express");
var router = express.Router();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadedFiles/"); // Folder where images are stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Unique filename
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
  fileFilter: fileFilter,
});

router.post("/fileupload", upload.single("image"), function (req, res, next) {
  const filename = req.file.filename;
  // Return the full URL of the uploaded file
  res.json({
    message: "Image Uploaded Successfully",
    filename: filename,
    url: `http://localhost:3001/uploadedFiles/${filename}`, // Return the URL of the uploaded image
  });
});

module.exports = router;
