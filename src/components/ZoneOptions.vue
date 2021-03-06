<template>
  <div v-if="!!zone" class="zone">
    <div class="fixed inset-0 flex justify-center items-center">
      <div class="w-9/12 h-9/12 bg-white shadow-lg rounded">
        <div class="p-8">
          <Input v-model="title" label="Title" :error-message="titleError" />
          <label class="block mb-4">
            <span class="block">Color</span>
            <verte
              v-model="color"
              class="justify-start"
              picker="square"
              model="hex"
              :enable-alpha="false"
            />
          </label>
          <Textarea v-model="description" label="Description" />
          <div class="flex justify-between">
            <div>
              <Button
                color="gray"
                class="mr-2"
                :class="{ 'cursor-not-allowed': !title || !color }"
                :disabled="!title || !color"
                @click="cancel"
              >
                Cancel
              </Button>
              <Button @click="saveZone">
                Save
              </Button>
            </div>
            <Button color="red" @click="deleteZone">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Verte from 'verte';
import Button from './Button';
import Input from './Form/Input';
import Textarea from './Form/Textarea';

export default {
  name: 'ZoneOptions',
  components: { Button, Input, Textarea, Verte },
  model: {
    prop: 'zone',
    event: 'update',
  },
  props: {
    zone: {
      type: Object,
      default: null,
    },
    polygonOptions: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      title: '',
      titleError: null,
      color: '',
      colorError: null,
      description: '',
    };
  },
  watch: {
    zone(value) {
      if (!value) return;
      this.color = value.get('_color');
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
      this.color = '';
      this.description = '';
      this.close();
    },
    validate() {
      let valid = true;

      if (!this.title) {
        valid = false;
        this.titleError = 'Title is required';
      }

      if (!this.color) {
        valid = false;
        this.colorError = 'Color is required';
      }

      return valid;
    },
    saveZone() {
      if (!this.validate()) return;

      this.zone.setOptions(this.polygonOptions(this.color));
      this.zone.set('title', this.title);
      this.zone.set('description', this.description);
      this.zone.set('_color', this.color);
      this.cancel();
    },
    deleteZone() {
      this.$emit('delete', this.zone);
      this.cancel();
    },
  },
};
</script>
