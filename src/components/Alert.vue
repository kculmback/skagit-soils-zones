<template>
  <div
    v-if="persistent || inline || open"
    class="app-alert"
    :class="alertClasses"
  >
    <div v-if="!isDefault" class="app-alert__icon">
      <i class="fas" :class="icon"></i>
    </div>
    <div class="app-alert__content">
      <div class="app-alert__message">
        <slot>
          <span>{{ message }}</span>
        </slot>
      </div>
      <div class="app-alert__description">
        <slot name="description">
          <span v-if="description">
            {{ description }}
          </span>
        </slot>
      </div>
    </div>
    <button
      v-if="!persistent && !inline"
      class="app-alert__close"
      @click="open = false"
    >
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    value: {
      type: Boolean,
      default: null,
    },
    type: {
      type: String,
      validator: value =>
        ['default', 'error', 'info', 'success', 'warning'].includes(value),
      default: 'default',
    },
    message: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    light: Boolean,
    inline: Boolean,
    persistent: Boolean,
  },
  data() {
    return {
      internalOpen: true,
    };
  },
  computed: {
    open: {
      get() {
        return this.value || this.internalOpen;
      },
      set(value) {
        if (this.value !== null) {
          this.$emit('input', value);
        } else {
          this.internalOpen = value;
        }
      },
    },
    isDefault() {
      return this.type === 'default';
    },
    alertClasses() {
      let classes = `app-alert--${this.type}`;

      if (this.light) classes += ' app-alert--light';
      if (this.inline) classes += ' app-alert--inline';
      if (this.description) classes += ' app-alert--description';

      return classes;
    },
    icon() {
      switch (this.type) {
        case 'error':
          return 'fa-exclamation-circle';
          break;

        case 'info':
          return 'fa-info-circle';
          break;

        case 'success':
          return 'fa-check-circle';
          break;

        case 'warning':
          return 'fa-exclamation-triangle';
          break;

        default:
          return '';
          break;
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.app-alert {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  border-left-width: 5px;
  border-left-style: solid;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.06);

  & .app-alert__icon,
  & .app-alert__close {
    flex: 0 1 auto;
    font-size: 1.25rem;
  }

  & .app-alert__icon {
    margin-right: 0.75rem;
  }

  & .app-alert__close {
    padding: 0 0.5rem;
  }

  & .app-alert__content {
    flex: 1 1 auto;
    font-weight: 400;
  }

  & .app-alert__message {
    font-size: 0.875rem;
    line-height: 1.3125;
  }

  & .app-alert__description {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  & .app-alert--description {
    & .app-alert__message {
      font-weight: bold;
    }
  }

  & .app-alert--default {
    border-left-width: 0;
  }

  &.app-alert--error {
    border-color: theme('colors.red.500');

    & .app-alert__icon,
    & .app-alert__close {
      color: theme('colors.red.500');
    }
  }

  &.app-alert--info {
    border-color: theme('colors.blue.500');

    & .app-alert__icon,
    & .app-alert__close {
      color: theme('colors.blue.500');
    }
  }

  &.app-alert--success {
    border-color: theme('colors.green.500');

    & .app-alert__icon,
    & .app-alert__close {
      color: theme('colors.green.500');
    }
  }

  &.app-alert--warning {
    border-color: theme('colors.yellow.500');

    & .app-alert__icon,
    & .app-alert__close {
      color: theme('colors.yellow.500');
    }
  }

  &.app-alert--light {
    border-left: 0;

    &.app-alert--error {
      background: theme('colors.red.300');
    }

    &.app-alert--info {
      background: theme('colors.blue.300');
    }

    &.app-alert--success {
      background: theme('colors.green.300');
    }

    &.app-alert--warning {
      background: theme('colors.yellow.300');
    }
  }

  &.app-alert--inline {
    &.app-alert {
      box-shadow: none;
      border-top-width: 1px;
      border-right-width: 1px;
      border-bottom-width: 1px;
    }
  }
}
</style>
