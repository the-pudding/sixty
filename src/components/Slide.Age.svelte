<script>
  import { createEventDispatcher } from "svelte";
  import Range from "$components/helpers/Range.svelte";
  import { user } from "$stores/misc.js";
  import { insert } from "$utils/supabase.js";

  export let guess;
  export let prompt;
  export let note;
  export let detail;

  const dispatch = createEventDispatcher();

  let value = 0;
  let done;

  const checkValid = (keys) => {
    const invalid = keys.map((key) => /^(.)\1+$/.test($user[key])).find((d) => !d);
    return !invalid;
  };

  const onClick = async () => {
    done = true;
    $user.age = value;
    $user.rightwrong = $user.guess ? $user.age > 60 : $user.age <= 60;

    if (!$user.story && $user.age && $user.toss && $user.spot && $user.roll) {
      const table = "readers";
      const data = {};
      const keys = ["toss", "spot", "roll", "age", "guess"];
      const valid = checkValid(keys.slice(0, 3));
      if (valid) {
        keys.forEach((key) => (data[key] = $user[key]));
        insert({ table, data });
      }
    }

    dispatch("next");
  };

  $: waiting = $user.guess === undefined;
  $: custom = $user.guess ? "over 60" : "under 60";
  $: disabled = value === 0 || done;
</script>

<div class="age">
  <p>
    {guess}{#if waiting}...{:else}&nbsp;<mark>{custom}</mark>{/if}. {prompt}
  </p>
  <div class="range">
    <Range disabled={done} min={0} max={120} bind:value showValue={true} />
  </div>

  <button {disabled} on:click={onClick}>I am <strong>{value}</strong> years old</button>

  <details>
    <summary>
      <small>{note}</small>
    </summary>
    <div><small>{@html detail}</small></div>
  </details>
</div>

<style>
  :global(.jumped .age) {
    display: none;
  }

  .range {
    margin: 2em auto;
  }

  button {
    width: 10em;
  }

  details {
    margin-top: 2em;
  }

  summary {
    cursor: pointer;
  }

  details div {
    background: var(--color-gray-100);
    padding: 1rem;
    margin-top: 1rem;
  }
</style>
