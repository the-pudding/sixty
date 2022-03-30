<script>
  import { ascending } from "d3";
  import Complexity from "$components/Complexity.svelte";
  import raw from "$data/scatter.csv";

  const propY = "score";

  const data = raw.map((d, id) => ({
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
      <h3><strong>Aggregate Complexity Scores by Age</strong></h3>
    </div>

    <Complexity {propY} {data} {showTrend} {showValues} />
  </figure>
</section>

<style>
  figure {
    margin: 2rem auto;
  }

  h3 {
    font-size: 1em;
    text-align: center;
  }

  .info {
    display: flex;
    justify-content: space-between;
  }
</style>
