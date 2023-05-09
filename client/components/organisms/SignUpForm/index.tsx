import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function SignUpForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error('Nama Email dan Password wajib di isi !');
    } else {
      localStorage.setItem('user-form', JSON.stringify(form));
      router.push('/sign-up-photo');
    }
  };

  const className = {
    label: cx('form-label text-lg fw-medium color-palette-1 mb-10'),
  };
  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h2>
      <p className="text-lg color-palette-1 m-0">Daftar dan bergabung dengan kami</p>
      <div className="pt-50">
        <label htmlFor="name" className={className.label}>Full Name</label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="name"
          name="name"
          aria-describedby="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="pt-30">
        <label htmlFor="email" className={className.label}>
          Email
          Address

        </label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          id="email"
          name="email"
          aria-describedby="email"
          placeholder="Enter your email address"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="pt-30">
        <label htmlFor="password" className={className.label}>Password</label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          id="password"
          name="password"
          aria-describedby="password"
          placeholder="Your password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
          type="button"
          onClick={onSubmit}
        >
          Continue

        </button>
        <Link href="/sign-in">
          <a
            className="btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill"
          >
            Sign
            In

          </a>
        </Link>

      </div>
    </>
  );
}
