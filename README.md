# react-audio-viz

A audio vizualization React hook/component that's simple yet incredibly extendable

Check out the live demo at [http://react-audio-viz.surge.sh/](http://react-audio-viz.surge.sh/)

## Development

Run `yarn` to install dependencies then `yarn docs:dev` to fire up the example page at `localhost:1234` where you can test any changes made to the core library in `src/lib`.

## Sample Usage

```js
const App = () => {
  const mediaElementRef = React.useRef(null)
  const [visualization, initializeVisualizer] = useVisualizer(
    mediaElementRef,
    models.polar(),
    {
      width: 400,
      height: 400,
    }
  )

  return (
    <div>
      <h1>react-audio-viz</h1>
      <audio
        controls={true}
        onPlay={initializeVisualizer}
        ref={mediaElementRef}
        src={audioFile}
      />
      {visualization}
    </div>
  )
}
```

## API

`useVisualizer(audioElementRef, model, config)`

| Parameter         | Required? | Description                                                                                                                         | Default Vaue |
| ----------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `audioElementRef` | Yes       | A React ref object that will (once rendering complets) point to the `<audio />` or `<video />` element you are trying to visualize. |              |
| `model`           | Yes       | The visualization model you'd like to use                                                                                           |              |
| `config`          | No        | Various configuration settings                                                                                                      | `{}`         |

`config` contains the following settings

| Config Option | Description                               | Default Value        |
| ------------- | ----------------------------------------- | -------------------- |
| `width`       | The width of the visualization            | `window.innerWidth`  |
| `height`      | The visualization model you'd like to use | `window.innerHeight` |
