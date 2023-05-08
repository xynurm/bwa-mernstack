var express = require('express');
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewUpdate,
  actionUpdate,
  actionDelete,
  actionStatus
} = require('./controller');
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

const { isLoginAdmin } = require('../middleware/auth');

router.use(isLoginAdmin);
router.get('/', index);
router.get('/create', viewCreate);
router.post(
  '/create',
  multer({ dest: os.tmpdir(), fileFilter: fileFilter }).single('image'),
  actionCreate
);
router.get('/update/:id', viewUpdate);
router.put(
  '/update/:id',
  multer({ dest: os.tmpdir(), fileFilter: fileFilter }).single('image'),
  actionUpdate
);
router.delete('/delete/:id', actionDelete);
router.put('/status/:id', actionStatus);
module.exports = router;
