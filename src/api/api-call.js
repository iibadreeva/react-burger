import { baseUrl } from '../constants';

const STATUS_OK = 200;

export const apiCall = async (path, method, signal) => {
  const response = await fetch(`${baseUrl}/${path}`, {
    signal: signal,
    method
  });

  if (response.status !== STATUS_OK) {
    throw new Error(
      `Request failed with ${response.status}: ${response.statusText}`
    );
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error('Ошибка сервера');
  }

  return result;
};
