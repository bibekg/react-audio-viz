import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { withRouter, BrowserRouter } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import 'rc-slider/assets/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import audioFile from './sample.mp3'
import Configurator from './Configurator'
import { useVisualizer, models } from '../lib'
import { defaultOptions } from '../lib/models'
import { PolarVisualizationModelOptions } from '../lib/models/polar'
import { HorizontalVisualizationModelOptions } from '../lib/models/horizontal'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    overflow-y: hidden;
  }

  * {
    box-sizing: border-box;
  }

  body, h1, h2, h3, h4, h5, h6, p, a, label {
    font-family: 'Roboto', sans-serif;
  }
`

const VisualizationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: white;
`

const VizForegroundContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

const PlayPrompt = styled.h5`
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  padding: 10px;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  border-radius: 5px;
  margin-bottom: 5px;
`

const EverythingDiv = styled.div`
  width: 100%;

  audio {
    &:focus {
      outline: none;
    }
  }
`

const Column = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`

const VizArea = styled.div`
  position: relative;
  height: 35vh;
  overflow-y: hidden;

  @media (min-width: 960px) {
    height: 100vh;
  }
`

const Heading = styled.div``
const ControlArea = styled.div`
  position: relative;
  background: ${props => props.bgColor || '#333'};
  color: ${props => props.textColor};

  height: 80vh;
  overflow-y: scroll;
  @media (min-width: 960px) {
    height: 100vh;
  }

  padding: 50px;

  .form-group.row {
    margin-left: 0;
  }
`

const parseRGBColor = input => {
  if (input.substr(0, 1) == '#') {
    const collen = (input.length - 1) / 3
    var fact = [17, 1, 0.062272][collen - 1]
    return {
      r: Math.round(parseInt(input.substr(1, collen), 16) * fact),
      g: Math.round(parseInt(input.substr(1 + collen, collen), 16) * fact),
      b: Math.round(parseInt(input.substr(1 + 2 * collen, collen), 16) * fact),
    }
  }
  const components = input
    .split('(')[1]
    .split(')')[0]
    .split(',')
  return {
    r: Number(components[0]),
    g: Number(components[1]),
    b: Number(components[2]),
    a: components.length > 3 ? Number(components[3]) : 1,
  }
}

const idealTextColor = cssColor => {
  const color = parseRGBColor(cssColor)
  const nThreshold = 105
  const bgDelta = color.r * 0.299 + color.g * 0.587 + color.b * 0.114

  return 255 - bgDelta < nThreshold ? '#000000' : '#ffffff'
}

interface Props {
  history: any
}

type ModelConfig =
  | PolarVisualizationModelOptions
  | HorizontalVisualizationModelOptions

type ModelName = keyof typeof models

const isValidModelName = (input: string): input is ModelName =>
  Object.keys(models).includes(input)

const App = withRouter(({ history }: Props) => {
  const mediaElementRef = React.useRef(null)
  const [ReactAudioViz, initializeVisualizer] = useVisualizer(mediaElementRef)
  const [isPlaying, setPlaying] = React.useState(false)
  const [selectedModel, changeSelectedModel] = React.useState<ModelName>(
    history.location.pathname.substring(1)
  )
  const [config, changeModelConfig] = React.useState<ModelConfig>(
    defaultOptions[selectedModel]
  )

  const model = React.useMemo(
    () => (selectedModel ? models[selectedModel](config) : null),
    [selectedModel, config]
  )
  const configUpdater = (oldConfig, key) => newValue => {
    changeModelConfig({ ...oldConfig, [key]: newValue })
  }

  history.listen(({ pathname }) => {
    const modelName = location.pathname.substring(1)
    if (isValidModelName(modelName)) {
      changeSelectedModel(modelName)
      changeModelConfig(defaultOptions[modelName])
    }
  })

  const bgColor = config ? config.color : '#333'
  const textColor = config ? idealTextColor(config.color) : '#fff'

  return (
    <EverythingDiv>
      <GlobalStyle />
      <Grid container>
        <Grid item md={6} xs={12}>
          <VizArea>
            <VisualizationContainer>
              {ReactAudioViz && model ? <ReactAudioViz model={model} /> : null}
            </VisualizationContainer>
            <VizForegroundContainer>
              <PlayPrompt
                bgColor={bgColor}
                textColor={textColor}
                show={!isPlaying}
              >
                Start by pressing play!
              </PlayPrompt>
              <audio
                controls={true}
                onPlay={() => {
                  initializeVisualizer()
                  setPlaying(true)
                }}
                onPause={() => {
                  setPlaying(false)
                }}
                ref={mediaElementRef}
                src={audioFile}
              />
            </VizForegroundContainer>
          </VizArea>
        </Grid>
        <Grid item md={6} xs={12}>
          <ControlArea bgColor={bgColor} textColor={textColor}>
            <Heading>
              <h1>react-audio-viz</h1>
              <h5>
                A delightfully simple yet impressively extendable audio
                visualization framework for React
              </h5>
              <br />
            </Heading>
            <Configurator
              config={config}
              configUpdater={configUpdater}
              bgColor={bgColor}
              textColor={textColor}
            />
            <p>Sample audio from bensound.com</p>
          </ControlArea>
        </Grid>
      </Grid>
    </EverythingDiv>
  )
})

// flow-disable-next-line
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)
