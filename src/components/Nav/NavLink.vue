<template>
  <li
    class="-mx-2 mb-2 font-medium rounded-lg transition-colors duration-300 hover:bg-gray-300 cursor-pointer"
  >
    <router-link
      class="block p-2 text-gray-800 hover:text-gray-800"
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
