<script>
  export let file;
  export let caption;
</script>

<figure>
  <video src="assets/{file}" preload autoplay muted loop />
  <figcaption>{caption}</figcaption>
</figure>

<style>
  video {
    display: block;
    border: 2px solid var(--color-black);
  }
</style>
