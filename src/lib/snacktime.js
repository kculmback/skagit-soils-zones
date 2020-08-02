import EventBus from './EventBus';

/**
 * @typedef {"default" | "error" | "info" | "success" | "warning"} SnackTypes
 */

/**
 * @typedef {Object} SnackOptions
 * @property {string} message Message to display for alert
 * @property {string} [description] Additional text to display below message
 * @property {SnackTypes} [type=info] Type of alert
 * @property {number} [timeout=10000] How long it should be visible for
 * @property {boolean} [persistent] Should alert be persistent
 * @property {boolean} [light] Display light version of alert
 * @property {boolean} [inline] Display inline version of alert
 */

/**
 * Send a snackbar alert
 * @param {SnackOptions} options Options to pass to Snackbar component
 */
export default function snacktime(options) {
  EventBus.$emit('snacktime', options);
}
