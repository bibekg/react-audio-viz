import { VisualizationModel, Pixel } from './types'

export type WaveformVizualizationModelOptions = {
  direction?: 'normal' | 'reverse'
  mode?: 'dark' | 'light'
  scale?: number
  color?: { r: number; g: number; b: number }
  frequencyRange?: [number, number]
}

export default (
  options: WaveformVizualizationModelOptions = {}
): VisualizationModel => {
  const {
    direction = 'normal',
    mode = 'dark',
    scale = 0.25,
    color = { r: 255, g: 255, b: 255 },
    frequencyRange = [0, 18000],
  } = options

  const colorMakerOptions: {
    [key: string]: (c: number, f: number) => number
  } = {
    dark: (c, yI) => c * (yI / 255),
    light: (c, f) => c + (255 - c) * (1 - f / 255),
  }
  const colorMaker = colorMakerOptions[mode]

  const frequencyIndexSelectorOptions: {
    [key: string]: (x: number, width: number, L: number) => number
  } = {
    normal: (x, width, L) => Math.floor((x / width) * L),
    reverse: (x, width, L) => L - Math.floor((x / width) * L),
  }

  const frequencyIndexSelector = frequencyIndexSelectorOptions[direction]

  return (
    x: number,
    y: number,
    width: number,
    height: number,
    frequencyData: Uint8Array
  ): Pixel => {
    const frequencyIndex = frequencyIndexSelector(
      x,
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
      r: colorMaker(color.r, scaledIntensity),
      g: colorMaker(color.g, scaledIntensity),
      b: colorMaker(color.b, scaledIntensity),
    }
  }
}
