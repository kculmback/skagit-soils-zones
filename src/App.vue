<template>
  <div id="app" class="p-4">
    <div id="nav" class="text-center my-4">
      <router-link to="/">Home</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
@import './css/main.pcss';
</style>
