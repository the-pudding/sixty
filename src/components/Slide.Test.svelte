<script>
  import { range } from "d3";
  import { createEventDispatcher } from "svelte";
  import Nav from "$components/Nav.svelte";
  import { user } from "$stores/misc.js";

  export let index;
  export let name;
  export let prompt;
  export let warning;

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

  const onOptionClick = (e) => {
    const val = e.target.value;
    sequence = [...sequence, val];
  };

  $: answer = sequence.join("");
  $: $user[name] = answer;
  $: prevIndex = +sequence[sequence.length - 1];
  $: prev = options[prevIndex] ?? "None";
  $: left = count - sequence.length;
  $: done = left <= 0;
  $: suffix = count === 1 ? "" : "s";
</script>

<div class="test test--{name}">
  <p><small>Challege {index} of 3</small></p>
  <p>{@html prompt}</p>
  {#if warning}
    <p><small>{@html warning}</small></p>
  {/if}

  <div class="options">
    {#each options as value, i}
      <button disabled={done} value={i} on:pointerup={onOptionClick}>
        <span class="inner">{@html value}</span>
      </button>
    {/each}
  </div>

  <div class="previous">
    <p>Previous Choice: {prev}</p>
  </div>

  <div class="placeholders">
    <ul>
      {#each placeholders as p}
        <li>{@html sequence[p] ? +sequence[p] + 1 : "&nbsp;"}</li>
      {/each}
    </ul>
  </div>

  <p><small>{left} choice{suffix} left</small></p>

  {#if done || true}
    <Nav on:next on:prev />
  {/if}

  <button on:click={() => dispatch("jump")}>Skip to results</button>
</div>

<style>
  .test {
    --sz: 4.5em;
  }

  small {
    text-transform: uppercase;
    color: var(--color-gray-500);
  }

  p {
    margin-top: 0;
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

  button:disabled {
    pointer-events: none;
  }

  span.inner {
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
    margin: 0 auto;
  }

  .placeholders ul {
    display: flex;
  }

  .placeholders li {
    width: 1em;
    border-bottom: 0.125em solid currentColor;
    margin: 0 0.25em;
    list-style-type: none;
    text-align: center;
  }

  .test--spot button span {
    visibility: hidden;
  }

  .test--flip .previous {
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
