<script>
  import Instructions from "$components/Graphic.Instructions.svelte";
  import Bad from "$components/Graphic.Bad.svelte";
  import Findings from "$components/Graphic.Findings.svelte";

  const slideComponents = { Instructions, Bad, Findings };

  export let text;
  export let graphic;
  export let note;
</script>

<div class="text">
  <p>{@html text}</p>
  {#if graphic}
    <svelte:component this={slideComponents[graphic]} {note} />
  {/if}
</div>

<style>
  p {
    margin: 0;
  }
</style>
