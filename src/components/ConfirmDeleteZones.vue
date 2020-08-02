<template>
  <div v-if="open">
    <div class="fixed inset-0 flex justify-center items-center">
      <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div class="relative w-4/12 bg-white shadow-lg rounded">
        <div class="p-8 text-center">
          <p>Are you sure you want to delete <em>all</em> zones?</p>
          <div class="flex justify-center">
            <Button class="mr-2" @click="close">Cancel</Button>
            <Button color="red" @click="confirm">Yes</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button';

export default {
  name: 'ConfirmDeleteZones',
  components: { Button },
  model: {
    event: 'change',
    prop: 'open',
  },
  props: {
    open: Boolean,
  },
  methods: {
    close() {
      this.$emit('change', false);
    },
    confirm() {
      this.$emit('confirmed');
      this.close();
    },
  },
};
</script>
