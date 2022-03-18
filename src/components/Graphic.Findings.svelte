<script>
  import Toggle from "$components/helpers/Toggle.svelte";
  import Complexity from "$components/Complexity.svelte";
  import raw from "$data/scatter.csv";

  export let note;

  const data = raw.map((d, id) => ({
    id,
    age: +d.age,
    toss: +d.toss,
    roll: +d.roll,
    spot: +d.spot,
    score: +d.score,
    fixed: +d.fixed,
    exclude: +d.fixed !== +d.score
  }));

  data.sort((a, b) => a.exclude - b.exclude);

  let value = "off";
</script>

<figure>
  <div class="info">
    <h3><strong>Complexity Scores by Age</strong></h3>
    <Toggle label="Exclude Bad Responses" style="slider" options={["on", "off"]} bind:value />
  </div>
  <Complexity {data} propY="score" exclude={value} />
  <figcaption>Note: {note}</figcaption>
</figure>

<Toggle label="Exclude Bad Responses" style="slider" options={["on", "off"]} bind:value />

<div class="multiple">
  <figure>
    <p><small>Toss</small></p>
    <Complexity {data} propY="toss" exclude={value} hide={true} />
  </figure>

  <figure>
    <p><small>Roll</small></p>
    <Complexity {data} propY="roll" exclude={value} hide={true} />
  </figure>

  <figure>
    <p><small>Spot</small></p>
    <Complexity {data} propY="spot" exclude={value} hide={true} />
  </figure>
</div>

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

  .info {
    display: flex;
    justify-content: space-between;
  }

  .multiple {
    display: flex;
  }

  .multiple figure {
    width: 33.33%;
  }
</style>
