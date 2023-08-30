<script lang="ts">
  import { accessToken } from "../store";

  export let SPOTIFY_CLIENT_ID: string;

  const url = "https://accounts.spotify.com/authorize?";
  const scope =
    "user-library-read playlist-modify-public playlist-modify-private";

  const params = new URLSearchParams({
    response_type: "token",
    client_id: SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: window.location.href,
  });

  const link = url + params;

  function logout() {
    accessToken.set(null);
    localStorage.removeItem("access_token");
  }
</script>

{#if !$accessToken}
  <a href={link}>
    <p>Connect to spotify</p>
  </a>
{:else}
  <div>
    <button on:click={logout}>Logout</button>
  </div>
{/if}
