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

const getTokenDetails = (): string | null => {
  return getSessionStorage('login');
};

const getToken = (): string | null => {
  const tokenDetails = getTokenDetails();
  let tokenJson,
    token = null;
  if (tokenDetails) {
    tokenJson = JSON.parse(tokenDetails);
    token = tokenJson.tokens.accessToken;
  }
  return token;
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
    const errorText = await response.json();
    throw new Error(`Error: ${errorText.message}`);
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

export async function remove<T>(
  endpoint: string,
  params: Params = {},
  headers: HeadersInit = {}
): Promise<T> {
  return fetchRequest<T>(endpoint, 'DELETE', params, headers);
}
