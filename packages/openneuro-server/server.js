import Raven from 'raven'
import { createServer } from 'http'
import mongoose from 'mongoose'
import subscriptionServerFactory from './libs/subscription-server.js'
import mongo from './libs/mongo'
import { connect as redis_connect } from './libs/redis'
import { connect as resque_connect } from './libs/queue'
import notifications from './libs/notifications'
import aws from './libs/aws'
import config from './config'
import createApp from './app'
import packageJson from './package.json'

const redisConnect = async () => {
  try {
    const redis = await redis_connect(config.redis)
    await resque_connect(redis)
    // eslint-disable-next-line no-console
    console.log('Resque connected')
    // start background tasks
    notifications.initCron()
    aws.batch.initCron()
    aws.cloudwatch.initEvents().then(aws.batch.initQueue)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exit(1)
  }
}

const ravenConfig = {
  release: packageJson.version,
  environment: config.sentry.ENVIRONMENT,
  autoBreadcrumbs: true,
}
Raven.config(config.sentry.DSN, ravenConfig).install()

const app = createApp(false)

// Setup mongoose next to our old mongo lib
mongoose.connect(`${config.mongo.url}crn`)

// start server ----------------------------------------------------
mongo.connect(config.mongo.url).then(() => {
  redisConnect().then(() => {
    const server = createServer(app)
    server.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log('Server is listening on port ' + config.port)
      // Setup GraphQL subscription transport
      subscriptionServerFactory(server)
    })
  })
})
