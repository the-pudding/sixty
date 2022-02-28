<script>
  import { createEventDispatcher } from "svelte";
  import Header from "$components/Header.svelte";
  import { user } from "$stores/misc.js";
  export let hed;
  export let button;
  export let repeat;
  export let jump;
  export let note;

  const dispatch = createEventDispatcher();
</script>

<Header />
<h1>{hed}</h1>
{#if $user.story}
  <p class="repeat">
    {repeat} <button class="jump" on:click={() => dispatch("jump")}>{jump}</button>
  </p>
{/if}
<p>
  <button on:click={() => dispatch("next")}>{button}</button>
</p>

<small class="note">{note}</small>

<style>
  .note {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
  }

  p {
    margin-top: 2em;
    text-align: center;
  }

  p.repeat {
    text-align: left;
  }

  button {
    width: 6em;
    height: 6em;
    border-radius: 50%;
    font-weight: bold;
  }

  button.jump {
    background: none;
    border: none;
    width: auto;
    height: auto;
    border-bottom: 0.1em solid currentColor;
    border-radius: 0;
    font-weight: normal;
    padding: 0;
  }
</style>
