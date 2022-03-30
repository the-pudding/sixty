<script>
  import { onMount } from "svelte";
  import { getTotal, getCorrect } from "$utils/supabase.js";
  import { jumped } from "$stores/misc.js";

  const expected = 53;
  const dynamic = [
    "Not as good as we had expected 😔",
    "Pretty much what we had expected 🙂",
    "Better than what we had expected 😀"
  ];

  let correct = 0;
  let i = 0;

  const getRate = async () => {
    const a = await getCorrect();
    const b = await getTotal();
    correct = Math.round((a / b) * 100);
    const diff = correct - expected;
    i = diff > 2 ? 2 : diff > -2 ? 1 : 0;
  };

  $: text = dynamic[i];
  $: if ($jumped && correct === 0) getRate();
</script>

<p>
  For what its worth, we have guessed right <mark>{correct}%</mark> of the time. {text}.
</p>
