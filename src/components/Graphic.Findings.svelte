<script>
  import { max, extent } from "d3";
  import Scatter from "$components/Scatter.svelte";
  import raw from "$data/scatter.csv";

  const clean = raw.map((d) => ({
    age: +d.age,
    score: +d.score,
    fixed: +d.fixed,
    exclude: +d.fixed !== +d.score
  }));

  const domainY = extent(clean, (d) => d.score);
  const maxX = max(clean, (d) => d.age);
  const domainX = [0, maxX];
  const propX = "age";
  const propY = "score";

  const studyData = clean;
  const excludeData = studyData.filter((d) => !d.exclude);
</script>

<div class="charts">
  <figure>
    <h3><strong>Original Study Reproduction</strong></h3>
    <Scatter data={studyData} {domainY} {domainX} {propX} {propY} />
  </figure>

  <figure>
    <h3><strong>Bad Responses Fixed</strong></h3>
    <Scatter data={studyData} {domainY} {domainX} {propX} propY={"fixed"} />
  </figure>
</div>

<style>
  .charts {
    display: flex;
    margin-top: 2rem;
  }

  figure {
    width: 50%;
  }

  h3 {
    font-size: 1em;
  }
</style>
