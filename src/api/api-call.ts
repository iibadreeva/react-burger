import { baseUrl } from '../constants';

const STATUS_OK = 200;

// eslint-disable-next-line
const apiCall = async <T>(path: string, options: RequestInit = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseUrl}${path}`, config);

  if (response.status !== STATUS_OK) {
    throw new Error(`Request failed with ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error('Ошибка сервера');
  }

  return result;
};

export const api = {
  get: <T>(path: string, options?: RequestInit) => apiCall<T>(path, { ...options, method: 'GET' }),

  post: <T>(path: string, data: { [n: string]: string | string[] | null }, options?: RequestInit) =>
    apiCall<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(path: string, data: { [n: string]: string }, options?: RequestInit) =>
    apiCall<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  patch: <T>(path: string, data: { [n: string]: string }, options?: RequestInit) =>
    apiCall<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: <T>(path: string, options?: RequestInit) =>
    apiCall<T>(path, { ...options, method: 'DELETE' }),
};
