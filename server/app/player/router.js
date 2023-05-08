var express = require('express');
var router = express.Router();
const { landingPage, detailPage, category, checkout, history, historyDetail, dashboard, profile, updateProfile } = require('./controller');
const { isLoginPlayer } = require('../middleware/auth');
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

router.get('/landingpage', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/history', isLoginPlayer, history);
router.get('/history/:id/detail', isLoginPlayer, historyDetail);
router.get('/dashboard', isLoginPlayer, dashboard);
router.get('/profile', isLoginPlayer, profile);
router.put('/profile', isLoginPlayer,
multer({ dest: os.tmpdir(), fileFilter: fileFilter }).single('image'), updateProfile);
module.exports = router;
