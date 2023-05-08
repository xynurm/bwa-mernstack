var express = require('express');
var router = express.Router();
const { signUp, signIn } = require('./controller');
const multer = require('multer');
const os = require('os');

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype == 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(
      {
        message: 'Unsupported file format'
      },
      false
    );
  }
};
router.post('/signup',
multer({ dest: os.tmpdir(), fileFilter: fileFilter }).single('image'), signUp);
router.post('/signin', signIn)
module.exports = router;
