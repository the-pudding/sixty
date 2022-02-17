<script>
  import wordmark from "$svg/wordmark.svg";
</script>

<header>
  <div class="wordmark">
    An experiment by
    <a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
  </div>
</header>

<style>
  header {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translate(0, 0.25em);
    font-size: 0.625em;
  }
  .wordmark {
    max-width: 10em;
  }

  .wordmark a {
    border: none;
    color: var(--color-fg);
  }

  .wordmark a:hover {
    background-color: transparent;
  }

  :global(.wordmark svg path) {
    fill: currentColor;
  }
</style>
