import { VisualizationModel, Pixel } from './types'

export type PolarVizualizationModelOptions = {
  darkMode?: boolean
  reversed?: boolean
  scale?: number
  binSize?: number
  color?: string
}

export const DEFAULT_OPTIONS = {
  darkMode: true,
  reversed: false,
  scale: 2,
  binSize: 50,
  color: 'rgb(0, 156, 224)',
}

// Source: https://stackoverflow.com/questions/11068240/what-is-the-most-efficient-way-to-parse-a-css-color-in-javascript/21966100?noredirect=1#comment69911831_21966100
const parseRGBColor = (input: string) => {
  if (input.substr(0, 1) == '#') {
    const collen = (input.length - 1) / 3
    var fact = [17, 1, 0.062272][collen - 1]
    return {
      r: Math.round(parseInt(input.substr(1, collen), 16) * fact),
      g: Math.round(parseInt(input.substr(1 + collen, collen), 16) * fact),
      b: Math.round(parseInt(input.substr(1 + 2 * collen, collen), 16) * fact),
    }
  }
  const components = input
    .split('(')[1]
    .split(')')[0]
    .split(',')
  return {
    r: Number(components[0]),
    g: Number(components[1]),
    b: Number(components[2]),
    a: components.length > 3 ? Number(components[3]) : 1,
  }
}

export default (
  options: PolarVizualizationModelOptions = {}
): VisualizationModel => {
  const { reversed, scale, darkMode, color, binSize } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const parsedColor = parseRGBColor(color) || { r: 0, g: 0, b: 0 }

  const colorMakerOptions: {
    [key: string]: (c: number, f: number) => number
  } = {
    dark: (c, f) => c * (f / 255),
    // TODO: Performance tank due to so many operations here
    light: (c, f) => c + (255 - c) * (1 - f / 255),
  }
  const colorMaker = colorMakerOptions[darkMode ? 'dark' : 'light']

  const frequencyIndexSelectorOptions: {
    [key: string]: (r: number, R: number, L: number) => number
  } = {
    normal: (r, R, L) => Math.min(Math.floor((r / R) * L), L),
    reversed: (r, R, L) => L - 1 - Math.min(Math.floor((r / R) * L), L),
  }

  const frequencyIndexSelector =
    frequencyIndexSelectorOptions[reversed ? 'reversed' : 'normal']

  return (
    x: number,
    y: number,
    width: number,
    height: number,
    frequencyData: Uint8Array
  ): Pixel => {
    const centerX = Math.floor(width / 2)
    const centerY = Math.floor(height / 2)

    // The viz will be a circle with radius equaling the distance from the center to any of the four cocrners
    // This will ensure that the visible area is fully contained within the circle
    const R = Math.sqrt(centerX ** 2 + centerY ** 2) * scale
    const radius = Math.sqrt((centerX - x) ** 2 + (centerY - y) ** 2)

    const binnedRadius = Math.floor(radius / binSize) * binSize

    const frequencyMagnitudeForThisPixel =
      frequencyData[
        frequencyIndexSelector(binnedRadius, R, frequencyData.length)
      ]
    return {
      r: colorMaker(parsedColor.r, frequencyMagnitudeForThisPixel),
      g: colorMaker(parsedColor.g, frequencyMagnitudeForThisPixel),
      b: colorMaker(parsedColor.b, frequencyMagnitudeForThisPixel),
    }
  }
}
