import { parseCSSColor } from '../util'
import { VisualizationModel, Pixel } from './types'

export type HorizontalVisualizationModelOptions = {
  darkMode?: boolean
  reversed?: boolean
  fadeBars?: boolean
  scale?: number
  color?: string
  binSize?: number
  frequencyRange?: [number, number]
}

export const DEFAULT_OPTIONS = {
  darkMode: true,
  reversed: false,
  fadeBars: true,
  scale: 1.0,
  color: '#F44E3B',
  binSize: 25,
  frequencyRange: [0, 16000],
}

export default (
  options: HorizontalVisualizationModelOptions = {}
): VisualizationModel => {
  const {
    reversed,
    darkMode,
    scale,
    color,
    frequencyRange,
    binSize,
    fadeBars,
  } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const parsedColor = parseCSSColor(color)

  const colorMakerOptions: {
    [key: string]: (c: number, f: number) => number
  } = {
    dark: (c, intensity) => c * intensity,
    light: (c, intensity) => c + (255 - c) * (1 - intensity),
  }
  const colorMaker = colorMakerOptions[darkMode ? 'dark' : 'light']

  const frequencyIndexSelectorOptions: {
    [key: string]: (x: number, width: number, L: number) => number
  } = {
    normal: (x, width, L) => Math.floor((x / width) * L),
    reverse: (x, width, L) => L - Math.floor((x / width) * L),
  }

  const frequencyIndexSelector =
    frequencyIndexSelectorOptions[reversed ? 'reverse' : 'normal']

  const MIN_INTENSITY = 0.5

  const offPixel = darkMode
    ? parseCSSColor('#000000')
    : parseCSSColor('#ffffff')

  return (
    x: number,
    y: number,
    width: number,
    height: number,
    frequencyData: Uint8Array
  ): Pixel => {
    const binnedX = Math.floor(x / binSize) * binSize
    const frequencyIndex = frequencyIndexSelector(
      binnedX,
      width,
      // Tell the index selector to limit its options to the provided frequency range
      Math.floor(
        ((frequencyRange[1] - frequencyRange[0]) / 24000) * frequencyData.length
      )
    )

    // The frequency magnitude in [0, 1]
    const frequencyMagnitudeForThisPixel = frequencyData[frequencyIndex] / 255
    const range = height / 2
    const scaledRange = range * scale

    // yPosition in [0, 1]
    const yPosition = Math.abs(range - y) / scaledRange
    const scaledIntensity =
      (1 - yPosition / frequencyMagnitudeForThisPixel) * (1 - MIN_INTENSITY) +
      MIN_INTENSITY

    const turnOn = yPosition <= frequencyMagnitudeForThisPixel
    return turnOn
      ? {
          r: fadeBars
            ? colorMaker(parsedColor.r, scaledIntensity)
            : parsedColor.r,
          g: fadeBars
            ? colorMaker(parsedColor.g, scaledIntensity)
            : parsedColor.g,
          b: fadeBars
            ? colorMaker(parsedColor.b, scaledIntensity)
            : parsedColor.b,
        }
      : offPixel
  }
}
