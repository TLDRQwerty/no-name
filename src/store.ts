import { atom } from 'nanostores'

export const accessToken = atom<string | null>(typeof window === 'undefined' ? null : window.localStorage.getItem('access_token'))

window.addEventListener('load', () => {
  const searchParams = new URLSearchParams(window.location.hash);
  if (searchParams.has('#access_token')) {
    const token = searchParams.get('#access_token');
    if (token) {
      accessToken.set(token);
      localStorage.setItem('access_token', token)
    }
  }
})

accessToken.subscribe((value) => {
  if (typeof window !== 'undefined') {
    return
  }

  if (value != null) {
    localStorage.setItem('access_token', value)
  } else {
    localStorage.removeItem('access_token')
  }
})
