<template>
  <div class="snackbar">
    <transition name="snackbar">
      <Alert
        v-if="snackbar"
        v-model="snackbar"
        :type="type"
        :message="message"
        :description="description"
        v-bind="alertOptions"
      />
    </transition>
  </div>
</template>

<script>
import EventBus from '@/lib/EventBus';
import Alert from './Alert';

export default {
  name: 'Snackbar',
  components: { Alert },
  data() {
    return {
      snackbar: false,
      type: 'info',
      timeout: 10000,
      message: '',
      description: '',
      alertOptions: null,
    };
  },
  created() {
    EventBus.$on('snacktime', this.updateSnackbar);
  },
  methods: {
    updateSnackbar(options) {
      const {
        color = 'info',
        type,
        timeout = 10000,
        persistent,
        message,
        description,
        ...additional
      } = options;

      this.type = type || color;
      this.timeout = timeout;
      this.message = message;
      this.description = description;
      this.alertOptions = additional;

      this.snackbar = true;

      if (!persistent) {
        this.initTimeout();
      }
    },

    initTimeout() {
      setTimeout(() => {
        this.snackbar = false;
      }, this.timeout);
    },
  },
};
</script>

<style lang="postcss" scoped>
.snackbar {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  max-width: 30rem;
  width: 100%;
  z-index: 9000;

  & .snackbar-enter-active,
  & .snackbar-leave-active {
    transition: opacity 250ms, transform 250ms;
  }

  & .snackbar-enter,
  & .snackbar-leave-to {
    opacity: 0;
    transform: translateX(2rem);
  }
}
</style>
