<script>
  import { createEventDispatcher } from "svelte";
  import Header from "$components/Header.svelte";
  import { user } from "$stores/misc.js";
  export let hed;
  export let problem;
  export let prompt;
  export let button;
  export let repeat;
  export let jump;
  export let byline;

  const dispatch = createEventDispatcher();

  let disabled;

  const onJump = () => {
    dispatch("jump");
    disabled = true;
  };

  const onNext = () => {
    dispatch("next");
    disabled = true;
  };
</script>

<Header />
<h1>{hed}</h1>
<p>{problem}</p>
<p>{prompt}</p>
{#if $user.story}
  <p class="repeat">
    {@html repeat}
  </p>
{/if}
<p>
  <button {disabled} on:click={onNext}>{button}</button>
  <br />
  <button {disabled} class="jump" on:click={onJump}><small>{jump}</small></button>
</p>

<small class="byline">{@html byline}</small>

<style>
  h1 {
    margin-top: 6rem;
  }

  .byline {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  button {
    font-size: 2em;
    font-weight: bold;
    margin: 1rem auto;
  }

  button:disabled {
    visibility: hidden;
  }

  button.jump {
    background: none;
    border: none;
    width: auto;
    height: auto;
    border-bottom: 0.1em solid currentColor;
    border-radius: 0;
    font-size: 1em;
    font-weight: normal;
    padding: 0;
    margin: 0;
  }
</style>
