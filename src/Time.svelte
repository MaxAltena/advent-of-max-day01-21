<script lang="ts">
  import { isEditing, timeLeft, timerElement } from "./store";
  import { zeroPad } from "./utils";

  const onMinuteInput = (event: any) => {
    const { valueAsNumber, value } = event.target;

    if (valueAsNumber === NaN || value === "") {
      return;
    }

    const currentSeconds = $timeLeft % 60;
    const nextMinutes = valueAsNumber * 60;
    const nextLeft = currentSeconds + nextMinutes;

    timeLeft.set(nextLeft);
  };

  const onSecondInput = (event: any) => {
    const { valueAsNumber, value } = event.target;

    if (valueAsNumber === NaN || value === "") {
      return;
    }

    const currentMinutes = Math.floor($timeLeft / 60);
    const nextSeconds = valueAsNumber;
    const nextLeft = currentMinutes * 60 + nextSeconds;

    timeLeft.set(nextLeft);
  };

  $: timeLeftInMinutes = () => zeroPad(Math.floor($timeLeft / 60));
  $: timeLeftInSeconds = () => zeroPad(Math.floor($timeLeft % 60));
</script>

<div class="time">
  <input
    class="minutes"
    type={$isEditing ? "number" : "text"}
    min="0"
    max="25"
    value={timeLeftInMinutes()}
    on:input={onMinuteInput}
    readonly={!$isEditing}
  />
  <span class="colon">:</span>
  <input
    class="seconds"
    type={$isEditing ? "number" : "text"}
    min="0"
    max="59"
    value={timeLeftInSeconds()}
    on:input={onSecondInput}
    readonly={!$isEditing}
  />
</div>

<style>
  .time {
    position: absolute;
    inset: 0;
    font-family: var(--font-primary);
    text-align: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: calc(5vh + 5vw);
    line-height: calc(5vh + 5vw);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  input {
    width: calc(5vh + 5vw);
    background: none;
    border: none;
    color: currentColor;
    padding: 0;
    text-align: center;
  }

  input[readonly] {
    outline: none;
  }
</style>
