export type VisualizationModel = (
  x: number,
  y: number,
  width: number,
  height: number,
  frequencyData: Uint8Array,
  frameID: number
) => Pixel

export type Pixel = {
  r: number
  g: number
  b: number
  // alpha is optional, defaults to 255
  a?: number
}
