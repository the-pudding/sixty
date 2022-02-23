<script>
  import { createEventDispatcher } from "svelte";
  import { user } from "$stores/misc.js";

  export let overline;
  export let guess;
  export let question;

  const dispatch = createEventDispatcher();
  const age = "over 60";

  const onClick = (e) => {
    const val = e.target.value;
    $user.rightwrong = val;
    dispatch("next");
  };

  // TODO
  const getGuess = () => {
    $user.guess = "";
  };
</script>

<p>{overline}</p>
<p>{guess} {age}.</p>
<p>{question}</p>

<div>
  <button value="right" on:click={onClick}>Yes 🤯</button>
  <button value="wrong" on:click={onClick}>No 🥱</button>
</div>
