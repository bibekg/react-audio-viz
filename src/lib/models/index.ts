import polar, { DEFAULT_OPTIONS as polarDefaults } from './polar'
import horizontal, { DEFAULT_OPTIONS as horizontalDefaults } from './horizontal'
import pulse, { DEFAULT_OPTIONS as pulseDefaults } from './pulse'

export default { polar, horizontal, pulse }
export const defaultOptions = {
  polar: polarDefaults,
  horizontal: horizontalDefaults,
  pulse: pulseDefaults,
}
