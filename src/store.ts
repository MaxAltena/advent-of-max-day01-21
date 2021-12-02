import { writable } from "svelte/store";
import { SECONDS } from "./constants";

const duration = 25; // in minutes
const timerObject = writable(undefined);

export const isTimerRunning = writable(true);
export const isEditing = writable(false);
export const timerElement = writable({
  width: undefined,
  height: undefined,
});
export const time = writable({
  limit: SECONDS * duration,
  passed: 0,
  left: SECONDS * duration,
});

time.subscribe((newTime) => {
  isTimerRunning.update((newIsTimerRunning) => {
    if (newTime.left <= 0 && newIsTimerRunning) {
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
        time.update((_time) => ({
          ..._time,
          passed: _time.passed + 1,
          left: _time.left - 1,
        }));
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
