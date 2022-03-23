<script>
  import { onMount } from "svelte";
  import Toggle from "$components/helpers/Toggle.svelte";
  import Complexity from "$components/Complexity.svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import raw from "$data/scatter.csv";
  import viewport from "$stores/viewport.js";

  export let steps;

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
  let scrollIndex = 0;
  let autoToggle = true;
  let autoInterval;
  let toggled;

  $: height = `${$viewport.height}px`;
  $: exclude = showToggle && value === "on";
  $: showValues = true;
  $: showTrend = scrollIndex > 1;
  $: showToggle = scrollIndex > 3;
  $: value = showToggle ? "on" : "off";
  $: if (toggled) {
    autoToggle = false;
    clearInterval(autoInterval);
  }

  const onToggled = () => {
    toggled = true;
  };

  onMount(() => {
    autoInterval = setInterval(() => (value = value === "off" ? "on" : "off"), 3000);
  });
</script>

<section>
  <figure>
    <div class="info">
      <h3><strong>Complexity Scores by Age</strong></h3>
      {#if showToggle}
        <Toggle
          on:toggled={onToggled}
          label="Exclude Bad Responses"
          style="slider"
          options={["on", "off"]}
          bind:value
        />
      {/if}
    </div>

    <Complexity {data} propY="toss" {exclude} {showTrend} {showValues} />
    <!-- <figcaption>Note: {note}</figcaption> -->
  </figure>

  <article>
    <Scrolly bind:value={scrollIndex}>
      {#each steps as { text }, i}
        <div class="step" style:height class:active={scrollIndex === i}>
          <p>{@html text}</p>
        </div>
      {/each}
    </Scrolly>
  </article>
</section>

<!-- <div class="multiple">
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
</div> -->
<style>
  section {
    position: relative;
  }

  figure {
    position: sticky;
    top: 0;
    margin: 2rem auto;
  }

  article {
    position: relative;
    pointer-events: none;
  }

  .step {
    opacity: 0.2;
  }

  .step p {
    background: var(--color-bg);
    padding: 1rem;
  }

  .step.active {
    opacity: 1;
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
