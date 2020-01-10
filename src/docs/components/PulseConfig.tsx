import * as React from 'react'
import { CompactPicker as ColorPicker } from 'react-color'
import Grid from '@material-ui/core/Grid'

import { PulseVisualizationModelOptions } from '../../lib/models/pulse'
import Slider from './Slider'

interface Props {
  config: PulseVisualizationModelOptions
  configUpdater: any
  textColor: string
}

const PulseConfig = ({ config, configUpdater, textColor }: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
        <h3>Frequency Range</h3>
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

export default PulseConfig
