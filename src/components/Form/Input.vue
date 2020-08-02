<template>
  <div class="mb-4">
    <label class="block">
      <span>{{ label }}</span>
      <input
        :value="value"
        class="form-input mt-1 block w-full shadow-sm "
        :class="inputClasses"
        :type="type"
        v-bind="$attrs"
        @input="$emit('input', $event.target.value)"
      />
    </label>
    <span v-if="errorMessage" class="mt-2 font-sm font-medium text-red-700">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },
  computed: {
    inputClasses() {
      return {
        'border-red-500': !!this.errorMessage,
        'bg-red-100': !!this.errorMessage,
      };
    },
  },
};
</script>
