<template>
  <button
    class="py-2 px-4 rounded text-white transition-colors duration-300"
    :class="`bg-${color}-600 hover:bg-${color}-800`"
    :type="type"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <Spinner v-if="loading" width="24" />
    <slot v-else />
  </button>
</template>

<script>
import Spinner from './Spinner';

export default {
  name: 'Button',
  components: { Spinner },
  props: {
    type: {
      type: String,
      default: 'button',
    },
    loading: Boolean,
    color: {
      type: String,
      default: 'green',
    },
  },
};
</script>
