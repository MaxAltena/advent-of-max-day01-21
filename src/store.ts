import { readable, writable } from "svelte/store";
import { SECONDS } from "./constants";
import { tweened } from "svelte/motion";
import { linear } from "svelte/easing";

const duration = 25; // in minutes
const timerObject = writable(undefined);

export const isTimerRunning = writable(true);
export const isEditing = writable(false);
export const timerElement = writable({
  width: undefined,
  height: undefined,
});
export const timeLimit = readable(SECONDS * duration);
export const timePassed = writable(0);
export const timeLeft = tweened(SECONDS * duration, {
  duration: 1000,
  easing: linear,
});

timeLeft.subscribe((timeLeft) => {
  isTimerRunning.update((newIsTimerRunning) => {
    if (timeLeft <= 0 && newIsTimerRunning) {
      alert("Time is up!");

      return false;
    }

    return newIsTimerRunning;
  });
});

isTimerRunning.subscribe((newIsTimerRunning) => {
  if (newIsTimerRunning) {
    isEditing.set(false);

    timerObject.update((value) =>
      setInterval(() => {
        timeLeft.update((timeLeft) => timeLeft - 1);
        timePassed.update((timePassed) => timePassed + 1);
      }, 1000)
    );
  } else {
    timerObject.update((value) => clearInterval(value));
  }
});

isEditing.subscribe((newIsEditing) => {
  isTimerRunning.update((value) => {
    if (newIsEditing) {
      return false;
    }

    return value;
  });
});
