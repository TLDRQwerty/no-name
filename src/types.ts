export interface Track {
  album: Album;
  artists: Artist[];
  href: string;
  id: string;
  is_playable: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
  external_urls: {
    spotify: string;
  };
}

export interface Album {
  album_type: 'album' | 'single' | 'compilation';
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  type: 'album';
  url: string;
  genres: string[];
  label: string;
  alubm_group: 'album' | 'single' | 'compilation' | 'appears_on';
  artists: Artist[];
}

interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Artist {
  external_urls: {
    spotify: string;
  };
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: 'artist';
  url: string;
}

export interface PaginatedTrack {
  added_at: string;
  track: Track;
}

export interface Pagination<TData> {
  href: string;
  items: TData[];
  limit: number;
  next: string | null;
  offset: number;
  total: number;
}

interface ResponseError<TStatus> {
  status: TStatus;
  message: string;
}

export interface Unauthorized {
  error: ResponseError<401>;
}

export interface Forbidden {
  error: ResponseError<403>;
}

export interface TooManyRquests {
  error: ResponseError<429>;
}

export interface Account {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  type: 'user';
  uri: string;
}

export interface Playlist {
  colaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Pick<Account, 'followers' | 'href' | 'id' | 'type' | 'uri' | 'display_name'>;
  public: boolean;
  snapshot_id: string;
  tracks: Pagination<{
    added_at: string;
    added_by: Account;
    is_local: boolean;
    track: Track;
  }>;
}
