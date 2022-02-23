<script>
  import { getContext } from "svelte";
  import { browser } from "$app/env";

  export let active;
  const { direction, width, height } = getContext("Slider");
  let el;

  $: w = $direction === "horizontal" ? `${$width}px` : "100%";
  $: h = $direction === "vertical" ? `${$height}px` : "100%";
  $: if (browser && active) el.focus();
</script>

<div class="slide" class:active style="width: {w}; height: {h};" bind:this={el}>
  <slot />
</div>

<style>
  .slide {
    position: relative;
    width: 100%;
    height: 100%;
    visibility: hidden;
    animation: 400ms fadeOut forwards;
  }

  .active {
    animation: 400ms fadeIn forwards;
  }

  @keyframes fadeOut {
    0% {
      visibility: visible;
    }
    99% {
      visibility: visible;
    }
    100% {
      visibility: hidden;
    }
  }

  @keyframes fadeIn {
    0% {
      visibility: hidden;
    }
    1% {
      visibility: visible;
    }
    100% {
      visibility: visible;
    }
  }
</style>
