import axios from 'axios';
import callAPI from '../config/api';
import { CheckoutTypes } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function getFeaturedGame() {
  const url = `${ROOT_API}/${API_VERSION}/players/landingpage`;

  return callAPI({
    url,
    method: 'GET',
    data: [],
  });
}

export async function getDetailVoucher(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/players/${id}/detail`;

  return callAPI({
    url,
    method: 'GET',
    data: [],
  });
}

export async function getGameCategory() {
  const URL = 'players/category';

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function setCheckout(data: CheckoutTypes) {
  const url = `${ROOT_API}/${API_VERSION}/players/checkout`;

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  });
}
