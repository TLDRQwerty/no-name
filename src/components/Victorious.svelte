<script lang="ts">
  import { onMount } from "svelte";
  import LikedSongs from "./LikedSongs.svelte";

  export let data: string;

  const SHOW = [
    "Acoustic Stage",
    "Beats & Swing Stage",
    "Casemates Stage",
    "Castle Stage",
    "Common Stage",
    "Henry's House At The Castle",
    "Piano Tree Stage",
    "Portsmouth Careates Stage",
    "The People's Lounge",
    "Worlds Music Stage",
  ];

  let rows: Record<string, Record<string, string>> = {};
  let artistsPlaying: string[] = [];

  onMount(() => {
    const htmlContent = new DOMParser().parseFromString(data, "text/html");
    const days = htmlContent.querySelectorAll("main");

    rows = Array.from(days).reduce<Record<string, Record<string, string>>>(
      (acc, row) => {
        const day = row.id;
        if (!day) {
          return acc;
        }

        const stages = row.querySelectorAll("table");

        const foo = Array.from(stages).reduce((a, r) => {
          const stageName = r.querySelector("th")?.textContent;
          if (!stageName || !SHOW.includes(stageName)) {
            return a;
          }

          const artists = r.querySelectorAll("tbody > tr > td:first-child");
          if (artists.length > 0) {
            a[stageName] = Array.from(artists)
              .map((artist) => artist.textContent)
              .filter(Boolean);

            artistsPlaying = artistsPlaying.concat(a[stageName]);
          }

          return a;
        }, {});

        if (Object.keys(foo).length > 0) {
          acc[day] = foo;
        }
        return acc;
      },
      {}
    );
  });
</script>

<div class="lg:grid lg:grid-cols-3 justify-between pl-4">
  {#each Object.entries(rows) as [day, stages]}
    <section>
      <h1 class="capitalize text-2xl">{day}</h1>
      <ul class="pl-4">
        {#each Object.entries(stages) as [stage, artists]}
          <li>
            <h2 class="text-xl">{stage}</h2>
            <ul class="pl-4">
              {#each artists as artist}
                <li>
                  {artist}
                </li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    </section>
  {/each}
</div>

<LikedSongs artists={artistsPlaying} />
