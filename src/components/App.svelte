<script>
  import Time from "svelte-time";
  import { onMount } from "svelte";
  import WIP from "$components/helpers/WIP.svelte";
  import { supabase } from "$utils/supabase.js";
  // import Footer from "$components/Footer.svelte";

  let value;

  let messages = [];

  const sendMessage = async (message) => {
    // console.log(message);
    try {
      const { data, error } = await supabase.from("test").insert([{ message }]);
      // console.log({ data, error });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(value);
    value = "";
    return false;
  };

  onMount(() => {
    supabase
      .from("test")
      .on("INSERT", (payload) => {
        const m = payload.new;
        messages.unshift(m);
        messages = [...messages];
      })
      .subscribe();
  });
</script>

<WIP />
<!-- <Footer /> -->

<div>
  <form on:submit={onSubmit}>
    <input placeholder="enter message" bind:value />
    <button type="submit">Send</button>
  </form>
</div>

<ul>
  {#each messages as { message, created_at }}
    <li><span>{message}</span> <Time relative timestamp={created_at} /></li>
  {/each}
</ul>

<style>
  div {
    text-align: center;
    margin: 2em auto;
  }

  input,
  button {
    font-size: 2em;
    padding: 0.5em;
  }

  ul {
    width: 30em;
    margin: 0 auto;
  }

  li {
    font-size: 2em;
    list-style-type: none;
  }

  :global(time) {
    color: var(--color-gray-500);
    font-size: 0.5em;
  }
</style>
