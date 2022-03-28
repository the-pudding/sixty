<script>
  import { onMount } from "svelte";
  import { ascending } from "d3";
  import Toggle from "$components/helpers/Toggle.svelte";
  import Complexity from "$components/Complexity.svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import raw from "$data/scatter.csv";
  import viewport from "$stores/viewport.js";
  import { user } from "$stores/misc.js";

  export let steps;

  const propY = "toss";
  const bad = -4.42;

  const getHighlight = (age, toss) => {
    const match = examples.find((d) => d.age === age && d.toss === toss);
    return match ? match.value : undefined;
  };

  const examples = [
    {
      age: 15,
      toss: 0.17,
      value: "TTHHTHHHHHHH"
    },
    {
      age: 42,
      toss: 2.72,
      value: "HHTHTTTHHHTT"
    },
    {
      age: 72,
      toss: -2.43,
      value: "HTTHTTTTTTTT"
    }
  ];

  const data = raw.map((d, id) => ({
    id,
    age: +d.age,
    toss: +d.toss,
    roll: +d.roll,
    spot: +d.spot,
    score: +d.score,
    fixed: +d.fixed,
    exclude: +d.toss === bad,
    highlight: getHighlight(+d.age, +d.toss)
  }));

  data.sort((a, b) => ascending(!!a.highlight, !!b.highlight));

  let value = "off";
  let scrollIndex = 0;
  let autoToggle = true;
  let autoInterval;
  let toggled;

  $: height = `${$viewport.height}px`;
  $: exclude = showToggle && value === "on";
  $: showValues = true;
  $: showExample = scrollIndex === 0;
  $: showTrend = scrollIndex > 1;
  $: showBad = scrollIndex > 2;
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

    <Complexity {propY} {data} {exclude} {showTrend} {showValues} {showExample} {showBad} />
    <!-- <figcaption>Note: {note}</figcaption> -->
  </figure>

  <article>
    <Scrolly bind:value={scrollIndex}>
      {#each steps as { text }, i}
        <div class="step" class:active={scrollIndex === i} style:height>
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
