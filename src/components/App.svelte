<script>
  import { onMount, tick } from "svelte";
  import { writable } from "svelte/store";
  import WIP from "$components/helpers/WIP.svelte";
  import Footer from "$components/Footer.svelte";
  import Text from "$components/Slide.Text.svelte";
  import Intro from "$components/Slide.Intro.svelte";
  import Test from "$components/Slide.Test.svelte";
  import Instructions from "$components/Graphic.Instructions.svelte";
  import Bad from "$components/Graphic.Bad.svelte";
  import Findings from "$components/Graphic.Findings.svelte";
  import Aggregate from "$components/Graphic.Aggregate.svelte";
  import Live from "$components/Graphic.Live.svelte";
  import Correct from "$components/Graphic.Correct.svelte";
  import Age from "$components/Slide.Age.svelte";
  import localStorage from "$utils/localStorage.js";
  import computeComplexity from "$utils/computeComplexity.js";
  import copy from "$data/doc.json";
  import { user, jumped, readerData } from "$stores/misc.js";

  const slideComponents = {
    Text,
    Intro,
    Test,
    Age,
    Instructions,
    Bad,
    Findings,
    Aggregate,
    Live,
    Correct
  };
  const storagePrefix = "pudding_sixty";
  const storageKeys = [
    "story",
    "rightwrong",
    "guess",
    "score",
    "age",
    "toss",
    "roll",
    "spot",
    "scoreToss",
    "scoreRoll",
    "scoreSpot"
  ];
  const ageIndex = 4;
  const jumpIndex = 5;

  let skipped;
  let slide = 0;
  let mounted = false;
  let repeatUser = false;

  const getGuess = async () => {
    const SIXTY_CUTOFF = 0.745;
    const [score, scoreToss, scoreRoll, scoreSpot] = await computeComplexity(
      $user.toss,
      $user.roll,
      $user.spot
    );
    $user.scoreToss = scoreToss.toFixed(2);
    $user.scoreRoll = scoreRoll.toFixed(2);
    $user.scoreSpot = scoreSpot.toFixed(2);
    $user.score = score.toFixed(2);
    $user.guess = score < SIXTY_CUTOFF;
  };

  const removeHash = () =>
    history.pushState("", document.title, window.location.pathname + window.location.search);

  const scroll = async () => {
    await tick();
    location.hash = `#slide-${slide}`;
    removeHash();
  };

  const onNext = () => {
    slide += 1;
    scroll();
  };

  const onJump = () => {
    slide = jumpIndex;
    skipped = true;
    scroll();
  };

  const updateStorage = () => {
    if (!mounted) return;
    storageKeys.forEach((key) => {
      localStorage.set(`${storagePrefix}_${key}`, $user[key]);
    });
  };

  const clear = () => {
    storageKeys.forEach((key) => localStorage.remove(`${storagePrefix}_${key}`));
  };

  $: if (slide === ageIndex) getGuess();
  $: $jumped = slide >= jumpIndex;
  $: $user.story = !user.story && $jumped;
  $: updateStorage($user);

  onMount(async () => {
    storageKeys.forEach((key) => {
      $user[key] = localStorage.get(`${storagePrefix}_${key}`);
    });
    repeatUser = $user.story;
    mounted = true;
    const url = `https://pudding.cool/2022/04/sixty-data/data.json?version=${Date.now()}`;
    const response = await fetch(url);
    $readerData = await response.json();
    console.log($readerData);
  });
</script>

<WIP />

{#each copy.slides as props, i}
  <div
    class="slide"
    id={props.id ?? `slide-${i}`}
    class:visible={$jumped || slide >= i}
    class:jumped={$jumped}
    class:skipped
  >
    <svelte:component
      this={slideComponents[props.component] ?? Text}
      {...props}
      {repeatUser}
      on:next={onNext}
      on:jump={onJump}
    />
  </div>
{/each}

<div class="slide" id="methods" class:visible={$jumped} class:jumped={$jumped} class:skipped>
  {#each copy.methods as { value }}
    <p><small>{@html value}</small></p>
  {/each}
</div>

{#if $jumped}
  <Footer />
{/if}

<style>
  .slide {
    width: 100%;
    max-width: var(--col-width);
    margin: 0 auto;
    padding: 1rem;
    display: none;
  }

  .visible {
    display: block;
  }

  #methods p {
    line-height: 1.2;
  }

  :global(.jumped .age) {
    display: block;
  }

  :global(.skipped .age),
  :global(.skipped .test),
  :global(.skipped .prep) {
    display: none;
  }
</style>
