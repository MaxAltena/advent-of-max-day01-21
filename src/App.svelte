<script lang="ts">
  import Progress from "./Progress.svelte";
  import Time from "./Time.svelte";
  import Actions from "./Actions.svelte";

  import { timerElement } from "./store";
</script>

<main>
  <div
    class="timer"
    bind:clientWidth={$timerElement.width}
    bind:clientHeight={$timerElement.height}
  >
    <Actions />

    <Time />

    <Progress />
  </div>
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  }

  .timer {
    position: relative;
    aspect-ratio: 1 / 1;
    min-width: calc(25vh + 25vw);
    min-height: calc(25vh + 25vw);
    max-height: 90%;
    max-width: 90%;
    padding: 10%;
    border-radius: 50%;
    background: var(--background);
    box-shadow: -5px 14px 44px #000000, 5px -16px 50px rgba(255, 255, 255, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
  }
</style>
