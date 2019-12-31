import * as React from 'react'
import { inspect } from 'util'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import SyntaxHighligher from 'react-syntax-highlighter/prism'
import { okaidia } from 'react-syntax-highlighter/dist/styles/prism'

import { PolarVisualizationModelOptions } from '../lib/models/polar'
import PolarConfig from './PolarConfig'
import HorizontalConfig from './HorizontalConfig'
import PulseConfig from './PulseConfig'

const Wrapper = styled.div`
  h4 a {
    color: ${props => props.textColor};
    font-size: 0.6em;
    text-decoration: underline;
    margin-bottom: 10px;
  }
`

const Step = styled.h4`
  margin: 14px 0;
`

const Tab = styled(NavLink)`
  &,
  a {
    :hover {
      text-decoration: none;
    }
  }
  font-size: 24px;
`

const Tabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-content: stretch;
  text-align: center;
  border-radius: 10px
  border: 2px solid ${props => props.textColor}
  margin-bottom: 30px;
  
  ${Tab} {
    padding: 10px 0;
    flex-grow: 1;
    color: ${props => props.textColor}
    &:not(:last-child) {
      border-right: 2px solid ${props => props.textColor}
    }
    &.active {
      background-color: ${props => props.textColor};
      color: ${props => props.bgColor}
    }

    &:first-child {
      border-top-left-radius: 7px;
      border-bottom-left-radius: 7px;
    }
    &:last-child {
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;
    }
  }
`

const Content = styled.div``

const makeDemoReactCode = (modelName, configObject) => `
  const audioRef = React.useRef(null)
  const [AudioViz, init] = useVisualizer(audioRef)

  return (
    <div>
      <audio ref={audioRef} onPlay={init} {...otherProps} />
      <AudioViz
        model={models.${modelName}(${inspect(configObject)
  .replace('{ ', '{\n  ')
  .replace(' }', '\n}')
  .replace(/\n/g, '\n        ')})}
      />
    </div>
  )
`

interface Props {
  config: PolarVisualizationModelOptions
  configUpdater: any
  textColor: string
  bgColor: string
}

const Configurator = ({ config, configUpdater, textColor, bgColor }: Props) => {
  const models = [
    {
      name: 'polar',
      path: '/polar',
      Component: PolarConfig,
    },
    {
      name: 'horizontal',
      path: '/horizontal',
      Component: HorizontalConfig,
    },
    {
      name: 'pulse',
      path: '/pulse',
      Component: PulseConfig,
    },
  ]

  return (
    <Wrapper textColor={textColor}>
      <Step>
        Choose a visualization model <a href="#">(or build your own model)</a>
      </Step>
      <Tabs bgColor={bgColor} textColor={textColor}>
        {models.map(({ name, path }) => (
          <Tab key={name} to={path}>
            {name}
          </Tab>
        ))}
      </Tabs>
      <Step>Play around with the model's settings</Step>
      <Content>
        <Switch>
          <Route exact path="/">
            <Redirect to={models[0].path} />
          </Route>
          {models.map(({ name, path, Component }) => (
            <Route key={name} path={path}>
              <Component
                config={config}
                configUpdater={configUpdater}
                textColor={textColor}
              />
            </Route>
          ))}
        </Switch>
        <Step>It's that easy!</Step>
        {models.map(({ name, path, configRenderer }) => (
          <Route key={name} path={path}>
            <SyntaxHighligher language="jsx" style={okaidia}>
              {makeDemoReactCode(name, config)}
            </SyntaxHighligher>
          </Route>
        ))}
      </Content>
    </Wrapper>
  )
}
export default Configurator
