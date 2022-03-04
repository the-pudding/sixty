<script>
  import { range } from "d3";
  import { createEventDispatcher } from "svelte";
  import Nav from "$components/Nav.svelte";
  import { user } from "$stores/misc.js";

  export let index;
  export let name;
  export let prompt;
  export let warning;
  export let instructions;

  const dispatch = createEventDispatcher();

  const layouts = {
    toss: {
      options: ["Heads", "Tails"],
      count: 12
    },
    spot: {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      count: 10
    },
    roll: {
      options: ["•", "••", "•••", "••••", "•••••", "••••••"].map((d) =>
        d
          .split("")
          .map((v) => `<span>${v}</span>`)
          .join("")
      ),
      count: 10
    }
  };

  const { options, count } = layouts[name];
  const placeholders = range(count);
  let sequence = [];
  let answer = "";
  let skip;

  const onOptionClick = (e) => {
    const val = e.target.value;
    sequence = [...sequence, val];
  };

  const onSkip = () => {
    left = 0;
    skip = true;
    dispatch("jump");
  };

  $: answer = sequence.join("");
  $: $user[name] = answer;
  $: prevIndex = +sequence[sequence.length - 1];
  $: prev = options[prevIndex] ?? "n/a";
  $: left = count - sequence.length;
  $: done = left <= 0;
  $: if (done && !skip) dispatch("next");
  $: suffix = count === 1 ? "" : "s";
</script>

<div class="prep" class:done>
  {#if instructions}
    <p class="instructions">
      <small>{@html instructions} {@html warning}</small>
    </p>
  {/if}
</div>

<div class="test test--{name}" class:done>
  <p class="challenge"><small>Challege {index} of 3</small></p>
  <p class="prompt">{@html prompt} <span><mark>{left}</mark> choice{suffix} left.</span></p>

  <div class="options">
    {#each options as value, i}
      <button disabled={done} value={i} on:pointerup={onOptionClick}>
        <span class="inner">{@html value}</span>
      </button>
    {/each}
  </div>

  <div class="previous">
    <p><small>Previous Choice: {prev}</small></p>
  </div>

  <div class="placeholders">
    <ul>
      {#each placeholders as p}
        <li>{@html sequence[p] ? +sequence[p] + 1 : "&nbsp;"}</li>
      {/each}
    </ul>
  </div>

  <button class="jump" on:click={onSkip}>Quit and skip to results</button>
</div>

<style>
  .test {
    --sz: 4.5em;
    font-family: var(--sans);
  }

  :global(.jumped .test),
  :global(.jumped .prep) {
    display: none;
  }

  .done {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.25;
  }

  .prep small {
    color: var(--color-gray-600);
  }

  .test small {
    text-transform: uppercase;
    color: var(--color-gray-600);
  }

  p {
    margin-top: 0;
  }

  .prompt mark {
    display: inline-block;
    width: 1.75em;
    text-align: center;
  }

  .prompt span {
    display: inline-block;
  }

  .options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    max-width: calc(var(--sz) * 3 + 2em);
  }

  .options button {
    width: var(--sz);
    height: var(--sz);
    border-radius: 50%;
    font-weight: bold;
    margin: 0.325em;
    line-height: 1;
    -webkit-tap-highlight-color: transparent;
  }

  button span {
    pointer-events: none;
  }

  button:disabled {
    pointer-events: none;
  }

  .test--roll span.inner {
    display: grid;
    grid: repeat(3, 1fr) / repeat(3, 1fr);
    justify-content: center;
    font-size: 0.75em;
    text-transform: uppercase;
    pointer-events: none;
  }

  .previous,
  .placeholders {
    display: none;
    margin: 1rem auto;
  }

  .previous p {
    margin: 0;
    line-height: 1;
  }

  .placeholders ul {
    display: flex;
  }

  .placeholders li {
    line-height: 1;
    width: 1em;
    border-bottom: 0.125em solid currentColor;
    margin: 0 0.25em;
    list-style-type: none;
    text-align: center;
  }

  .test--spot button span {
    visibility: hidden;
  }

  .test--toss .previous {
    display: block;
  }

  .test--roll .placeholders {
    display: block;
  }

  :global(.test--roll .inner span) {
    transform-origin: center center;
    transform: scale(2);
  }

  :global(.test--roll .options button:nth-of-type(1) .inner span:nth-of-type(1)) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(2) .inner span:nth-of-type(1)) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(2) .inner span:nth-of-type(2)) {
    grid-column: 3 / span 1;
    grid-row: 3 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(3) .inner span:nth-of-type(1)) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(3) .inner span:nth-of-type(2)) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(3) .inner span:nth-of-type(3)) {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(4) .inner span:nth-of-type(1)) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(4) .inner span:nth-of-type(2)) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(4) .inner span:nth-of-type(3)) {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(4) .inner span:nth-of-type(4)) {
    grid-column: 3 / span 1;
    grid-row: 3 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(5) .inner span:nth-of-type(1)) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(5) .inner span:nth-of-type(2)) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(5) .inner span:nth-of-type(3)) {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(5) .inner span:nth-of-type(4)) {
    grid-column: 3 / span 1;
    grid-row: 3 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(5) .inner span:nth-of-type(5)) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(6) .inner span:nth-of-type(1)) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(6) .inner span:nth-of-type(2)) {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(6) .inner span:nth-of-type(3)) {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(6) .inner span:nth-of-type(4)) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(6) .inner span:nth-of-type(5)) {
    grid-column: 3 / span 1;
    grid-row: 2 / span 1;
  }

  :global(.test--roll .options button:nth-of-type(6) .inner span:nth-of-type(6)) {
    grid-column: 3 / span 1;
    grid-row: 3 / span 1;
  }
</style>
