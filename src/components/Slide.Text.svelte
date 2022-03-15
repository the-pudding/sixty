<script>
  import Instructions from "$components/Graphic.Instructions.svelte";
  import Bad from "$components/Graphic.Bad.svelte";
  import Findings from "$components/Graphic.Findings.svelte";

  const slideComponents = { Instructions, Bad, Findings };

  export let text;
  export let graphic;
</script>

<div class="text">
  <p>{@html text}</p>
  {#if graphic}
    <svelte:component this={slideComponents[graphic]} />
  {/if}
</div>

<style>
  p {
    margin: 0;
  }
</style>
