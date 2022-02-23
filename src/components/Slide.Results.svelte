<script>
  import Nav from "$components/Nav.svelte";
  import { user } from "$stores/misc.js";
  export let thanks;
  export let guess1;
  export let guess2;
  export let guess3;
  export let guess4;
  export let outcome;

  // TODO
  const globalReview = "good";
  const g1 = guess1[$user.rightwrong];
  const g2 = guess2[`${$user.rightwrong}_${globalReview}`];
  const out = outcome[globalReview];
  const percent = "65%";

  $user.story = true;
</script>

<p>{thanks}</p>
<p>{g1} {g2} {guess3} {percent} {guess4}</p>
<p>{out}</p>

<Nav on:next on:prev />
