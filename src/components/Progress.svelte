<script>
  import { range } from "d3";
  export let index;
  export let count;

  const bars = range(count);
</script>

<div>
  {#each bars as b}
    <span class="bar" class:visible={index >= b} />
  {/each}
</div>

<style>
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
  }

  span {
    display: block;
    width: 100%;
    height: 0.325em;
    background: var(--color-gray-100);
    transition: all 250ms ease-in-out;
    border: 2px solid var(--color-bg);
  }

  span.visible {
    background: var(--color-gray-300);
  }
</style>
