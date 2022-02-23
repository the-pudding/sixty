<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import WIP from "$components/helpers/WIP.svelte";
  import Slider from "$components/helpers/Slider.svelte";
  import Slide from "$components/helpers/Slider.Slide.svelte";
  import Progress from "$components/Progress.svelte";
  import Text from "$components/Slide.Text.svelte";
  import Intro from "$components/Slide.Intro.svelte";
  import Test from "$components/Slide.Test.svelte";
  import Guess from "$components/Slide.Guess.svelte";
  import Age from "$components/Slide.Age.svelte";
  import Results from "$components/Slide.Results.svelte";
  import localStorage from "$utils/localStorage.js";
  import copy from "$data/doc.json";
  import { user } from "$stores/misc.js";

  let slider;
  let activeSlide;

  const slideComponents = { Text, Intro, Test, Guess, Age, Results };
  const storagePrefix = "pudding_sixty";
  const storageKeys = ["story", "rightwrong", "guess", "age", "toss", "roll", "spot"];

  const onPrev = () => slider.prev();
  const onNext = () => slider.next();
  const onJump = () => slider.jump(6);

  const updateStorage = (store) => {
    Object.keys(store).forEach((key) => localStorage.set(`${storagePrefix}_${key}`, store[key]));
  };

  $: updateStorage($user);

  onMount(() => {
    storageKeys.forEach((key) => ($user[key] = localStorage.get(`${storagePrefix}_${key}`)));
    // storageKeys.forEach((key) => localStorage.remove(`${storagePrefix}_${key}`));
  });
</script>

<!-- <WIP /> -->

<Progress index={activeSlide} count={copy.slides.length} />
<Slider bind:this={slider} duration="0ms" direction="horizontal" bind:active={activeSlide}>
  {#each copy.slides as props, i}
    <Slide active={activeSlide === i}>
      <div class="inner" id={props.id ?? `slide-${i}`}>
        <svelte:component
          this={slideComponents[props.component] ?? Text}
          {...props}
          on:prev={onPrev}
          on:next={onNext}
          on:jump={onJump}
        />
      </div>
    </Slide>
  {/each}
</Slider>

<style>
  .inner {
    width: 100%;
    max-width: var(--col-width);
    margin: 0 auto;
  }
</style>
