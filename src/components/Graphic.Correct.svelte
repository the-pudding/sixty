<script>
  import { onMount } from "svelte";
  import { jumped, readerData } from "$stores/misc.js";

  const expected = 53;
  const dynamic = [
    "Not as good as we had expected 😔",
    "Pretty much what we had expected 🙂",
    "Better than what we had expected 😀"
  ];

  let correct = 0;
  let i = 0;

  const getRate = async () => {
    const a = $readerData.correct;
    const b = $readerData.total;
    correct = Math.round((a / b) * 100);
    const diff = correct - expected;
    i = diff > 3 ? 2 : diff > -3 ? 1 : 0;
  };

  $: if ($jumped && correct === 0) getRate();
  $: text = dynamic[i];
</script>

<p>
  As for our initial idea to make an age-guessing game, we have guessed right <mark>{correct}%</mark
  >
  of the time. {text}.
</p>
