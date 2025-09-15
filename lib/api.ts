// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

interface ApiOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function apiRequest(
  endpoint: string,
  options: ApiOptions = {}
): Promise<Response> {
  const token = localStorage.getItem('token');

  const config: ApiOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-api-key': 'f69902ad-c2bc-4b30-aa89-e136d26a04b3',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  return response;
}

// ✅ Helper functions with proper typing
export async function apiGet(endpoint: string): Promise<Response> {
  return apiRequest(endpoint, { method: 'GET' });
}

export async function apiPost<T>(
  endpoint: string,
  data: T
): Promise<Response> {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiPut<T>(
  endpoint: string,
  data: T
): Promise<Response> {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function apiDelete(endpoint: string): Promise<Response> {
  return apiRequest(endpoint, { method: 'DELETE' });
}
