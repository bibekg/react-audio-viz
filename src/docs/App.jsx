import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'
import ReactSelect from 'react-select'
import ReactSlider from 'rc-slider/lib/Slider'
import { CompactPicker as ColorPicker } from 'react-color'
import SyntaxHighligher from 'react-syntax-highlighter/prism'
import { okaidia } from 'react-syntax-highlighter/dist/styles/prism'
import 'rc-slider/assets/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import audioFile from './sample.mp3'
import { useVisualizer, models } from '../lib'
import { defaultOptions } from '../lib/models'
import { PolarVizualizationModelOptions } from '../lib/models/polar'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    overflow-y: hidden;
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
  justify-content: center;
`

const ControlContainer = styled.div`
  position: relative;
  top: 400px;
`

const Foreground = styled.div`
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.8);
  width: 400px;
  padding: 20px;
`

const Header = styled.div`
  text-align: center;
  width: 100%;
`

const EverythingDiv = styled.div`
  width: 100%;

  audio {
    &:focus {
      outline: none;
    }
  }
`
const SwitchIcon = styled.div`
  text-align: center;
  i {
    color: white;
  }
`

const Column = styled.div`
  width: 100%;
  position: relative;
  @media (min-width: 768px) {
    width: 50%;
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

const VizArea = styled.div`
  height: 100vh;
  overflow-y: hidden;
`

const ControlArea = styled.div`
  background: ${props => props.bgColor || '#333'};
  color: ${props => props.textColor};
  height: 100vh;
  overflow-y: auto;
  padding: 30px;

  .form-group.row {
    margin-left: 0;
  }
`

const reactSelectStyles = {
  container: base => ({
    ...base,
    flex: 1,
  }),
}
// type ValidModel = keyof typeof models;

const makeDemoReactCode = config => `
  const audioRef = React.useRef(null)
  const [AudioViz, init] = useVisualizer(audioRef)

  return (
    <div>
      <audio ref={audioRef} onPlay={init} {...otherProps} />
      <AudioViz
        model={models.polar({
          darkMode: ${config.darkMode},
          reversed: ${config.reversed},
          scale: ${config.scale},
          binSize: ${config.binSize},
          color: '${config.color}'
        })}
      />
    </div>
  )
`

const makeCSSColor = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`

const scaleMarks = (points, color) =>
  points.map(String).reduce((acc, point) => {
    acc[point] = {
      style: { color },
      label: point,
    }
    return acc
  }, {})

const App = () => {
  const mediaElementRef = React.useRef(null)
  const [ReactAudioViz, initializeVisualizer] = useVisualizer(mediaElementRef)

  const [config, changeModelConfig] = React.useState(defaultOptions.polar)

  const model = React.useMemo(() => models.polar(config), [config])
  const configUpdater = (oldConfig, key) => newValue => {
    changeModelConfig({ ...oldConfig, [key]: newValue })
  }

  const bgColor = config.color
  const textColor = idealTextColor(config.color)

  return (
    <EverythingDiv>
      <Row>
        <Column>
          <VizArea>
            <VisualizationContainer>
              {ReactAudioViz ? <ReactAudioViz model={model} /> : null}
            </VisualizationContainer>
            <VizForegroundContainer>
              <audio
                controls={true}
                onPlay={initializeVisualizer}
                ref={mediaElementRef}
                src={audioFile}
              />
            </VizForegroundContainer>
          </VizArea>
        </Column>
        <Column>
          <ControlArea bgColor={bgColor} textColor={textColor}>
            <Form>
              <h1>react-audio-viz</h1>
              <h5>
                A simple yet impressively extendable audio visualization React
                hook
              </h5>
              <Form.Group as={Row} controlId="darkMode">
                <Form.Label column sm={2}>
                  Dark Mode
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="checkbox"
                    value={config.darkMode}
                    onChange={event =>
                      configUpdater(config, 'darkMode')(event.target.checked)
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="reversed">
                <Form.Label column sm={2}>
                  Reversed
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="checkbox"
                    value={config.reversed}
                    onChange={event =>
                      configUpdater(config, 'reversed')(event.target.checked)
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="scale">
                <Form.Label column sm={2}>
                  Scale
                </Form.Label>
                <Col sm={10}>
                  <ReactSlider
                    name="scale"
                    min={0}
                    max={5.0}
                    step={0.5}
                    marks={scaleMarks([1, 2, 3, 4, 5], textColor)}
                    value={Number(config.scale)}
                    onChange={configUpdater(config, 'scale')}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="binSize">
                <Form.Label column sm={2}>
                  Bin Size
                </Form.Label>
                <Col sm={10}>
                  <ReactSlider
                    name="binSize"
                    min={1}
                    max={100}
                    step={25}
                    marks={scaleMarks([1, 25, 50, 75, 100], textColor)}
                    value={Number(config.binSize)}
                    onChange={configUpdater(config, 'binSize')}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="color">
                <Form.Label column sm={2}>
                  Color
                </Form.Label>
                <Col sm={10}>
                  <div>
                    <ColorPicker
                      color={config.color}
                      onChangeComplete={color =>
                        configUpdater(config, 'color')(color.hex)
                      }
                    />
                  </div>
                </Col>
              </Form.Group>
            </Form>

            <SyntaxHighligher language="jsx" style={okaidia}>
              {makeDemoReactCode(config)}
            </SyntaxHighligher>
          </ControlArea>
        </Column>
      </Row>
    </EverythingDiv>
  )
  //     <GlobalStyle />
  //     {ReactAudioViz ? (
  //       <VisualizationContainer>
  //         <ReactAudioViz width={400} height={400} model={model} />
  //       </VisualizationContainer>
  //     ) : null}
  //     <Foreground>
  //       <Header>
  //         <h2>react-audio-viz</h2>
  //         <p>Sample audio from bensound.com</p>

  //       </Header>
  //       <label htmlFor="mode">Mode</label>
  //       <label htmlFor="direction">Direction</label>
  //       <label htmlFor="scale">Scale</label>

  //       <label htmlFor="color">Color</label>
  //     </Foreground>
  //   </MainDiv>
  // )
}

// flow-disable-next-line
ReactDOM.render(<App />, document.getElementById('app'))
