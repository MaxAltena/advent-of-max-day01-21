<script lang="ts">
  import { time, timerElement } from "./store";
  import { PI } from "./constants";

  $: timeFraction = () => $time.left / $time.limit;
  $: isComplete = () => $time.left <= 0;
  $: strokeDasharray = () => {
    const elementDiameter = ($timerElement.width + $timerElement.height) / 2;
    const elementDiameterMinusStrokeWidth = elementDiameter - 10;
    const circleBorder = elementDiameterMinusStrokeWidth * PI;

    return `${timeFraction() * circleBorder} ${circleBorder}`;
  };
</script>

<svg class="progress" data-complete={isComplete()}>
  <g>
    <circle class="circle" r="50%" cx="50%" cy="50%" fill="none" />
    <circle
      class="circle--remaining"
      r="50%"
      cx="50%"
      cy="50%"
      fill="none"
      stroke-dasharray={strokeDasharray()}
    />
  </g>
</svg>

<style>
  .progress {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    user-select: none;
  }

  .circle {
    stroke: hsl(var(--background-h) var(--background-s) 14%);
    stroke-width: 10px;
    r: calc(50% - calc(10px / 2));
    transition: stroke 500ms ease-in-out;
  }

  .circle--remaining {
    stroke: var(--green);
    stroke-width: 10px;
    r: calc(50% - calc(10px / 2));
    transition: stroke-dasharray 1s linear, opacity 500ms ease-in-out;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    will-change: stroke-dasharray;
  }

  [data-complete="true"] .circle {
    stroke: var(--red);
  }

  [data-complete="true"] .circle--remaining {
    opacity: 0;
  }
</style>
