<script>
  import { onMount, tick } from "svelte";
  import { writable } from "svelte/store";
  import WIP from "$components/helpers/WIP.svelte";
  import Text from "$components/Slide.Text.svelte";
  import Intro from "$components/Slide.Intro.svelte";
  import Test from "$components/Slide.Test.svelte";
  import Age from "$components/Slide.Age.svelte";
  import localStorage from "$utils/localStorage.js";
  import computeComplexity from "$utils/computeComplexity.js";
  import copy from "$data/doc.json";
  import { user, jumped } from "$stores/misc.js";

  const slideComponents = { Text, Intro, Test, Age };
  const storagePrefix = "pudding_sixty";
  const storageKeys = ["story", "rightwrong", "guess", "score", "age", "toss", "roll", "spot"];
  const ageIndex = 4;
  const jumpIndex = 5;

  let skipped;
  let slide = 0;

  const getGuess = async () => {
    const SIXTY_CUTOFF = 0.745;

    const score = await computeComplexity($user.toss, $user.roll, $user.spot);
    $user.score = score;
    $user.guess = score < SIXTY_CUTOFF;
    $user.rightwrong = $user.guess ? $user.age > 60 : $user.age <= 60;
    console.log($user);
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

  const updateStorage = (store) => {
    Object.keys(store).forEach((key) => localStorage.set(`${storagePrefix}_${key}`, store[key]));
  };

  $: if (slide === ageIndex) getGuess();
  $: $jumped = slide >= jumpIndex;
  $: updateStorage($user);

  onMount(async () => {
    // TODO remove
    storageKeys.forEach((key) => localStorage.remove(`${storagePrefix}_${key}`));
    storageKeys.forEach(
      (key) => ($user[key] = localStorage.get(`${storagePrefix}_${key}`) ?? undefined)
    );
  });
</script>

<!-- <WIP /> -->
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
      on:next={onNext}
      on:jump={onJump}
    />
  </div>
{/each}

<style>
  .slide {
    width: 100%;
    max-width: var(--col-width);
    margin: 0 auto;
    padding: 1rem 0;
    display: none;
  }

  .visible {
    display: block;
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
