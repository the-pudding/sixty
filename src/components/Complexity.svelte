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

  const propX = "age";
  // console.log(domainY);
  const maxX = 92;
  const domainX = [0, maxX];

  $: render = data.filter((d) => (exclude ? d[propY] !== domainY[0] : true));
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
/>
