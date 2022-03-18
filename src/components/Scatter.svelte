<script>
  import { scaleLinear, line } from "d3";
  import { interpolatePath } from "d3-interpolate-path";
  import regressionLoess from "$utils/loess";
  export let data;
  export let propX;
  export let propY;
  export let domainX;
  export let domainY;
  export let r = 0.01;
  export let hide;

  const bandwidth = 0.75;
  const margin = r * 8;
  const marginHalf = margin * 0.75;

  const scaleX = scaleLinear()
    .domain(domainX)
    .range([0, 1 - margin]);

  const scaleY = scaleLinear()
    .domain(domainY)
    .range([1 - margin * 2, 0]);

  const ticksX = scaleX.ticks(10);
  const ticksY = scaleY.ticks(5);

  const lineGenerator = line()
    .x((d) => scaleX(d[0]))
    .y((d) => scaleY(d[1]));

  const lineLoess = regressionLoess()
    .x((d) => d[propX])
    .y((d) => d[propY])
    .bandwidth(bandwidth);

  const animate = () => {
    t += 0.05;
    path = interpolator(t);
    if (t < 1) requestAnimationFrame(animate);
  };

  let curTrend;
  let path;
  let interpolator;
  let t;

  $: {
    const prevTrend = curTrend;
    curTrend = lineGenerator(lineLoess(data));
    if (prevTrend) {
      t = 0;
      interpolator = interpolatePath(prevTrend, curTrend);
      animate();
    } else path = curTrend;
  }
</script>

<svg viewbox="0 0 1 1">
  <g class="axis">
    <g class="axis-x" transform="translate({marginHalf}, {-marginHalf})">
      {#each ticksX as tick}
        {@const x = scaleX(tick)}
        <g class="tick" transform="translate({x}, 1)">
          <line x1="0" x2="0" y1={-marginHalf} y2={-1 + marginHalf} />
          <text x="0" y="0" text-anchor="middle">{tick}</text>
        </g>
      {/each}
    </g>

    <g class="axis-y" transform="translate({marginHalf}, {marginHalf})">
      {#each ticksY as tick}
        {@const y = scaleY(tick)}
        <g class="tick" transform="translate(0, {y})">
          <line x1={marginHalf / 2} x2={1 - marginHalf} y1="0" y2="0" />
          <text x="0" y="0.008" text-anchor="end">{tick}</text>
        </g>
      {/each}
    </g>

    <text x="0.5" y={1 - 0.01} text-anchor="middle">{propX}</text>
  </g>

  {#if !hide}
    <g class="dots" transform="translate({marginHalf}, {marginHalf})">
      {#each data as d (d.id)}
        {@const cx = scaleX(d[propX])}
        {@const cy = scaleY(d[propY])}
        <circle {cx} {cy} {r} class:exclude={d.exclude} />
      {/each}
    </g>
  {/if}

  <g class="smooth" transform="translate({marginHalf}, {marginHalf})">
    <path d={path} />
    <path d={path} />
  </g>
</svg>

<style>
  svg {
    display: block;
  }

  circle {
    stroke-width: 0.001;
    stroke: var(--color-gray-400);
    fill: var(--color-gray-100);
  }

  .exclude {
    stroke: var(--color-gray-600);
    fill: var(--color-gray-400);
  }

  text {
    font-size: 0.001em;
    text-transform: capitalize;
  }

  line {
    stroke: var(--color-gray-500);
    stroke-width: 0.001;
    stroke-dasharray: 0.0002em 0.0002em;
  }

  path {
    fill: none;
    stroke: var(--color-red);
    stroke-width: 0.005;
    stroke-linecap: square;
  }

  path:first-of-type {
    stroke-width: 0.007;
    stroke: var(--color-gray-900);
  }

  .axis-x .tick:first-of-type {
    display: none;
  }
</style>
