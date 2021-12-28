const HOST = import.meta.env.VITE_API_HOST || '';

const defaultParams = {
  // mode: 'cors',
  // cross-origin server cookie
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

export async function doFetch<T>(endpoint: string, data?: T, method = 'get') {
  let fetchResult;

  try {
    const url = HOST + endpoint;
    if (arguments.length === 1) {
      fetchResult = await fetch(url, {
        ...defaultParams,
        method,
      });
    } else {
      fetchResult = await fetch(url, {
        ...defaultParams,
        method,

        body: JSON.stringify(data),
      });
    }

    if (fetchResult.ok) {
      return fetchResult;
    } else {
      return Promise.reject(fetchResult);
    }
  } catch (e) {
    console.error('Network error', e);
    return Promise.reject(e);
  }
}
