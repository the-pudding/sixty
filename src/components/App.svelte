<script>
  import WIP from "$components/helpers/WIP.svelte";
  import Slider from "$components/helpers/Slider.svelte";
  import Slide from "$components/helpers/Slider.Slide.svelte";
  import Header from "$components/Header.svelte";
  import copy from "$data/doc.json";

  let slider;
</script>

<!-- <WIP /> -->

<Slider bind:this={slider} duration="400ms">
  <Slide>
    <div class="inner" id="intro">
      <Header />
      <h1>{copy.hed}</h1>
      <p><button on:click={slider.next}>{copy.introButton}</button></p>
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

  #intro p {
    margin-top: 2em;
    text-align: center;
  }

  #intro button {
    width: 6em;
    height: 6em;
    border-radius: 50%;
    font-weight: bold;
  }
</style>
