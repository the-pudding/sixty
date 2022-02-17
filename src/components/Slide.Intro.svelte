<script>
  import { createEventDispatcher } from "svelte";
  import Header from "$components/Header.svelte";
  export let hed;
  export let button;
  export let note;

  const dispatch = createEventDispatcher();
</script>

<Header />
<h1>{hed}</h1>
<p><button on:click={() => dispatch("next")}>{button}</button></p>
<small class="note">{note}</small>

<style>
  .note {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  p {
    margin-top: 2em;
    text-align: center;
  }

  button {
    width: 6em;
    height: 6em;
    border-radius: 50%;
    font-weight: bold;
  }
</style>
