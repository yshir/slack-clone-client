import developmentConfig from './development'
import productionConfig from './production'

const config = {
  development: developmentConfig,
  production: productionConfig,
}

export default config[process.env.APP_ENV]
