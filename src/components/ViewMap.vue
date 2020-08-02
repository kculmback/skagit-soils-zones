<template>
  <div>
    <div class="flex">
      <div id="map" style="height: 500px; width: 500px" class="mr-4"></div>
      <div class="flex-grow">
        <Panel>
          <Input
            v-model="address"
            label="Address"
            placeholder="13260 Ball Rd, Mt Vernon, WA 98273"
          />
          <Button :loading="loading" @click="checkAddress">
            Check Address
          </Button>
          <Alert
            v-if="error"
            type="error"
            message="Something went wrong"
            persistent
            inline
            class="mt-4 mb-0"
          />
          <Alert
            v-if="notFound"
            type="error"
            message="Could not find zone associated with address"
            persistent
            inline
            class="mt-4 mb-0"
          />
        </Panel>
        <Panel
          v-if="selectedZone"
          class="my-4"
          @mouseenter="highlightZone(selectedZone)"
          @mouseleave="resetZoneColor(selectedZone)"
        >
          <div>
            <span class="text-xs font-bold text-gray-700">Zone</span>
            <p>{{ selectedZone.title }}</p>
          </div>
          <div>
            <span class="text-xs font-bold text-gray-700">Description</span>
            <p>{{ selectedZone.description || 'No description enterred' }}</p>
          </div>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script>
import map from '@/mixins/map';
import Input from './Form/Input';
import Alert from './Alert';
import Button from './Button';
import Panel from './Panel';

export default {
  name: 'ViewMap',
  components: { Input, Alert, Button, Panel },
  mixins: [map],
  data() {
    return {
      address: '',
      geocoder: new google.maps.Geocoder(),
      loading: false,
      error: false,
      notFound: false,
      foundMarker: null,
    };
  },
  methods: {
    checkAddress() {
      if (!this.address) return;

      this.loading = true;
      this.error = false;
      this.notFound = false;

      if (this.foundMarker) {
        this.foundMarker.setMap(null);
        this.foundMarker = null;
      }

      this.geocoder.geocode({ address: this.address }, (result, status) => {
        if (status === 'OK') {
          const location = result[0];
          const latLng = location.geometry.location;

          this.foundMarker = new google.maps.Marker({
            position: latLng,
            title: this.address,
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          });

          this.map.panTo(latLng);

          const foundZone = this.zones.find(zone =>
            google.maps.geometry.poly.containsLocation(latLng, zone)
          );

          if (foundZone) {
            this.selectedZone = foundZone;
          } else {
            this.notFound = true;
          }
        } else {
          this.error = true;
        }

        this.loading = false;
      });
    },
  },
};
</script>
