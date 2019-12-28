import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import ReactSelect from 'react-select'
import ReactSlider from 'rc-slider/lib/Slider'
import * as ReactDOM from 'react-dom'
import audioFile from './sample.mp3'
import { useVisualizer, models } from '../lib'
import { defaultOptions } from '../lib/models'
import { PolarVizualizationModelOptions } from '../lib/models/polar'
import 'rc-slider/assets/index.css'
import { SketchPicker } from 'react-color'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    position: relative;
  }
`

const IntroText = styled.div`
  width: 100%;
  text-align: center;
`

const VisualizationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`

const Foreground = styled.div`
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.8);
  width: 400px;
  border-radius: 10px;
  box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.25);
  padding: 20px;
`

const Header = styled.div`
  text-align: center;
  width: 100%;
`
const reactSelectStyles = {
  container: base => ({
    ...base,
    flex: 1,
  }),
}
// type ValidModel = keyof typeof models;

const App = () => {
  const mediaElementRef = React.useRef(null)
  const [ReactAudioViz, initializeVisualizer] = useVisualizer(mediaElementRef)

  const [config, changeModelConfig] = React.useState(defaultOptions.polar)

  const modeOptions = ['dark', 'light'].map(m => ({ value: m, label: m }))
  const directionOptions = ['normal', 'reverse'].map(m => ({
    value: m,
    label: m,
  }))

  const model = React.useMemo(() => models.polar(config), [config])
  const configUpdater = (oldConfig, key) => newValue => {
    changeModelConfig({ ...oldConfig, [key]: newValue })
  }

  return (
    <MainDiv>
      <GlobalStyle />
      {ReactAudioViz ? (
        <VisualizationContainer>
          <ReactAudioViz
            width={window.innerWidth}
            height={window.innerHeight}
            model={model}
          />
        </VisualizationContainer>
      ) : null}
      <Foreground>
        <Header>
          <h2>react-audio-viz</h2>
          <p>Sample audio from bensound.com</p>
          <audio
            controls={true}
            onPlay={initializeVisualizer}
            ref={mediaElementRef}
            src={audioFile}
          />
        </Header>
        <label htmlFor="mode">Mode</label>
        <ReactSelect
          name="mode"
          value={{ value: config.mode, label: config.mode }}
          options={modeOptions}
          onChange={newMode => configUpdater(config, 'mode')(newMode.value)}
        />
        <label htmlFor="direction">Direction</label>
        <ReactSelect
          name="direction"
          width="400px"
          value={{ value: config.direction, label: config.direction }}
          options={directionOptions}
          onChange={newDirection =>
            configUpdater(config, 'direction')(newDirection.value)
          }
        />
        <label htmlFor="scale">Scale</label>
        <ReactSlider
          name="scale"
          min={0.5}
          max={5.0}
          step={0.5}
          value={Number(config.scale)}
          onChange={configUpdater(config, 'scale')}
        />
        <label htmlFor="color">Color</label>
        <SketchPicker
          color={config.color}
          onChangeComplete={color => configUpdater(config, 'color')(color.rgb)}
        />
      </Foreground>
    </MainDiv>
  )
}

// flow-disable-next-line
ReactDOM.render(<App />, document.getElementById('app'))
