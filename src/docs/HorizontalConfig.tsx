import * as React from 'react'
import { CompactPicker as ColorPicker } from 'react-color'
import Grid from '@material-ui/core/Grid'

import { HorizontalVisualizationModelOptions } from '../lib/models/horizontal'
import Switch from './Switch'
import Slider from './Slider'

interface Props {
  config: HorizontalVisualizationModelOptions
  configUpdater: any
  textColor: string
}

const HorizontalConfig = ({ config, configUpdater, textColor }: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid container item alignItems="flex-start" spacing={2}>
        <Grid item>
          <h6>Dark Mode</h6>
          <Switch
            checked={config.darkMode}
            onChange={event =>
              configUpdater(config, 'darkMode')(event.target.checked)
            }
          />
        </Grid>

        <Grid item>
          <h6>Reverse Direction</h6>
          <Switch
            checked={config.reversed}
            onChange={event =>
              configUpdater(config, 'reversed')(event.target.checked)
            }
          />
        </Grid>

        <Grid item>
          <h6>Color</h6>
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

      <Grid container item alignItems="flex-start" spacing={4}>
        <Grid item sm={12} lg={6}>
          <h6>Scale</h6>
          <Slider
            name="scale"
            color={textColor}
            valueLabelDisplay="auto"
            aria-label="scale slider"
            min={0}
            max={1.5}
            step={0.25}
            marks={true}
            value={Number(config.scale)}
            onChange={(event, value) => configUpdater(config, 'scale')(value)}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <h6>Bin Size</h6>
          <Slider
            name="scale"
            color={textColor}
            valueLabelDisplay="auto"
            aria-label="bin size slider"
            min={25}
            max={100}
            step={25}
            marks={true}
            value={Number(config.binSize)}
            onChange={(event, value) => configUpdater(config, 'binSize')(value)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <h6>Frequency Range</h6>
        <Slider
          name="scale"
          color={textColor}
          valueLabelDisplay="auto"
          aria-label="frequency range slider"
          min={0}
          max={24000}
          step={1000}
          marks={true}
          value={config.frequencyRange}
          onChange={(event, value) =>
            configUpdater(config, 'frequencyRange')(value)
          }
        />
      </Grid>
    </Grid>
  )
}

export default HorizontalConfig
