<script>
  import { createEventDispatcher } from "svelte";
  export let next = true;
  export let prev = false;

  const dispatch = createEventDispatcher();
</script>

<nav>
  {#if prev}
    <button class="prev" on:click={() => dispatch("prev")}>
      <slot name="prev">Prev</slot>
    </button>
  {/if}
  {#if next}
    <button class="next" on:click={() => dispatch("next")}>
      <slot name="next">Next</slot>
    </button>
  {/if}
</nav>
