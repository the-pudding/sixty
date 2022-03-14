<figure>
  <p class="description"><small>A <strong class="good">good</strong> response</small></p>
  <p class="good">
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
  </p>
  <p class="description"><small>and a <strong class="bad">bad</strong> response</small></p>
  <p class="bad">
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
  </p>
</figure>

<style>
  figure {
    /* display: flex; */
  }

  p {
    text-align: center;
  }

  .good {
    color: var(--color-green);
  }

  .bad {
    color: var(--color-red);
  }

  p.good,
  p.bad {
    margin: 0;
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
