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

  const onClick = async () => {
    done = true;
    $user.age = value;

    if (!$user.story && $user.age && $user.toss && $user.spot && $user.roll) {
      const table = "readers";
      const data = {};
      const keys = ["age", "toss", "spot", "roll", "guess"];
      keys.forEach((key) => (data[key] = $user[key]));
      insert({ table, data });
    }

    dispatch("next");
  };

  $: disabled = value === 0 || done;
</script>

<div class="age">
  <p>{guess} {"over 60"}. {prompt}</p>
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
    line-height: 1;
  }
</style>
