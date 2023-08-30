<script lang="ts">
  import { accessToken } from "../store";
  import { onMount } from "svelte";
  import type { PaginatedTrack, Pagination } from "../types";
  import CreatePlaylist from "./CreatePlaylist.svelte";

  export let artists: string[];
  let matchingArtists: Record<string, PaginatedTrack[]> = {};
  let tracks: PaginatedTrack[] = [];
  	let uris: string[] = [];

  onMount(async () => {
    let url: string | null = "https://api.spotify.com/v1/me/tracks?";
    const params = new URLSearchParams({ limit: "50" });
    url = url + params;

    if (!$accessToken) return;

    while (url != null) {
      const request = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken.get(),
        },
      });
      if (request.ok) {
        const json = (await request.json()) as Pagination<PaginatedTrack>;
        tracks = tracks.concat(json.items);

        json.items.forEach((item) => {
          const t = item.track;
          const artistsName = t.artists.map((a) => a.name);
          const found = artists.find((a) => artistsName.includes(a));
          if (found) {
            matchingArtists[found] = matchingArtists?.[found]?.concat(item) ?? [
              item,
            ];
            uris = uris.concat(item.track.uri);
          }
        });

        url = json?.next ?? null;
        // url = null;
      } else {
        break;
      }
    }
  });
</script>

<section class="pl-4">
  <h1>Artists you have liked</h1>
  {#each Object.entries(matchingArtists) as [artist, tracks]}
    <section>
      <h2>{artist}</h2>
      <ul class="pl-4">
        {#each tracks as t}
          <li><a href={t.track.external_urls.spotify}>{t.track.name}</a></li>
        {/each}
      </ul>
    </section>
  {/each}
</section>

<CreatePlaylist playlistName="no-name" tracks={uris} />
