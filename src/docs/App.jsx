import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import * as ReactDOM from 'react-dom'
import audioFile from './sample.mp3'
import { useVisualizer, models } from '../lib'

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
`

const IntroText = styled.div`
  width: 100%;
  text-align: center;
`

const VisualizationContainer = styled.div`
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.25);
  height: 400px;
  width: 400px;
`

const App = () => {
  const mediaElementRef = React.useRef(null)
  const [ReactAudioViz, initializeVisualizer] = useVisualizer(mediaElementRef)

  return (
    <MainDiv>
      <GlobalStyle />
      <IntroText>
        <h1>react-audio-viz</h1>
        <p>Sample audio from bensound.com</p>
      </IntroText>
      <audio
        controls={true}
        onPlay={initializeVisualizer}
        ref={mediaElementRef}
        src={audioFile}
      />
      {ReactAudioViz ? (
        <ReactAudioViz width={400} height={400} model={models.polar()} />
      ) : null}
    </MainDiv>
  )
}

// flow-disable-next-line
ReactDOM.render(<App />, document.getElementById('app'))
