<script lang="ts">
  import { isEditing, isTimerRunning } from "./store";
  import { crossfade } from "svelte/transition";
  import { sineInOut } from "svelte/easing";

  const [send, receive] = crossfade({
    duration: 500,
    easing: sineInOut,
  });
</script>

<div class="actions">
  {#if $isTimerRunning}
    <button
      in:send={{ key: "stop" }}
      out:receive={{ key: "start" }}
      on:click={() => isTimerRunning.set(false)}
      class="stop">Stop</button
    >
  {:else}
    <button
      in:send={{ key: "start" }}
      out:receive={{ key: "stop" }}
      on:click={() => isTimerRunning.set(true)}
      class="start">Start</button
    >
  {/if}

  <button
    class="settings"
    on:click={() => isEditing.set(!$isEditing)}
    data-is-editing={$isEditing}
  >
    <img src="images/gear.svg" alt="Settings" />
  </button>
</div>

<style>
  .actions {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    z-index: 1;
  }

  button {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    user-select: none;
  }

  .start,
  .stop {
    bottom: 10px;
    position: absolute;
    color: var(--foreground);
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: 0.6rem;
    margin-inline-end: -0.6rem;
    text-align: center;
  }

  .settings {
    position: absolute;
    top: 10px;
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
  }

  .settings img {
    /* Fix some spacing issues in svg */
    padding: 8px 4px 0 4px;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    transition: opacity 150ms ease-in-out;
    -webkit-user-drag: none;
  }

  .settings:not(:hover) img {
    opacity: 0.4;
  }

  .settings[data-is-editing="true"] img {
    opacity: 0.8;
  }
</style>
