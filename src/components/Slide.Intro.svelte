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
  export let repeatUser;

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
{#if repeatUser}
  <p class="repeat">
    {@html repeat}
  </p>
{/if}
<p class="options">
  <button {disabled} on:click={onNext}>{button}</button>
  <br />
  <button {disabled} class="jump" on:click={onJump}><small>{jump}</small></button>
</p>

<div class="byline">{@html byline}</div>

<style>
  h1 {
    margin-top: 6rem;
  }

  .byline {
    position: absolute;
    font-size: 0.75em;
    top: 1rem;
    right: 1rem;
    max-width: 10em;
    text-align: right;
  }

  .options {
    /* text-align: center; */
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
    font-size: 1em;
    color: var(--color-form-bg);
  }
</style>
