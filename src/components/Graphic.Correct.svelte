<script>
  import { onMount } from "svelte";
  import { getTotal, getCorrect } from "$utils/supabase.js";

  const expected = 53;
  const dynamic = [
    "Not as good as we had expected 😔",
    "Pretty much what we had expected 🙂",
    "Better than what we had expected 😀"
  ];

  let correct = 0;
  let i = 0;

  onMount(async () => {
    const a = await getCorrect();
    const b = await getTotal();
    correct = Math.round((a / b) * 100);
    const diff = correct - expected;
    console.log(diff);
    i = diff > 2 ? 2 : diff > -2 ? 1 : 0;
  });

  $: text = dynamic[i];
</script>

<p>
  By the way, we have guessed right <mark>{correct}%</mark> of the time so far. {text}.
</p>
