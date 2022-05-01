<script>
  import { groups, format } from "d3";
  import { readerData } from "$stores/misc.js";
  $: exclude = $readerData.results.filter((d) => d.exclude);
  $: console.table(exclude);
  $: ratio = format(".2%")(exclude.length / $readerData.results.length);
</script>

<p>{ratio}</p>
