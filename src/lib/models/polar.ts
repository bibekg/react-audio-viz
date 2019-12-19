import { VisualizationModel, Pixel } from './types'

export type PolarVizualizationModelOptions = {
  direction?: 'normal' | 'reverse'
  scale?: number
  mode?: 'dark' | 'light'
  color?: { r: number; g: number; b: number }
}

export default (
  options: PolarVizualizationModelOptions = {}
): VisualizationModel => {
  const {
    direction = 'normal',
    scale = 2,
    mode = 'dark',
    color = { r: 100, g: 150, b: 120 },
  } = options

  const colorMakerOptions: {
    [key: string]: (c: number, f: number) => number
  } = {
    dark: (c, f) => c * (f / 255),
    light: (c, f) => c + (255 - c) * (1 - f / 255),
  }
  const colorMaker = colorMakerOptions[mode]

  const frequencyIndexSelectorOptions: {
    [key: string]: (r: number, R: number, L: number) => number
  } = {
    normal: (r, R, L) => Math.min(Math.floor((r / R) * L), L),
    reverse: (r, R, L) => L - 1 - Math.min(Math.floor((r / R) * L), L),
  }

  const frequencyIndexSelector = frequencyIndexSelectorOptions[direction]

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

    const frequencyMagnitudeForThisPixel =
      frequencyData[frequencyIndexSelector(radius, R, frequencyData.length)]
    return {
      r: colorMaker(color.r, frequencyMagnitudeForThisPixel),
      g: colorMaker(color.g, frequencyMagnitudeForThisPixel),
      b: colorMaker(color.b, frequencyMagnitudeForThisPixel),
    }
  }
}
