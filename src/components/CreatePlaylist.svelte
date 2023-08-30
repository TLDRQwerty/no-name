<script lang="ts">
  import type { Account, Playlist } from "../types";
  import { fetchSpotify } from "../request";

  export let playlistName: string;
  export let tracks: string[];

  async function getCurrentUser(): Promise<Account | null> {
    const response = await fetchSpotify("me", { method: "GET" });
    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as Account;

    return json;
  }

  async function createPlaylist(id: string): Promise<Playlist | null> {
    const response = await fetchSpotify(`users/${id}/playlists`, {
      method: "POST",
      body: JSON.stringify({
        name: playlistName,
        public: false,
        description: "Playlist created by no-name",
      }),
    });

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as Playlist;

    return json;
  }

  async function updatePlaylist(id: string) {
    const response = await fetchSpotify(`playlists/${id}/tracks`, {
      method: "POST",
      body: JSON.stringify({
        uris: tracks,
      }),
    });

    if (!response.ok) {
      return;
    }
  }

  async function create() {
    const userId = (await getCurrentUser())?.id;

    if (!userId) {
      return;
    }
    const playlistId = (await createPlaylist(userId))?.id;

    if (playlistId == null) {
      return;
    }

    updatePlaylist(playlistId);
  }
</script>

<button on:click={create}>Create Playlist</button>
