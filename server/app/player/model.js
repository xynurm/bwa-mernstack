const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HASH_ROUND = 10;

let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Email harus diisi']
    },
    name: {
      type: String,
      require: [true, 'Nama harus diisi'],
      maxLength: [225, 'Panjang  nama harus antara 3 -225 karakter'],
      minLength: [3, 'Panjang  nama harus antara 3 -225 karakter']
    },
    username: {
      type: String,
      require: [true, 'Email harus diisi'],
      maxLength: [225, 'Panjang  username 3 -225 karakter'],
      minLength: [3, 'Panjang  username antara 3 -225 karakter']
    },
    password: {
      type: String,
      require: [true, 'Kata sandi harus diisi'],
      maxLength: [225, 'Panjang password antara 225 karakter']
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y'
    },
    avatar: {
      type: String
    },
    fileName: {
      type: String
    },
    phoneNumber: {
      type: String,
      require: [true, 'Nomor telpon harus diisi'],
      maxLength: [13, 'Panjang  nomor telepon 9 - 13 karakter'],
      minLength: [9, 'Panjang  nomor telepon 9 - 13 karakter']
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  { timestamps: true }
);

playerSchema.path('email').validate(
  async function (value) {
    try {
      const count = await this.model('Player').countDocuments({ email: value });

      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

playerSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model('Player', playerSchema);
