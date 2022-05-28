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
    $user.rightwrong = $user.guess ? $user.age > 60 : $user.age <= 60;

    if (
      !$user.story &&
      $user.age &&
      $user.toss &&
      $user.spot &&
      $user.roll &&
      $user.score &&
      $user.scoreToss &&
      $user.scoreRoll &&
      $user.scoreSpot
    ) {
      const table = "random_readers";
      const data = {};
      const keys = [
        "toss",
        "spot",
        "roll",
        "age",
        "guess",
        "rightwrong",
        "score",
        "scoreToss",
        "scoreRoll",
        "scoreSpot"
      ];
      keys.forEach((key) => (data[key] = $user[key]));
      insert({ table, data });
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
    background: var(--color-pink);
    padding: 1rem;
    margin-top: 1rem;
    border: 2px solid var(--color-fg);
  }
</style>
