<template>
  <div>
    <div class="flex">
      <div id="map" style="height: 500px; width: 500px" class="mr-4"></div>
      <div class="flex-grow">
        <Panel>
          <h4 class="mb-2">Zones</h4>
          <span v-if="!zones.length">No Zones have been created</span>
          <ul v-else>
            <li v-for="zone in zones" :key="zone.id" class="mb-4">
              <div
                class="flex justify-between items-center"
                @mouseenter="highlightZone(zone)"
                @mouseleave="resetZoneColor(zone)"
              >
                <div>
                  <span class="block text-xs font-bold text-gray-700">
                    Zone
                  </span>
                  <span>{{ zone.title }}</span>
                </div>
                <div>
                  <Button @click="selectedZone = zone">
                    Edit
                  </Button>
                </div>
              </div>
            </li>
          </ul>
        </Panel>
        <Panel class="my-4 text-right">
          <Alert
            v-if="error"
            type="error"
            message="Something went wrong"
            inline
            persistent
          />
          <Button
            class="mr-2"
            color="red"
            :disabled="loading"
            @click="startDeleteZones"
          >
            Delete All Zones
          </Button>
          <Button :loading="loading" @click="saveZones">Save Changes</Button>
        </Panel>
      </div>
    </div>
    <ZoneOptions
      v-model="selectedZone"
      :polygon-options="polygonOptions"
      @delete="deleteZone"
    />
    <ConfirmDeleteZones v-model="confirmDelete" @confirmed="deleteZones" />
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import { isEmpty } from 'lodash-es';
import { getRandomColor, basicColorsArray } from '@/lib/colors';
import asyncForEach from '@/lib/asyncForEach';
import snacktime from '@/lib/snacktime';
import map from '@/mixins/map';
import Alert from './Alert';
import Button from './Button';
import ConfirmDeleteZones from './ConfirmDeleteZones';
import Panel from './Panel';
import ZoneOptions from './ZoneOptions';

export default {
  name: 'Map',
  components: { Alert, Button, ConfirmDeleteZones, Panel, ZoneOptions },
  mixins: [map],
  data() {
    return {
      drawingManager: null,
      error: false,
      confirmDelete: false,
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
      polygon.set('_color', polygon.get('fillColor'));

      this.selectedZone = polygon;

      this.zones.push(polygon);

      this.drawingManager.setOptions(this.drawingManagerOptions());
    },
    async deleteZone(deletedZone) {
      deletedZone.setMap(null);
      this.zones = this.zones.filter(zone => zone.id !== deletedZone.id);
    },
    startDeleteZones() {
      this.confirmDelete = true;
    },
    async deleteZones() {
      this.zones.forEach(zone => {
        zone.setMap(null);
      });
      this.zones = [];
      await ipcRenderer.invoke('clearZones');
    },
    async saveZones() {
      this.loading = true;
      this.error = false;
      try {
        await ipcRenderer.invoke('clearZones');
        await asyncForEach(this.zones, async zone => {
          const serializedZone = {
            id: zone.get('id'),
            title: zone.get('title'),
            description: zone.get('description'),
            _color: zone.get('_color'),
            paths: zone
              .getPaths()
              .getArray()
              .map(path => path.getArray().map(latLng => latLng.toJSON())),
          };
          await ipcRenderer.invoke(
            'setZone',
            serializedZone.id,
            serializedZone
          );
        });
        snacktime({
          type: 'success',
          message: 'Successfully saved zones',
        });
      } catch {
        this.error = true;
      }
      this.loading = false;
    },
  },
};
</script>
