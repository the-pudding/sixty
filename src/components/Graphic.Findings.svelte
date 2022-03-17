<script>
  import { max, extent } from "d3";
  import Scatter from "$components/Scatter.svelte";
  import Toggle from "$components/helpers/Toggle.svelte";
  import raw from "$data/scatter.csv";

  export let note;

  const clean = raw.map((d, id) => ({
    id,
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

  let value = "off";
  $: data = clean.filter((d) => (value === "on" ? !d.exclude : true));
</script>

<figure>
  <div>
    <h3><strong>Complexity Scores by Age</strong></h3>
    <Toggle label="Exclude Bad Responses" style="slider" options={["on", "off"]} bind:value />
  </div>
  <Scatter {data} {domainY} {domainX} {propX} {propY} />
  <figcaption>Note: {note}</figcaption>
</figure>

<style>
  figure {
    margin: 2rem auto;
  }
  figcaption {
    margin-top: 1rem;
    font-size: 0.8em;
  }

  h3 {
    font-size: 1em;
    text-align: center;
  }

  div {
    display: flex;
    justify-content: space-between;
  }
</style>
