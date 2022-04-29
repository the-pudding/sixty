<script>
  import { ascending } from "d3";
  import Toggle from "$components/helpers/Toggle.svelte";
  import Complexity from "$components/Complexity.svelte";
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import raw from "$data/scatter.csv";
  import viewport from "$stores/viewport.js";
  import { user } from "$stores/misc.js";

  export let steps;

  const propY = "toss";
  const bad = -4.41;

  const getHighlight = (age, toss) => {
    const match = examples.find((d) => d.age === age && d.toss === toss && !d.uniform);
    return match ? match.value : undefined;
  };

  const getUniform = (age, toss) => {
    const match = examples.find((d) => d.age === age && d.toss === toss && d.uniform);
    return match ? match.value : undefined;
  };

  const examples = [
    {
      age: 14.8,
      toss: 0.17,
      value: "TTHHTHHHHHHH"
    },
    {
      age: 41.6,
      toss: 2.72,
      value: "HHTHTTTHHHTT"
    },
    {
      age: 72.0,
      toss: -2.43,
      value: "HTTHTTTTTTTT"
    },
    {
      age: 45.4,
      toss: -4.42,
      value: "HHHHHHHHHHHH",
      uniform: true
    }
  ];

  const data = raw.map((d, id) => ({
    id,
    age: +d.age,
    toss: +d.toss,
    exclude: +d.toss < bad,
    highlight: getHighlight(+d.age, +d.toss),
    uniform: getUniform(+d.age, +d.toss)
  }));

  data.sort(
    (a, b) =>
      ascending(!!a.highlight, !!b.highlight) ||
      ascending(!!a.uniform, !!b.uniform) ||
      ascending(a.toss, b.toss)
  );

  let value = "off";
  let scrollIndex = 0;
  let autoToggle = true;
  let userToggled = false;
  let autoInterval;
  let articleEl;
  let userData;

  $: height = `${$viewport.height}px`;
  $: exclude = showToggle && value === "on";
  $: showValues = true;
  $: showExample = scrollIndex === 0;
  $: showTrend = scrollIndex > 1;
  $: showBad = scrollIndex > 2;
  $: showToggle = scrollIndex > 3;
  $: showUniform = scrollIndex === 3;
  $: showUser = $user.scoreToss && +$user.age <= 90;
  $: updateUser(showUser, scrollIndex);
  $: value = showToggle ? "on" : "off";
  $: if (autoToggle && showToggle) setAuto();

  const setAuto = () => {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => (value = value === "off" ? "on" : "off"), 3000);
  };

  const updateUser = (u, si) => {
    if (u && si === 1) {
      let span;
      const toss = +(+$user.scoreToss).toFixed(2);
      if (toss < -2) span = "not really";
      else if (toss < 0) span = "kind of";
      else if (toss < 2) span = "pretty";
      else span = "super";
      articleEl.querySelector("span").innerText = `It was ${span} random.`;

      const i = data.findIndex((d) => toss <= d.toss);
      const mark = Math.round((i / data.length) * 100);
      articleEl.querySelector("mark.higher").innerText = `${mark}%`;

      userData = {
        age: +$user.age,
        toss
      };
    } else userData = undefined;
  };

  const onToggled = () => {
    userToggled = true;
    autoToggle = false;
    clearInterval(autoInterval);
  };
</script>

<section>
  <figure>
    <div class="info">
      <h3><strong>Coin Toss Complexity Scores</strong></h3>
      <p class="toggle">
        {#if showToggle}
          <Toggle
            on:toggled={onToggled}
            label="Exclude uniform responses"
            style="slider"
            options={["on", "off"]}
            bind:value
          />
        {/if}
      </p>
    </div>

    <div class="chart">
      <Complexity
        {propY}
        {data}
        {exclude}
        {showTrend}
        {showValues}
        {showExample}
        {showUniform}
        {showBad}
        {userData}
      />
    </div>
  </figure>

  <article bind:this={articleEl}>
    <Scrolly bind:value={scrollIndex}>
      {#each steps as { text }, i}
        <div
          class="step"
          class:hide={!showUser && i === 1}
          class:active={scrollIndex === i}
          style:height
        >
          <p>{@html text}</p>
        </div>
      {/each}
    </Scrolly>
  </article>
</section>

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
    transition: opacity 250ms ease-in-out;
    opacity: 0.75;
  }

  .step p {
    background: var(--color-bg);
    border: 2px solid var(--color-fg);
    padding: 1rem;
  }

  .step.active {
    opacity: 1;
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
    padding-top: 1em;
    height: 2.5em;
  }

  .toggle {
    line-height: 1;
    margin: 0;
  }

  @media only screen and (max-width: 600px) {
    .info {
      flex-direction: column;
    }

    .toggle {
      margin-top: 1rem;
    }

    .chart {
      margin-top: 3rem;
    }
  }

  :global(mark.user) {
    background: var(--color-green);
  }

  .hide {
    display: none;
  }
</style>
