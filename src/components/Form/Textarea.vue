<template>
  <label class="block mb-4">
    <span>{{ label }}</span>
    <textarea
      :value="value"
      class="form-textarea mt-1 block w-full shadow-sm"
      rows="4"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
    ></textarea>
  </label>
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
    errorMessage: {
      type: String,
      default: null,
    },
  },
};
</script>
