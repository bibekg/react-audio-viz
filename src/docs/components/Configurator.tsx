import * as React from 'react'
import { inspect } from 'util'
import { Switch, Route, Redirect, NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { withStyles, createStyles, Theme, makeStyles } from '@material-ui/core'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import PolarConfig from './PolarConfig'
import HorizontalConfig from './HorizontalConfig'
import PulseConfig from './PulseConfig'
import { PolarVisualizationModelOptions } from '../lib/models/polar'
import { HorizontalVisualizationModelOptions } from '../lib/models/horizontal'
import { PulseVisualizationModelOptions } from '../lib/models/pulse'

const BUILD_CUSTOM_MODEL_LINK =
  'https://github.com/bibekg/react-audio-viz#building-a-custom-visualization-model'

const Step = styled.h2`
  margin: 14px 0;
`

const Wrapper = styled.div`
  ${Step} a {
    color: ${props => props.textColor};
    font-size: 0.6em;
    text-decoration: underline;
    margin-bottom: 10px;
  }
`

const Content = styled.div``

const makeDemoReactCode = (modelName, configObject) => `
  import * as React from 'react'
  import {useVisualizer, models} from 'react-audio-viz'

  const Visualizer = () => {
    const audioRef = React.useRef(null)
    const [AudioViz, init] = useVisualizer(audioRef)

    return (
      <div>
        <audio ref={audioRef} onPlay={init} src={...} />
        <AudioViz
          model={models.${modelName}(${inspect(configObject)
  .replace('{ ', '{\n  ')
  .replace(' }', '\n}')
  .replace(/\n/g, '\n          ')})}
        />
      </div>
    )
  }
`
interface StyledTabsProps extends React.ComponentProps<typeof Tabs> {
  fgColor: string
}

interface StyledTabProps extends React.ComponentProps<typeof Tab> {
  fgColor: string
}

const StyledTabs = withStyles({
  indicator: (props: StyledTabsProps) => ({
    backgroundColor: props.fgColor,
  }),
})((props: StyledTabsProps) => <Tabs {...props} />)

const StyledTab = withStyles({
  root: (props: StyledTabProps) => ({
    borderBottom: `2px solid ${transparentize(0.5, props.fgColor)}`,
    '&:hover': {
      color: props.fgColor,
      opacity: 1,
    },
    '&$selected': {
      color: props.fgColor,
    },
    '&:focus': {
      color: props.fgColor,
    },
    color: props.fgColor,
  }),
})((props: StyledTabProps) => <Tab disableRipple {...props} />)

interface Props {
  config:
    | PolarVisualizationModelOptions
    | HorizontalVisualizationModelOptions
    | PulseVisualizationModelOptions
    | null
  configUpdater: any
  textColor: string
  bgColor: string
  history: any
}

const Configurator = ({ config, configUpdater, textColor, history }: Props) => {
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

  const handleCallToRouter = value => {
    history.push(value)
  }

  return (
    <Wrapper textColor={textColor}>
      <Step>
        Choose a visualization model...
        <div>
          <a href={BUILD_CUSTOM_MODEL_LINK}>(or build your own)</a>
        </div>
      </Step>
      <StyledTabs
        fgColor={textColor}
        variant="fullWidth"
        value={history.location.pathname}
        onChange={handleCallToRouter}
      >
        {models.map(({ name, path }) => (
          <StyledTab
            value={path}
            fgColor={textColor}
            component={NavLink}
            label={name}
            key={name}
            to={path}
          />
        ))}
      </StyledTabs>
      <Step>...then fine tune the model's settings</Step>
      <Content>
        <Switch>
          {models.map(({ name, path, Component }) => (
            <Route key={name} path={path}>
              {config && (
                <Component
                  config={config}
                  configUpdater={configUpdater}
                  textColor={textColor}
                />
              )}
            </Route>
          ))}
          <Route>
            <Redirect to={models[0].path} />
          </Route>
        </Switch>
        <Step>It's that easy!</Step>
        {models.map(({ name, path }) => (
          <Route key={name} path={path}>
            <snippet-highlight
              theme="dark"
              language="jsx"
              content={makeDemoReactCode(name, config)}
            />
          </Route>
        ))}
      </Content>
    </Wrapper>
  )
}
export default withRouter(Configurator)
