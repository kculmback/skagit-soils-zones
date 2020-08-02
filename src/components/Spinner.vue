<template>
  <div class="spinner" :style="{ width: width + 'px', zIndex }">
    <svg
      :style="{ width: width + 'px' }"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="path"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    width: {
      type: [String, Number],
      default: 50,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="css">
.spinner {
  line-height: 1;
}

.spinner svg {
  animation: rotator 1.4s linear infinite;
}

.spinner .path {
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

@keyframes colors {
  0% {
    stroke: theme('colors.white');
  }
  25% {
    stroke: theme('colors.gray.100');
  }
  50% {
    stroke: theme('colors.gray.200');
  }
  75% {
    stroke: theme('colors.gray.300');
  }
  100% {
    stroke: theme('colors.gray.400');
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
}
</style>
