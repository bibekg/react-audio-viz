# react-audio-viz

An audio visualization React hook/component that's simple yet incredibly extendable

Check out the live demo at [http://react-audio-viz.surge.sh/](http://react-audio-viz.surge.sh/)

## Development

Run `yarn` to install dependencies then `yarn dev` to fire up the example page at `localhost:1234` where you can test any changes made to the core library in `src/lib`.

## Sample Usage

```js
import { useVisualizer, models } from 'react-audio-viz'

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
        src={audioFile}
      />
      {ReactAudioViz && (
        <div style={{ width: '400px', height: '400px' }}>
          <ReactAudioViz width={400} height={400} model={models.polar()} />>
        </div>
      )}
    </div>
  )
}
```

## API

`const [ReactAudioViz, initializer] = useVisualizer(mediaElementRef)`

`useVisualizer` accepts a single argument which is a ref object (i.e. `React.useRef` result) that corresponds to the `<audio />` or `<video />` element you are trying to render a visualization of

It returns a tuple containing a `ReactAudioViz` component and an `initializer` function.

### `ReactAudioViz`

A React component which accepts the following props:

- `width` (optional, defaults to `window.innerWidth`)
- `height` (optional, defaults to `window.innerHeight`)
- `model`

The `model` prop is one of the models provided as an export of this library (e.g. `models.polar()`)

`TODO: Add more documentation on the available models and how users can even make their own custom models.`

### `initializer`

Modern browsers protect users from code that may tap into audio/video sources without their consent. As a result, the "tapping into the media source" code has to execute as a result of a user action. Invoke this function (without any arguments) in response to a user action that makes sense for your application. I suggest the `onPlay` prop of your `<audio />` or `<video />` element.
