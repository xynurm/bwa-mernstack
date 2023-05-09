import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import { setLogin } from '../../../services/auth';

export default function SignInForm() {
  const [formSignIn, setFormSignIn] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormSignIn({ ...formSignIn, [event.target.name]: event.target.value });
  };

  const router = useRouter();

  const onSubmit = async () => {
    if (!formSignIn.email || !formSignIn.password) {
      toast.error('Email dan Password wajib di isi !');
    } else {
      const response = await setLogin(formSignIn);
      if (response.error) {
        toast.error(response.message);
      } else {
        const { token } = response.data;
        console.log('token:', token);
        const key = 'tes@4ja';
        const hash = CryptoJS.AES.encrypt(token, key);
        const encrypted = hash.toString();
        Cookies.set('token', encrypted, { expires: 1 });
        toast.success('Login Berhasil');
        router.push('/');
      }
    }
  };
  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
      <p className="text-lg color-palette-1 m-0">Masuk untuk melakukan proses top up</p>
      <div className="pt-50">
        <label htmlFor="email" className="form-label text-lg fw-medium color-palette-1 mb-10">
          Email
          Address

        </label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          name="email"
          placeholder="Enter your email address"
          value={formSignIn.email}
          onChange={handleChange}
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="password"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Password

        </label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          name="password"
          placeholder="Your password"
          value={formSignIn.password}
          onChange={handleChange}
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
          type="button"
          onClick={onSubmit}
        >
          Continue to Sign In

        </button>
        <Link href="/sign-up">

          <a
            className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
          >
            Sign
            Up

          </a>
        </Link>
      </div>

    </>
  );
}
