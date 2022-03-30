<script>
  import { ascending } from "d3";
  import Complexity from "$components/Complexity.svelte";
  import { readerData } from "$stores/misc.js";

  const propY = "score";
  $: data = $readerData.results.map((d, id) => ({
    id,
    age: +d.age,
    score: +d.score
  }));

  const showTrend = true;
  const showValues = true;
</script>

<section>
  <figure>
    <div class="info">
      <h3><strong>Our Aggregate Complexity Scores by Age</strong></h3>
      <p>Excludes bad responses</p>
    </div>

    <Complexity {propY} {data} {showTrend} {showValues} />
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

  p {
    margin: 0;
    font-size: 1em;
  }
</style>
