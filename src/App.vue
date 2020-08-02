<template>
  <div id="app" class="h-full font-sans text-gray-800">
    <div class="flex h-full">
      <Nav class="h-full" />
      <router-view class="h-full flex-grow py-4 px-6 bg-gray-200" />
    </div>
    <Snackbar />
  </div>
</template>

<script>
import Nav from '@/components/Nav/Nav';
import Snackbar from '@/components/Snackbar';
export default {
  name: 'App',
  components: { Nav, Snackbar },
};
</script>

<style>
@import './css/main.pcss';
</style>
