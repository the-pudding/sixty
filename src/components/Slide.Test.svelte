<script>
  import { range } from "d3";
  import { createEventDispatcher, getContext } from "svelte";
  import storage from "$utils/localStorage.js";

  export let index;
  export let name;
  export let prompt;

  const { storagePrefix } = getContext("App");
  const dispatch = createEventDispatcher();

  const layouts = {
    flip: {
      options: ["Heads", "Tails"],
      count: 12
    },
    spot: {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      count: 10
    },
    roll: {
      options: ["•", "••", "•••", "••••", "•••••", "••••••"],
      count: 10
    }
  };

  const { options, count } = layouts[name];
  const placeholders = range(count);
  let sequence = [];

  const onOptionClick = (e) => {
    const val = e.target.value;
    sequence = [...sequence, val];
    storage.set(`${storagePrefix}_${name}`, sequence);
  };

  $: prevIndex = +sequence[sequence.length - 1];
  $: prev = options[prevIndex] ?? "None";
  $: left = count - sequence.length;
  $: done = left <= 0;
  $: suffix = count === 1 ? "" : "s";
</script>

<div class="test test--{name}">
  <p><small>Challege {index} of 3</small></p>
  <p>{@html prompt}</p>

  <div class="options">
    {#each options as value, i}
      <button disabled={done} value={i} on:pointerup={onOptionClick}>
        <span>{value}</span>
      </button>
    {/each}
  </div>

  <div class="previous">
    <p>Previous Choice: {prev}</p>
  </div>

  <div class="placeholders">
    <ul>
      {#each placeholders as p}
        <li>{sequence[p] ? +sequence[p] + 1 : ""}</li>
      {/each}
    </ul>
  </div>

  <p><small>{left} choice{suffix} left</small></p>

  {#if done}
    <div><button on:click={() => dispatch("next")}>Next</button></div>
  {/if}
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

  button {
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

  span {
    font-size: 0.75em;
    text-transform: uppercase;
    pointer-events: none;
    /* display: grid;
    width: 100%;
    height: 100%; */
  }

  .previous,
  .placeholders {
    display: none;
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
</style>
