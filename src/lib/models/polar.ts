import { parseCSSColor } from '../util'
import { VisualizationModel, Pixel } from './types'

export type PolarVisualizationModelOptions = {
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
  color: '#009CE0',
}

export default (
  options: PolarVisualizationModelOptions = {}
): VisualizationModel => {
  const { reversed, scale, darkMode, color, binSize } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const parsedColor = parseCSSColor(color) || { r: 0, g: 0, b: 0 }

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
