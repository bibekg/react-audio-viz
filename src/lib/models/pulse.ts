import { parseCSSColor } from '../util'
import { VisualizationModel, Pixel } from './types'

export type PulseVisualizationModelOptions = {
  color?: string
  frequencyRange?: [number, number]
}

export const DEFAULT_OPTIONS = {
  color: '#008800',
  frequencyRange: [4000, 12000],
}

export default (
  options: PulseVisualizationModelOptions = {}
): VisualizationModel => {
  const { color, frequencyRange } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  const parsedColor = parseCSSColor(color)

  // Memoize the alpha level by frame ID so that we don't recalculate
  // it for each pixel in the frame (pretty computationally expensive
  // since it requires taking a 1024-index weighted average!)
  const memo: { id: number | null; alpha: number | null } = {
    id: null,
    alpha: null,
  }

  return (
    x: number,
    y: number,
    width: number,
    height: number,
    frequencyData: Uint8Array,
    frameID: number
  ): Pixel => {
    if (memo.id == null || memo.alpha == null || memo.id !== frameID) {
      const L = frequencyData.length
      const [rangeMin, rangeMax] = frequencyRange
      const startIndex = Math.round((rangeMin / 24000) * L)
      const endIndex = Math.round((rangeMax / 24000) * L)
      const indexRange = endIndex - startIndex

      // The idea here is to figure out what the weighted average frequency is
      // Since each index in frequencyData corresponds to a discrete frequency level,
      // we thus find the weighted averae index of that array
      let sumOfWeightedIndices = 0
      for (let i = startIndex; i < endIndex; i += 1) {
        sumOfWeightedIndices += i * frequencyData[i]
      }

      // Now simply divide that index by our specified valid range of indices to choose
      // from, then again to get it to a [0-1] range, and we have our alpha
      const weightedIndex = sumOfWeightedIndices / indexRange
      const alpha = weightedIndex / indexRange
      memo.id = frameID
      memo.alpha = alpha
    }

    return {
      r: parsedColor.r,
      g: parsedColor.g,
      b: parsedColor.b,
      a: memo.alpha,
    }
  }
}
