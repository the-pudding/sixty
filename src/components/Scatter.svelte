<script>
  import { scaleLinear } from "d3";
  export let data;
  export let propX;
  export let propY;
  export let domainX;
  export let domainY;

  const r = 0.01;
  const pad = r * 2;
  const margin = pad * 2;

  const scaleX = scaleLinear()
    .domain(domainX)
    .range([margin, 1 - margin]);
  const scaleY = scaleLinear()
    .domain(domainY)
    .range([1 - margin, margin]);
</script>

<svg viewbox="0 0 1 1">
  <g transform="translate({pad}, {pad})">
    {#each data as d}
      {@const cx = scaleX(d[propX])}
      {@const cy = scaleY(d[propY])}
      <circle {cx} {cy} {r} class:exclude={d.exclude} />
    {/each}
  </g>
</svg>

<style>
  svg {
    display: block;
  }
  circle {
    fill: black;
  }
  .exclude {
    fill: red;
  }
</style>
