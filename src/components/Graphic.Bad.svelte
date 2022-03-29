<figure>
  <p>
    <mark class="good">
      <span>3</span>
      <span>1</span>
      <span>5</span>
      <span>6</span>
      <span>2</span>
      <span>6</span>
      <span>3</span>
      <span>4</span>
      <span>4</span>
      <span>1</span>
    </mark>
  </p>
  <p>
    <mark class="bad">
      <span>1</span>
      <span>1</span>
      <span>1</span>
      <span>1</span>
      <span>1</span>
      <span>1</span>
      <span>1</span>
      <span>1</span>
      <span>1</span>
      <span>1</span>
    </mark>
  </p>
</figure>

<style>
  figure {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }

  p {
    text-align: center;
    display: inline-block;
    padding: 0 0.5em;
  }

  :global(.good) {
    background-color: var(--color-good);
  }

  :global(.bad) {
    background-color: var(--color-bad);
    color: var(--color-offwhite);
  }

  .description {
    text-align: center;
    margin-bottom: 0;
  }

  .inner span {
    display: inline-block;
    line-height: 1;
    width: 1em;
    border-bottom: 0.125em solid currentColor;
    margin: 0 0.25em;
  }
</style>
