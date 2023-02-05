import { HalfleapErrorResponse, HalfleapResponse } from 'lib/types';

export function handleError<T>(e: Error): HalfleapResponse<T> {
  const message = e?.message
    ? `Oh no! Something went wrong: ${e.message}`
    : 'Oh no! Something went wrong.';
  const error = { code: 500, message };
  return { error } as unknown as HalfleapResponse<T>;
}

export async function post<T = any>(
  url: string,
  body: any,
  options?: RequestInit
): Promise<HalfleapResponse<T>> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
      ...options,
    });

    if (!response.ok) {
      const error = (await response.json()) as HalfleapErrorResponse;
      return { error } as unknown as HalfleapResponse<T>;
    }
    return response.json();
  } catch (error) {
    return handleError(error);
  }
}

export async function put<T = any>(
  url: string,
  body: any,
  options?: RequestInit
): Promise<HalfleapResponse<T>> {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      const error = (await response.json()) as HalfleapErrorResponse;
      return { error } as unknown as HalfleapResponse<T>;
    }
    return response.json();
  } catch (error) {
    return handleError(error);
  }
}
