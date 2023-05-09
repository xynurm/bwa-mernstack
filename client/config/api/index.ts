import axios, { AxiosRequestConfig } from 'axios';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

interface CallAPIProps extends AxiosRequestConfig {
  token? : boolean;
}

export default async function callAPI({
  url, method, data, token,
}: CallAPIProps) {
  let headers = {};

  if (token) {
    const tokenCookies = Cookies.get('token');
    if (tokenCookies) {
      const key = 'tes@4ja';
      const jwtToken = CryptoJS.AES.decrypt(tokenCookies, key);
      const decrypt = jwtToken.toString(CryptoJS.enc.Utf8);
      headers = {
        Authorization: `Bearer ${decrypt}`,
      };
    }
  }

  const response = await axios({
    headers,
    url,
    method,
    data,
  }).catch((err) => err.response);

  if (response?.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }
  const res = {
    error: false,
    message: 'success',
    data: response.data.data,
  };

  return res;
}
