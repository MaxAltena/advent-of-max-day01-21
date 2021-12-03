import { readable, writable, get } from "svelte/store";
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
export const timeLeft = writable(SECONDS * duration);
export const tweenedTimeLeft = tweened(get(timeLeft), {
  duration: 1000,
  easing: linear,
});

const completeTimer = async () => {
  const audio = new Audio("/sounds/alert.mp3");
  await audio.play();

  alert("Time is up!");
};

timeLeft.subscribe((timeLeft) => {
  isTimerRunning.update((newIsTimerRunning) => {
    if (timeLeft <= 0 && newIsTimerRunning) {
      completeTimer();

      return false;
    }

    return newIsTimerRunning;
  });

  console.log(timeLeft);

  tweenedTimeLeft.set(timeLeft);
});

isTimerRunning.subscribe((newIsTimerRunning) => {
  if (newIsTimerRunning) {
    isEditing.set(false);

    if (get(timeLeft) <= 0) {
      return;
    }

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
