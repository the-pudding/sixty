<script>
  import Instructions from "$components/Graphic.Instructions.svelte";
  import Bad from "$components/Graphic.Bad.svelte";
  import Findings from "$components/Graphic.Findings.svelte";
  import Correct from "$components/Graphic.Correct.svelte";

  const slideComponents = { Instructions, Bad, Findings, Correct };

  export let text;
  export let graphic;
  export let note;
</script>

<div class="text">
  {#if text}
    <p>{@html text}</p>
  {/if}
  {#if graphic}
    <svelte:component this={slideComponents[graphic]} {note} />
  {/if}
</div>

<style>
  p {
    margin: 0;
  }
</style>
