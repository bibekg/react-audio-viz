import * as React from 'react'
import { CompactPicker as ColorPicker } from 'react-color'
import Grid from '@material-ui/core/Grid'

import { PolarVisualizationModelOptions } from '../../lib/models/polar'
import Switch from './Switch'
import Slider from './Slider'

interface Props {
  config: PolarVisualizationModelOptions
  configUpdater: any
  textColor: string
}

const PolarConfig = ({ config, configUpdater, textColor }: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid container item alignItems="flex-start" spacing={2}>
        <Grid item>
          <h3>Dark Mode</h3>
          <Switch
            checked={config.darkMode}
            onChange={event =>
              configUpdater(config, 'darkMode')(event.target.checked)
            }
          />
        </Grid>

        <Grid item>
          <h3>Reverse Direction</h3>
          <Switch
            checked={config.reversed}
            onChange={event =>
              configUpdater(config, 'reversed')(event.target.checked)
            }
          />
        </Grid>

        <Grid item>
          <h3>Color</h3>
          <div>
            <ColorPicker
              color={config.color}
              onChangeComplete={color =>
                configUpdater(config, 'color')(color.hex)
              }
            />
          </div>
        </Grid>
      </Grid>

      <Grid container item alignItems="flex-start" spacing={2}>
        <Grid item md={6}>
          <h3>Scale</h3>
          <Slider
            name="scale"
            color={textColor}
            valueLabelDisplay="auto"
            aria-label="scale slider"
            min={0}
            max={5.0}
            step={0.5}
            marks={true}
            value={Number(config.scale)}
            onChange={(event, value) => configUpdater(config, 'scale')(value)}
          />
        </Grid>
        <Grid item md={6}>
          <h3>Bin Size</h3>
          <Slider
            name="scale"
            color={textColor}
            valueLabelDisplay="auto"
            aria-label="scale slider"
            min={25}
            max={100}
            step={25}
            marks={true}
            value={Number(config.binSize)}
            onChange={(event, value) => configUpdater(config, 'binSize')(value)}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PolarConfig
