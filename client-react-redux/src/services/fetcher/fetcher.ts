import { getSessionStorage } from '../../utils/storage/storage';
type Params = Record<string, any>;

const HOST = 'http://localhost:3000';
const BASE_PATH = '/api';

const constructUrl = (
  endpoint: string,
  params?: Record<string, string | number>
): string => {
  let url = `${HOST}${BASE_PATH}${endpoint}`;

  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    url += `?${queryString}`;
  }

  return url;
};

const getToken = (): string | null => {
  return getSessionStorage('token');
};

async function fetchRequest<T>(
  endpoint: string,
  method: string,
  params: Params = {},
  headers: HeadersInit = {}
): Promise<T> {
  const url = constructUrl(endpoint, method === 'GET' ? params : undefined);
  const token = getToken();
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (method !== 'GET') {
    options.body = JSON.stringify(params);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error ${method.toLowerCase()}ing data to ${url}: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data: T = await response.json();
  return data;
}

export async function get<T>(
  endpoint: string,
  params: Params = {},
  headers: HeadersInit = {}
): Promise<T> {
  return fetchRequest<T>(endpoint, 'GET', params, headers);
}

export async function post<T>(
  endpoint: string,
  params: Params = {},
  headers: HeadersInit = {}
): Promise<T> {
  return fetchRequest<T>(endpoint, 'POST', params, headers);
}

export async function put<T>(
  endpoint: string,
  params: Params = {},
  headers: HeadersInit = {}
): Promise<T> {
  return fetchRequest<T>(endpoint, 'PUT', params, headers);
}
