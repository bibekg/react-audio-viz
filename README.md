# [react-audio-viz](http://react-audio-viz.surge.sh)

A delightfully simple yet impressively extendable audio visualization framework for React

[![demo](demo.gif)](http://react-audio-viz.surge.sh/)

Check out the live demo at [http://react-audio-viz.surge.sh/](http://react-audio-viz.surge.sh/)

## Development

Run `yarn` to install dependencies then `yarn dev` to start up the demo at `localhost:1234` where you can test any changes made to the core library in `src/lib`.

## Sample Usage

```js
import { useVisualizer, models } from 'react-audio-viz'

const AUDIO_SRC = '...'

const App = () => {
  const mediaElementRef = React.useRef(null)
  const [ReactAudioViz, initializeVisualizer] = useVisualizer(mediaElementRef)

  return (
    <div>
      <h1>react-audio-viz</h1>
      <audio
        controls={true}
        onPlay={initializeVisualizer}
        ref={mediaElementRef}
        src={AUDIO_SRC}
      />
      <div style={{ width: '400', height: '400' }}>
        {ReactAudioViz && <ReactAudioViz model={models.polar()} />}
      </div>
    </div>
  )
}
```

## API

`const [ReactAudioViz, initializer] = useVisualizer(mediaElementRef)`

`useVisualizer` accepts a single argument which is a ref object (i.e. `React.useRef` result) that corresponds to the `<audio />` or `<video />` element you are trying to render a visualization of.

It returns a tuple containing a `ReactAudioViz` component and an `initializer` function, both of which may be `null` if an error occurs (e.g. the `mediaElementRef` doesn't point to a valid media element).

### `ReactAudioViz`

A React component which accepts a single `model` prop which the framework uses to render each frame. You can use an existing model exported by this library (e.g. `models.polar(options)`) or build your [own custom model](#building-a-custom-visualization-model).

When rendered, the `ReactAudioViz` component creates a single `<canvas />` element that the visualization is performed on. The canvas will automatically resize to reflect the size of its parent (using this [cross-browser `ResizeObserver` polyfill](https://github.com/que-etc/resize-observer-polyfill)) so you can simply place `<ReactAudioViz />` in a container element sized to your needs.

### `initializer`

Modern browsers protect users from code that may tap into audio/video sources without their consent. As a result, the "tapping into the media source" code has to execute as a result of a user action. Invoke this function (without any arguments) in response to a user action that makes sense for your application. I suggest the `onPlay` prop of your `<audio />` or `<video />` element.

## Building a Custom Visualization Model

In simplest terms, a visualization model is a function that decides the color of each pixel on the canvas. To build one, simply create a function that implements the `VisualizationModel` type signature (shown below), then pass it into the `model` prop of `<ReactAudioViz />`.

```jsx
type Pixel = {
  r: number
  g: number
  b: number
  // alpha is optional, defaults to 255
  a?: number
}

type VisualizationModel = (
  x: number,
  y: number,
  width: number,
  height: number,
  frequencyData: Uint8Array,
  // The ID of the animation frame this invokation of the model corresponds to
  // i.e. frameID will change every (width * height) invokations of this function
  frameID: number
) => Pixel
```

To better illustrate this, take a look at the [`polar` model (or more accurately, model factory)](https://github.com/bibekg/react-audio-viz/blob/master/src/lib/models/polar.ts) that this library ships with. `models.polar` is a model factory (`(options: PolarVisualizationModelOptions) => VisualizationModel`) which lets you generate a "polar"-shaped visualization model which may be customized at run-time ([see the live demo](http://react-audio-viz.surge.sh)).

The polar model factory returns a `VisualizationModel` which converts the `x` and `y` values to the proper radial distance from center of canvas (based on the `width` and `height` values), then colors that pixel with the magnitude of the frequency corresponding to that radial distance.

### Tips for Building a Visualizer Model

#### Memoize repetitively used data in a factory

The visualization model is the primary bottleneck for performance. For example, if your canvas is 400x400 and the user has a 60FPS refresh rate, it will be called 400x400x(60 FPS) = 9,600,000 times every second. If you're building a custom model, make sure the model function is _highly_ performant. Consider leveraging a model factory for performing any performance optimizations (e.g. see the [`pulse` model factory](https://github.com/bibekg/react-audio-viz/blob/master/src/lib/models/pulse.ts) for an example of memoizing repetitively used data by the `frameID`)
