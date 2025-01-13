import axios, { AxiosRequestHeaders, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import {
  getItem,
  getBoolean,
  removeItem,
} from 'src/helpers/common/localStorage';
import {
  REACT_APP_BASE_URL,
  REACT_APP_SUFFIX_BASE_URL,
  REACT_APP_AUTH,
  REACT_APP_USER,
} from 'src/utils/config';

const baseUrl = String(REACT_APP_BASE_URL);
const prefixBaseUrl = String(REACT_APP_SUFFIX_BASE_URL);
const appAuth = String(REACT_APP_AUTH);
const appUser = String(REACT_APP_USER);

export type AxiosErrorResponse = {
  message: string | string[];
};

const createHeader = (): AxiosRequestHeaders => {
  const isAuthenticated = getBoolean(appAuth);
  const headers: AxiosRequestHeaders = {
    'Content-Type': 'application/json',
  };
  if (isAuthenticated) {
    const token: string = getItem(appAuth);
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const api = axios.create({
  baseURL: baseUrl + prefixBaseUrl,
  responseType: 'json',
  headers: createHeader(),
});

api.interceptors.request.use((config) => {
  if (!config.url?.startsWith('/auth')) {
    // eslint-disable-next-line no-param-reassign
    config.headers = createHeader();
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    const { data } = response;

    if (response.status >= 500 && response.status < 600) {
      toast.error('Erro interno, tente novamente mais tarde!');

      error.message = error.response.data.message as string;
    }

    if (response.status === 401 || response.status === 403) {
      toast.info('Sessão expirada, faça login novamente!');
      removeItem(appAuth);
      removeItem(appUser);
      //   setTimeout(() => {
      //     window.location.href = '/';
      //   }, 1000);

      return Promise.reject(error);
    }

    if (response.status !== 401 && response?.data?.errors?.length) {
      return Promise.reject(error);
    }

    let errors = '';
    if (data && data.details && data.details.length > 0) {
      data.details.forEach((value: string) => {
        errors += `${value} \n`;
      });

      toast.error(errors);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export { api, AxiosError };
