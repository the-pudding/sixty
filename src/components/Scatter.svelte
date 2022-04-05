<script>
  import { quadInOut } from "svelte/easing";
  import { fade } from "svelte/transition";
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

  const fadeOpts = {
    duration: 150,
    ease: quadInOut
  };

  const bandwidth = 0.75;

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
  let clientWidth;

  $: width = clientWidth;
  $: height = width;
  $: r = Math.floor(width / 100);
  $: margin = r * 10;
  $: marginHalf = margin / 2;
  $: scaleX = scaleLinear()
    .domain(domainX)
    .range([0, width - margin]);
  $: scaleY = scaleLinear()
    .domain(domainY)
    .range([height - margin * 2, 0]);
  $: ticksX = scaleX.ticks(10);
  $: ticksY = scaleY.ticks(5);
  $: rectW = 160;
  $: rectH = 24;

  $: if (clientWidth) {
    const prevTrend = curTrend;
    curTrend = lineGenerator(lineLoess(data));
    if (prevTrend) {
      t = 0;
      interpolator = interpolatePath(prevTrend, curTrend);
      animate();
    } else path = curTrend;
  }
</script>

<div bind:clientWidth>
  {#if clientWidth}
    <svg style:width="{width}px" style:height="{height}px">
      <g class="axis">
        <g class="axis-x" transform="translate({marginHalf}, {-marginHalf})">
          {#each ticksX as tick}
            {@const x = scaleX(tick)}
            <g class="tick" transform="translate({x}, {height})">
              <line x1="0" x2="0" y1={-marginHalf} y2={-height + margin - marginHalf / 2} />
              <text x="0" y="0.325em" text-anchor="middle">{tick}</text>
            </g>
          {/each}
        </g>

        <g class="axis-y" transform="translate({marginHalf}, {marginHalf})">
          {#each ticksY as tick}
            {@const y = scaleY(tick)}
            <g class="tick" transform="translate(0, {y})">
              <line x1={marginHalf / 2} x2={width - marginHalf} y1="0" y2="0" />
              <text x="0" y="0.325em" text-anchor="end">{tick}</text>
            </g>
          {/each}
        </g>

        <text x={width / 2} y={height - r} text-anchor="middle">{propX}</text>
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
        <g class="user" transform="translate({marginHalf}, {marginHalf})">
          <circle cx={scaleX(userData[propX])} cy={scaleY(userData[propY])} {r} />
        </g>
      {/if}

      {#if showTrend}
        <g
          transition:fade={fadeOpts}
          class="smooth"
          transform="translate({marginHalf}, {marginHalf})"
        >
          <path d={path} />
          <path d={path} />
        </g>
      {/if}

      {#if showExample}
        <g
          transition:fade={fadeOpts}
          class="examples"
          transform="translate({marginHalf}, {marginHalf})"
        >
          {#each data.filter((d) => d.highlight) as d (d.id)}
            {@const x = scaleX(d[propX])}
            {@const y = scaleY(d[propY])}
            <rect x={x - rectW / 2} y={y - rectH * 1.5} width={rectW} height={rectH} />
            <text {x} {y} dy={-rectH / 1.325} text-anchor="middle">{d.highlight}</text>
          {/each}
        </g>
      {/if}
    </svg>
  {/if}
</div>

<style>
  svg {
    display: block;
  }

  circle {
    stroke-width: 1px;
    stroke: var(--color-bg);
    stroke-opacity: 0;
    fill: var(--color-rose-medium);
    fill-opacity: 0.5;
  }

  .exclude {
    fill: var(--color-bad);
    fill-opacity: 1;
  }

  .highlight {
    fill: var(--color-good);
    fill-opacity: 1;
    stroke-opacity: 1;
    stroke-width: 2px;
    stroke: var(--color-fg);
  }

  .user circle {
    fill: var(--color-good);
    stroke-opacity: 1;
    fill-opacity: 1;
    stroke-width: 2px;
    stroke: var(--color-fg);
  }

  .examples rect {
    fill: var(--color-good);
    stroke: var(--color-fg);
    stroke-width: 2px;
  }

  text {
    font-size: 0.75em;
    text-transform: capitalize;
    fill: var(--color-rose-dark);
  }

  line {
    stroke: var(--color-rose-medium);
    stroke-width: 1px;
    stroke-dasharray: 5px 5px;
  }

  path {
    fill: none;
    stroke: var(--color-good);
    stroke-width: 6px;
    stroke-linecap: square;
  }

  path:first-of-type {
    stroke-width: 10px;
    stroke: var(--color-fg);
  }

  .axis-x .tick:first-of-type {
    display: none;
  }
</style>
