<script>
  import Nav from "$components/Nav.svelte";
  export let title;
  export let text;
</script>

{#if title}
  <h3>{title}</h3>
{/if}
<p>{@html text}</p>

<Nav prev={true} on:next on:prev />
