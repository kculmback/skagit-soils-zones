<template>
  <div class="home">
    <h2>Zones</h2>
    <Map />
  </div>
</template>

<script>
import Map from '@/components/ViewMap';

export default {
  name: 'ZoneLookup',
  components: { Map },
};
</script>
