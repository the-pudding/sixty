<script>
  import { extent, ascending, format } from "d3";
  import Complexity from "$components/Complexity.svelte";
  import { user, readerData } from "$stores/misc.js";
  import raw from "$data/scatter.csv";

  export let text;

  let textEl;

  const propY = "score";

  const checkValid = (keys) => {
    const bad = {
      toss: -4.42,
      roll: -11.38,
      spot: -15.15
    };
  };

  $: if (textEl && $readerData.total)
    textEl.querySelector("mark").innerText = format(",")($readerData.total);
  $: showExample = $user.scoreToss && +$user.age <= 90;
  $: userData = showExample ? { age: +$user.age, score: +(+$user.score).toFixed(2) } : undefined;
  $: data = $readerData.results.map((d, id) => ({
    ...d,
    id
  }));

  const showTrend = false;
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
      <h3><strong>Our Aggregate Complexity Scores</strong></h3>
      <!-- <p>Excludes bad responses</p> -->
    </div>

    {#if data && data.length}
      <Complexity {propY} {data} {showTrend} {showValues} {domainY} {showExample} {userData} />
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
    margin-bottom: 0;
  }

  figure p {
    font-size: 1em;
    margin: 0;
  }
</style>
