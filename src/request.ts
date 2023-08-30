import { accessToken } from './store';

export function fetchSpotify(uri: string, options: RequestInit) {
  return fetch('https://api.spotify.com/v1/' + uri, {
    ...options,
    headers: {
      Authorization: 'Bearer ' + accessToken.get(),
      ...options.headers
    }
  });
}
