<script>
  import { copy } from "svelte-copy";
  export let textBefore;
  export let textAfter;
  export let textButton;
  const url = "https://pudding.cool/2022/04/random";
</script>

<p>
  {@html textBefore} ( <button use:copy={url}>{textButton}</button> )
  {@html textAfter}
</p>

<style>
  p {
    margin: 0;
  }

  button {
    padding: 0.125em 0.5em;
  }
</style>
