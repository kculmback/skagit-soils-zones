<template>
  <div>
    <div class="flex">
      <div id="map" style="height: 500px; width: 500px"></div>
    </div>
    <div>
      <label class="my-4">
        <span class="block">Address</span>
        <input
          v-model="address"
          class="shadow"
          type="text"
          @change="checkAddress"
        />
      </label>
    </div>
    <div
      v-if="selectedZone"
      class="my-4"
      @mouseenter="highlightZone(selectedZone)"
      @mouseleave="resetZoneColor(selectedZone)"
    >
      <p>{{ selectedZone.id }}</p>
      <p>{{ selectedZone.title }}</p>
      <p>{{ selectedZone.description }}</p>
    </div>
  </div>
</template>

<script>
import map from '@/mixins/map';

export default {
  name: 'ViewMap',
  mixins: [map],
  data() {
    return {
      address: '',
      geocoder: new google.maps.Geocoder(),
    };
  },
  methods: {
    checkAddress() {
      this.geocoder.geocode({ address: this.address }, (result, status) => {
        if (status !== 'OK') return;
        const found = this.zones.find(zone =>
          google.maps.geometry.poly.containsLocation(
            result[0].geometry.location,
            zone
          )
        );
        if (!found) return;
        this.selectedZone = found;
      });
    },
  },
};
</script>
