import { parseCSSColor } from '../util'
import { VisualizationModel, Pixel } from './types'

export type HorizontalVisualizationModelOptions = {
  darkMode?: boolean
  reversed?: boolean
  scale?: number
  color?: string
  binSize?: number
  frequencyRange?: [number, number]
}

export const DEFAULT_OPTIONS = {
  darkMode: false,
  reversed: false,
  scale: 0.5,
  color: '#F44E3B',
  binSize: 50,
  frequencyRange: [0, 18000],
}

export default (
  options: HorizontalVisualizationModelOptions = {}
): VisualizationModel => {
  const { reversed, darkMode, scale, color, frequencyRange, binSize } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const parsedColor = parseCSSColor(color)

  const colorMakerOptions: {
    [key: string]: (c: number, f: number) => number
  } = {
    dark: (c, yI) => c * (yI / 255),
    light: (c, f) => c + (255 - c) * (1 - f / 255),
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
    const frequencyMagnitudeForThisPixel = frequencyData[frequencyIndex]
    const range = height / 2
    const scaledRange = range * scale
    const yPosition = Math.abs(range - y) / scaledRange
    const yIntensity = Math.max(0, 1 - yPosition)

    const scaledIntensity = yIntensity * frequencyMagnitudeForThisPixel
    return {
      r: colorMaker(parsedColor.r, scaledIntensity),
      g: colorMaker(parsedColor.g, scaledIntensity),
      b: colorMaker(parsedColor.b, scaledIntensity),
    }
  }
}
