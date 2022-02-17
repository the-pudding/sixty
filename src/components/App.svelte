<script>
  import { setContext } from "svelte";
  import WIP from "$components/helpers/WIP.svelte";
  import Slider from "$components/helpers/Slider.svelte";
  import Slide from "$components/helpers/Slider.Slide.svelte";
  import Test from "$components/Slide.Test.svelte";
  import Intro from "$components/Slide.Intro.svelte";
  import Text from "$components/Slide.Text.svelte";
  import copy from "$data/doc.json";

  let slider;

  const slideComponents = { Text, Intro, Test };

  const onNext = () => slider.next();

  setContext("App", { storagePrefix: "pudding_sixty" });
</script>

<!-- <WIP /> -->

<Slider bind:this={slider} duration="0ms" direction="horizontal">
  {#each copy.slides as props, i}
    <Slide>
      <div class="inner" id={props.id ?? `slide-${i}`}>
        <svelte:component
          this={slideComponents[props.component] ?? Text}
          {...props}
          on:next={onNext}
        />
      </div>
    </Slide>
  {/each}
</Slider>

<style>
</style>
