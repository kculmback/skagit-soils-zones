<template>
  <div>
    <h2>Export/Import</h2>
    <Panel class="mb-4">
      <Button @click="exportData">Export</Button>
    </Panel>
    <Panel>
      <Button @click="triggerImportData">Import</Button>
      <input ref="fileUpload" type="file" hidden @change="importData" />
    </Panel>
  </div>
</template>

<script>
import Button from '@/components/Button';
import Panel from '@/components/Panel';
import snacktime from '../lib/snacktime';

export default {
  name: 'ExportImport',
  components: { Button, Panel },
  data() {
    return {
      importfile: null,
    };
  },
  methods: {
    async exportData() {
      const data = JSON.stringify(await ipcRenderer.invoke('getZones'));
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.classList.add('absolute', 'opacity-0');
      link.setAttribute('download', `export_${new Date().toISOString()}.json`);
      document.body.appendChild(link);
      link.click();
    },
    triggerImportData() {
      this.$refs.fileUpload.click();
    },
    async importData(event) {
      const reader = new FileReader();
      reader.addEventListener('load', async loadEvent => {
        try {
          await ipcRenderer.invoke(
            'importZones',
            JSON.parse(loadEvent.target.result)
          );
          snacktime({
            type: 'success',
            message: 'Successfully imported zones',
          });
        } catch (error) {
          console.log(error);
          snacktime({
            type: 'error',
            message: 'Could not import zones',
          });
        }
      });
      reader.readAsText(event.target.files[0]);
    },
  },
};
</script>
