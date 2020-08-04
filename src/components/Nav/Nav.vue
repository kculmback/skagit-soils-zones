<template>
  <div id="nav" class="text-left py-4 px-6 border-r">
    <img class="w-32 mx-auto mb-4" src="../../assets/skagit-soils-logo.svg" />
    <!-- <h1 class="">Skagit Soils</h1> -->
    <nav>
      <ul>
        <NavLink :to="{ name: 'Zone Lookup' }">Zones</NavLink>
        <NavLink :to="{ name: 'Zone Edit' }">Edit Zones</NavLink>
        <NavLink :to="{ name: 'Export/Import' }">Export/Import</NavLink>
      </ul>
    </nav>
  </div>
</template>

<script>
import NavLink from './NavLink';

export default {
  name: 'Nav',
  components: { NavLink },
};
</script>
