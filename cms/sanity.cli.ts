import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'theoverdoneeffect',
  api: {
    projectId: 'zllfb0bg',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
