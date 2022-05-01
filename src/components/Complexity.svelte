<script>
  import { max, extent } from "d3";
  import Scatter from "$components/Scatter.svelte";
  export let propY;
  export let data;
  export let exclude;
  export let showValues;
  export let showTrend;
  export let showExample;
  export let showUniform;
  export let showBad;
  export let userData;
  export let domainY = extent(data, (d) => d[propY]);
  export let loess;

  const propX = "age";
  const maxX = 92;
  const domainX = [0, maxX];

  $: render = data.filter((d) => (exclude ? !d.exclude : true));
</script>

<Scatter
  data={render}
  {domainY}
  {domainX}
  {propX}
  {propY}
  {showValues}
  {showTrend}
  {showExample}
  {showUniform}
  {showBad}
  {userData}
  {exclude}
  {loess}
/>
