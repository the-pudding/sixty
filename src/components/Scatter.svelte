<script>
  import { scaleLinear, line } from "d3";
  import { interpolatePath } from "d3-interpolate-path";
  import regressionLoess from "$utils/loess";
  export let data;
  export let propX;
  export let propY;
  export let domainX;
  export let domainY;
  export let showValues;
  export let showTrend;
  export let showExample;
  export let showBad;
  export let userData;
  export let r = 0.01;

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
          <line x1="0" x2="0" y1={-marginHalf / 2} y2={-1 + margin + marginHalf / 2} />
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

  {#if showValues}
    <g class="dots" transform="translate({marginHalf}, {marginHalf})">
      {#each data as d (d.id)}
        {@const cx = scaleX(d[propX])}
        {@const cy = scaleY(d[propY])}
        <circle
          {cx}
          {cy}
          {r}
          class:exclude={showBad && d.exclude}
          class:highlight={d.highlight && showExample}
        />
      {/each}
    </g>
  {/if}

  {#if userData}
    <g class="user-dot" transform="translate({marginHalf}, {marginHalf})">
      <circle cx={scaleX(userData[propX])} cy={scaleY(userData[propY])} {r} class="user" />
    </g>
  {/if}

  {#if showTrend}
    <g class="smooth" transform="translate({marginHalf}, {marginHalf})">
      <path d={path} />
      <path d={path} />
    </g>
  {/if}

  {#if showExample}
    <g class="examples" transform="translate({marginHalf}, {marginHalf})">
      {#each data.filter((d) => d.highlight) as d (d.id)}
        {@const x = scaleX(d[propX])}
        {@const y = scaleY(d[propY])}
        <text {x} {y} dy={-0.015} text-anchor="middle">{d.highlight}</text>
      {/each}
    </g>
  {/if}
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

  .highlight {
    fill: var(--color-red);
  }

  .user {
    fill: var(--color-green);
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
