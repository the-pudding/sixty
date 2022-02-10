<script>
  import WIP from "$components/helpers/WIP.svelte";
  import Slider from "$components/helpers/Slider.svelte";
  import Slide from "$components/helpers/Slider.Slide.svelte";
  import Header from "$components/Header.svelte";
  import copy from "$data/doc.json";
</script>

<!-- <WIP /> -->

<Slider>
  <Slide>
    <div class="inner">
      <Header />
      <h1>{copy.hed}</h1>
      <button>{copy.introButton}</button>
      <small class="note">{copy.introNote}</small>
    </div>
  </Slide>
  <Slide><p>test</p></Slide>
</Slider>

<style>
  .note {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
