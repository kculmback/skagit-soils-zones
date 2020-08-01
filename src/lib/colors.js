import { shuffle } from 'lodash-es';
import { theme } from 'tailwindcss/defaultConfig';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

export const { colors } = theme;

export const flatColors = flattenColorPalette(colors);

export const colorsArray = Object.values(flatColors);

const blacklist = [
  '100',
  '200',
  '300',
  'black',
  'gray',
  'transparent',
  'white',
  'current',
];
export const basicColorsArray = Object.entries(flatColors)
  .filter(([key]) => !blacklist.some(notAllowed => key.includes(notAllowed)))
  .map(([key, value]) => value);

export const getRandomColor = (colors = colorsArray) => shuffle(colors)[0];
