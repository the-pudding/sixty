<script>
  export let title;
  export let text;
</script>

<div class="text">
  {#if title}
    <h3><strong>{title}</strong></h3>
  {/if}
  <p>{@html text}</p>
</div>

<style>
  p {
    margin: 0;
  }
</style>
