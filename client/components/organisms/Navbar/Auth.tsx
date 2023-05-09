import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    avatar: '',
    email: '',
    id: '',
    name: '',
    username: '',
  });

  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const key = 'tes@4ja';
      const jwtToken = CryptoJS.AES.decrypt(token, key);
      const decrypt = jwtToken.toString(CryptoJS.enc.Utf8);
      const payload: JWTPayloadTypes = jwtDecode(decrypt);
      const dataUser: UserTypes = payload.player;
      const API_IMG = process.env.NEXT_PUBLIC_IMG;
      user.avatar = `${API_IMG}/${dataUser.avatar}`;
      setUser(user);
      setIsLogin(true);
    }
  }, []);

  const onLogout = () => {
    Cookies.remove('token');
    router.push('/');
    setIsLogin(false);
  };

  if (isLogin) {
    return (
      <li className="nav-item my-auto dropdown d-flex">
        <div className="vertical-line d-lg-block d-none" />
        <div>
          <a
            className="dropdown-toggle ms-lg-40"
            href=""
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={user.avatar}
              className="rounded-circle"
              width="40"
              height="40"
              alt="img-user"
            />
          </a>

          <ul className="dropdown-menu border-0" aria-labelledby="dropdownMenuLink">
            <li><Link href="/member"><a className="dropdown-item text-lg color-palette-2">My Profile</a></Link></li>
            <li><Link href=""><a className="dropdown-item text-lg color-palette-2">Wallet</a></Link></li>
            <li><Link href="/member/edit-profile"><a className="dropdown-item text-lg color-palette-2">Account Settings</a></Link></li>
            <li onClick={() => { onLogout(); }} aria-hidden="true"><a className="dropdown-item text-lg color-palette-2 " href="#">Log Out</a></li>
          </ul>
        </div>
      </li>

    );
  }
  return (
    <li className="nav-item my-auto">
      <Link href="/sign-in">
        <a
          className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
          href="./src/sign-in.html"
          role="button"
        >
          Sign
          In

        </a>
      </Link>
    </li>

  );
}
