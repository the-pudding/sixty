<script>
  import { browser } from "$app/env";
  import Meta from "$components/Meta.svelte";
  import App from "$components/App.svelte";
  import copy from "$data/doc.json";
  if (browser) console.log("svelte-starter version", __VERSION__);

  const preloadFont = [
    "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
    "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
    "https://pudding.cool/assets/fonts/national/National2Web-Regular.woff2",
    "https://pudding.cool/assets/fonts/national/National2Web-Bold.woff2"
  ];
</script>

<Meta
  title={copy.title}
  description={copy.description}
  url={copy.url}
  {preloadFont}
  keywords={copy.keywords}
/>
<App />
