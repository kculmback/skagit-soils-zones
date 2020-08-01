<template>
  <div v-if="!!zone" class="zone">
    <div class="fixed inset-0 flex justify-center items-center">
      <div class="w-9/12 h-9/12 bg-white shadow-lg rounded">
        <div class="p-8">
          <div>ID: {{ zone.id }}</div>
          <div class="my-4">
            <label>
              <span class="block">Title</span>
              <input v-model="title" class="shadow w-full" type="text" />
            </label>
          </div>
          <div class="my-4">
            <label>
              <span class="block">Description</span>
              <textarea
                v-model="description"
                class="shadow w-full"
                rows="5"
              ></textarea>
            </label>
          </div>
          <div class="flex justify-between">
            <div>
              <button
                type="button"
                class="bg-gray-300 px-6 py-2 rounded mr-2"
                @click="cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                class="bg-blue-300 px-6 py-2 rounded"
                @click="saveZone"
              >
                Save
              </button>
            </div>
            <button
              type="button"
              class="bg-red-300 px-6 py-2 rounded"
              @click="deleteZone"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZoneOptions',
  model: {
    prop: 'zone',
    event: 'update',
  },
  props: {
    zone: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      title: '',
      description: '',
    };
  },
  watch: {
    zone(value) {
      if (!value) return;
      this.title = value.get('title');
      this.description = value.get('description');
    },
  },
  methods: {
    close() {
      this.$emit('update', null);
    },
    cancel() {
      this.title = '';
      this.description = '';
      this.close();
    },
    saveZone() {
      this.zone.set('title', this.title);
      this.zone.set('description', this.description);
      this.cancel();
    },
    deleteZone() {
      this.zone.setMap(null);
      this.$emit('delete', this.zone.id);
      this.cancel();
    },
  },
};
</script>
