<template>
  <li
    class="-mx-2 mb-2 font-medium bg-green-100 rounded-lg transition-colors duration-300 hover:bg-green-300 cursor-pointer"
  >
    <router-link
      class="block p-2 text-green-800"
      v-bind="{ ...$props, ...$attrs }"
    >
      <slot />
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'NavLink',
};
</script>
