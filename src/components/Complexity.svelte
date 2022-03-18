<script>
  import { max, extent } from "d3";
  import Scatter from "$components/Scatter.svelte";
  export let propY;
  export let data;
  export let exclude;
  export let hide;

  const propX = "age";

  const domainY = extent(data, (d) => d[propY]);
  const maxX = max(data, (d) => d[propX]);
  const domainX = [0, maxX];

  $: render = data.filter((d) => (exclude === "on" ? !d.exclude : true));
</script>

<Scatter data={render} {domainY} {domainX} {propX} {propY} {hide} />
