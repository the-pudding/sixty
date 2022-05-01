<script>
  import { extent, ascending, format } from "d3";
  import Complexity from "$components/Complexity.svelte";
  import Toggle from "$components/helpers/Toggle.svelte";
  import { user, readerData } from "$stores/misc.js";
  import raw from "$data/scatter.csv";

  export let text;

  let textEl;
  let value = "off";

  const propY = "score";

  $: if (textEl && $readerData.total)
    textEl.querySelector("mark").innerText = format(",")($readerData.total);
  $: showExample = $user.scoreToss && +$user.age <= 90;
  $: userData = showExample ? { age: +$user.age, score: +(+$user.score).toFixed(2) } : undefined;
  $: data = $readerData.results.map((d, id) => ({
    ...d,
    id
  }));
  $: exclude = value === "on";
  $: loess = $readerData.loess;

  const showTrend = true;
  const showValues = true;

  const extentStudy = extent(raw, (d) => +d[propY]);
  const extentUser = extent(raw, (d) => +d[propY]);
  const domainY = [
    Math.min(extentStudy[0], extentUser[0]),
    Math.max(extentStudy[1], extentUser[1])
  ];
</script>

<p bind:this={textEl}>{@html text}</p>
<section>
  <figure>
    <div class="info">
      <h3><strong>All Tasks Complexity Scores (Ours)</strong></h3>
      <p class="toggle">
        <Toggle
          label="Exclude users with 1+ uniform responses"
          style="slider"
          options={["on", "off"]}
          bind:value
        />
      </p>
    </div>

    {#if data && data.length}
      <div class="chart">
        <Complexity
          {propY}
          {data}
          {showTrend}
          {showValues}
          {domainY}
          {showExample}
          {userData}
          {loess}
          {exclude}
        />
      </div>
    {/if}
  </figure>
</section>

<style>
  figure {
    margin: 2rem auto;
  }

  .info {
    text-align: left;
  }

  h3 {
    font-size: 1em;
    text-align: center;
    margin: 0;
    line-height: 1;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-direction: column;
    padding-top: 1em;
    height: 2.5em;
  }

  .toggle {
    line-height: 1;
    margin: 0;
    margin-top: 1rem;
  }

  .chart {
    margin-top: 3rem;
  }
</style>
