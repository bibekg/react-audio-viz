import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'

const CustomSlider = withStyles({
  root: {
    color: props => props.color || '#fff',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
    color: '#333',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  mark: {
    display: 'none',
  },
})(Slider)

export default CustomSlider
