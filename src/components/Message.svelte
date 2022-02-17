<script>
  import Time from "svelte-time";
  import { onMount } from "svelte";
  import { supabase } from "$utils/supabase.js";
  const table = "readers";
  let channel = 0;
  let value;

  let messages = [];

  const sendMessage = async (message) => {
    // console.log(message);
    try {
      const { data, error } = await supabase.from(table).insert([{ message, channel }]);
      // const { data, error } = await supabase.from(table).delete().match({ id: 13 });
      console.log({ data, error });
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
    channel = Math.floor(Math.random() * 2);
    console.log("channel", channel);
    supabase
      .from(`${table}:channel=eq.${channel}`)
      .on("INSERT", (payload) => {
        const m = payload.new;
        messages.unshift(m);
        messages = [...messages];
      })
      .subscribe();
  });
</script>

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
