import * as React from 'react'
import { VisualizationModel } from './models/types'

type UseVisualizerReturnValue = [
  ((props: VisualizerProps) => JSX.Element | null) | null,
  () => void
]

type MediaElement = HTMLAudioElement | HTMLVideoElement
type MediaElementRef = React.MutableRefObject<MediaElement>

interface VisualizerProps {
  model: VisualizationModel
}

interface VisualizerFullProps extends VisualizerProps {
  audioSrcRef: React.MutableRefObject<MediaElementAudioSourceNode | null>
  analyserRef: React.MutableRefObject<AnalyserNode | null>
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

const NOOP_RETURN_VALUE: UseVisualizerReturnValue = [null, () => {}]

const InternalReactAudioViz = (props: VisualizerFullProps) => {
  const { model, audioSrcRef, analyserRef, canvasRef } = props

  // Maintain record of the last animation frame request ID so that we can cancel it when we need
  // to create a new handler (i.e. when the model prop changes)
  const lastAnimationFrameRequest = React.useRef<number | null>(null)

  const createVizImageFromData = React.useCallback(
    (frequencyData: Uint8Array, canvas: HTMLCanvasElement) => {
      const { width, height } = canvas
      const imageData = new ImageData(width, height)
      for (let y = 0, i = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1, i += 4) {
          const { r, g, b, a } = model(
            x + 1,
            y + 1,
            width,
            height,
            frequencyData
          )
          imageData.data[i + 0] = r
          imageData.data[i + 1] = g
          imageData.data[i + 2] = b
          imageData.data[i + 3] = a || 255
        }
      }
      return imageData
    },
    [model]
  )

  if (audioSrcRef.current && analyserRef.current && canvasRef.current) {
    const { current: analyser } = analyserRef
    const frequencyData = new Uint8Array(analyser.frequencyBinCount)

    let vizImage
    const renderFrame = () => {
      const { current: canvas } = canvasRef
      if (canvas == null) {
        return
      }
      lastAnimationFrameRequest.current = requestAnimationFrame(renderFrame)
      analyser.getByteFrequencyData(frequencyData)
      vizImage = createVizImageFromData(frequencyData, canvas)
      const canvasContext = canvas.getContext('2d')
      if (canvasContext == null || vizImage == null) {
        return
      }
      canvasContext.putImageData(vizImage, 0, 0)
    }

    // Cancel existing animation frame handlers before creating new ones
    // otherwise performance will severely tank
    if (lastAnimationFrameRequest.current) {
      cancelAnimationFrame(lastAnimationFrameRequest.current)
      lastAnimationFrameRequest.current = null
    }
    lastAnimationFrameRequest.current = requestAnimationFrame(renderFrame)
  }

  const refitCanvas = React.useCallback(() => {
    if (canvasRef.current) {
      const { current: canvas } = canvasRef
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
  }, [canvasRef])

  refitCanvas()
  if (ResizeObserver && canvasRef.current) {
    const resizeObserver = new ResizeObserver(refitCanvas)
    resizeObserver.observe(canvasRef.current)
  }

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}

const useVisualizer = (
  mediaElementRef: MediaElementRef
): UseVisualizerReturnValue | null => {
  const [hasInitialized, setHasInitialized] = React.useState(false)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const audioSrcRef = React.useRef<MediaElementAudioSourceNode | null>(null)
  const analyserRef = React.useRef<AnalyserNode | null>(null)
  const audioContextRef = React.useRef<AudioContext | null>(null)

  // Create an external ReactAudioViz for the user of this hook by passing in the necessary
  // settings to the internal ReactAudioViz
  const ReactAudioViz = React.useMemo(
    () => (props: VisualizerProps) => (
      <InternalReactAudioViz
        canvasRef={canvasRef}
        audioSrcRef={audioSrcRef}
        analyserRef={analyserRef}
        {...props}
      />
    ),
    [canvasRef, audioSrcRef, analyserRef]
  )

  const initializer = React.useCallback(() => {
    if (hasInitialized) {
      return
    }

    if (audioContextRef.current == null) {
      if ('AudioContext' in window) {
        audioContextRef.current = new AudioContext()
      } else if ('webkitAudioContext' in window) {
        audioContextRef.current = new webkitAudioContext()
      } else {
        console.warn("Can't show visualizations in this browser :(")
        return NOOP_RETURN_VALUE
      }
    }

    if (audioContextRef.current && mediaElementRef.current) {
      audioSrcRef.current = audioContextRef.current.createMediaElementSource(
        mediaElementRef.current
      )
      analyserRef.current = audioContextRef.current.createAnalyser()
      if (audioSrcRef.current && analyserRef.current) {
        // we have to connect the MediaElementSource with the analyser
        audioSrcRef.current.connect(analyserRef.current)
        audioSrcRef.current.connect(audioContextRef.current.destination)
      }
      audioContextRef.current.resume()
      setHasInitialized(true)
    }
  }, [
    audioContextRef.current,
    analyserRef.current,
    audioSrcRef.current,
    hasInitialized,
  ])

  return [ReactAudioViz, initializer]
}

export default useVisualizer
