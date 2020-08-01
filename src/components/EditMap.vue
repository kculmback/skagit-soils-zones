<template>
  <div>
    <div class="flex">
      <div id="map" style="height: 500px; width: 500px"></div>
      <ul class="ml-8">
        <li v-for="zone in zones" :key="zone.id">
          <button
            @mouseenter="highlightZone(zone)"
            @mouseleave="resetZoneColor(zone)"
            @click="selectedZone = zone"
          >
            {{ zone.title }}
          </button>
        </li>
      </ul>
    </div>
    <div class="my-8">
      <button type="button" @click="save">Save</button>
    </div>
    <ZoneOptions v-model="selectedZone" @delete="deleteZone" />
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import { isEmpty } from 'lodash-es';
import ZoneOptions from './ZoneOptions';
import { getRandomColor, basicColorsArray } from '@/lib/colors';
import map from '@/mixins/map';

export default {
  name: 'Map',
  components: { ZoneOptions },
  mixins: [map],
  data() {
    return {
      drawingManager: null,
    };
  },
  methods: {
    drawingManagerOptions(fillColor) {
      return {
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON],
        },
        polygonOptions: this.polygonOptions(fillColor),
      };
    },
    polygonOptions(fillColor) {
      return {
        fillColor: fillColor || getRandomColor(basicColorsArray),
        fillOpacity: 0.5,
        clickable: true,
        editable: true,
        draggable: true,
      };
    },
    preMap() {
      this.initDrawingManager();
    },
    postMap() {
      this.drawingManager.setMap(this.map);
      this.initEventListeners();
    },
    initDrawingManager() {
      this.drawingManager = new google.maps.drawing.DrawingManager(
        this.drawingManagerOptions()
      );
    },
    initEventListeners() {
      google.maps.event.addListener(
        this.drawingManager,
        'polygoncomplete',
        this.handlePolygonComplete
      );
    },
    handlePolygonComplete(polygon) {
      polygon.set('id', uuid());
      polygon.set('title', '');
      polygon.set('description', '');

      this.selectedZone = polygon;

      this.zones.push(polygon);

      this.drawingManager.setOptions(drawingManagerOptions());
    },
    deleteZone(zoneId) {
      this.zones = this.zones.filter(zone => zone.id !== zoneId);
    },

    async save() {
      await ipcRenderer.invoke('clearZones');
      this.zones.forEach(zone => {
        const serializedZone = {
          id: zone.get('id'),
          title: zone.get('title'),
          description: zone.get('description'),
          paths: zone
            .getPaths()
            .getArray()
            .map(path => path.getArray().map(latLng => latLng.toJSON())),
        };
        ipcRenderer.invoke('setZone', serializedZone.id, serializedZone);
      });
    },
  },
};
</script>
