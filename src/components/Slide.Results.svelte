<script>
  import Nav from "$components/Nav.svelte";
  import { user } from "$stores/misc.js";
  export let thanks;
  export let guess1;
  export let guess2;
  export let guess2Alt;
  export let guess3;
  export let guess4;
  export let outcome;

  const globalReview = "good";
  const only = globalReview === "bad" ? "only" : "";
  const g1 = guess1[$user.rightwrong];
  const g2 = guess2[`${$user.rightwrong}_${globalReview}`];
  const g2Alt = guess2Alt;
  const out = outcome[globalReview];
  const percent = "65%";

  $user.story = true;
  $: played = !!$user.guess;
</script>

{#if played}
  <p>{thanks}</p>
  <p>{g1} {g2} {only} {guess3} {percent} {guess4}</p>
{:else}
  <p>{g2Alt} {only} {guess3} {percent} {guess4}</p>
{/if}
<p>{out}</p>

<figure>
  <p>[TODO chart here]</p>
</figure>

<Nav on:next on:prev />
