import { getRandomColor, basicColorsArray } from '@/lib/colors';

export default {
  data() {
    return {
      loading: false,
      map: null,
      skagitSoils: { lat: 48.4530792, lng: -122.4388351 },
      skagitSoilsMarker: null,
      zones: [],
      selectedZone: null,
    };
  },
  async mounted() {
    this.loading = true;
    this.preMap();
    this.initMap();
    this.initMarker();
    await this.initZones();
    this.postMap();
    this.loading = false;
  },
  methods: {
    preMap() {},
    postMap() {},
    polygonOptions(fillColor) {
      return {
        fillColor: fillColor || getRandomColor(basicColorsArray),
        fillOpacity: 0.5,
      };
    },
    async initZones() {
      const zones = Object.values(await ipcRenderer.invoke('getZones'));

      if (!zones.length) return;

      zones.forEach(({ id, title, description, _color, paths }) => {
        const zone = new google.maps.Polygon({
          ...this.polygonOptions(_color),
          paths,
          map: this.map,
        });

        zone.set('id', id);
        zone.set('title', title);
        zone.set('description', description);
        zone.set('_color', _color);

        this.zones.push(zone);
      });
    },
    initMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.skagitSoils,
        zoom: 12,
        streetViewControl: false,
      });
    },
    initMarker() {
      this.skagitSoilsMarker = new google.maps.Marker({
        position: this.skagitSoils,
        title: 'Skagit Soils',
        map: this.map,
      });
    },
    highlightZone(zone) {
      zone.setOptions({
        ...this.polygonOptions('red'),
        fillOpacity: 0.9,
      });
    },
    resetZoneColor(zone) {
      zone.setOptions(this.polygonOptions(zone.get('_color')));
    },
  },
};
