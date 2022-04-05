<script>
  import { max, extent } from "d3";
  import Scatter from "$components/Scatter.svelte";
  export let propY;
  export let data;
  export let exclude;
  export let showValues;
  export let showTrend;
  export let showExample;
  export let showBad;
  export let userData;

  const propX = "age";

  const domainY = extent(data, (d) => d[propY]);
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
  {showBad}
  {userData}
/>
