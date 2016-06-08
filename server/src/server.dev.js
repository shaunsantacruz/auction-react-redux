import express from 'express'
//import path from 'path'

import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import React from 'react'
import { RouterContext, match } from 'react-router'
import {createLocation} from 'history'

import routes from '../../common/routes'
import configureStore from '../../common/configureStore'
import createSocketServer from './socket-server'
import handleSocketEvents from './socket-events'
//import cors from 'cors'
import webpack from 'webpack'
import webpackConfig from '../../webpack.config.dev'
const compiler = webpack(webpackConfig)

//set env vars
let config = {}
if (process.env.NODE_ENV === 'development') {
//process.env.PORT = process.env.PORT || 3000
  config.port = 8090
  config.host = 'localhost'
}

// Catch all unhandled node errors
process.on('uncaughtException', function (err) {
  console.log('unhandled node error', err)
})

const app = express()
const server = app.listen(config.port, config.host, function(err) {
  if (err) {
    console.log(err)
    return
  }
})
console.log('server listening on port: %s', config.port)


// create socket server
const {socketServer} = createSocketServer(server)
// Store for our app
const initialState = {};
const store = configureStore(initialState)
// Socket events
handleSocketEvents(socketServer, store)

//app.use(cors())

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))
app.use(require('webpack-hot-middleware')(compiler))
//app.use('/', express.static(path.join(__dirname, '..', 'static')))

app.get('/*', function(req, res) {
  const location = createLocation(req.url)
  match({ routes, location }, (err, redirectLocation, renderProps) => {

    //const clientStore = configureClientStore(initialState)
    // if(redirectLocation) {
    //   return res.status(302).end(redirectLocation)
    // }

    if(err) {
      console.error(err)
      return res.status(500).end('Internal server error')
    }

    if(!renderProps) {
      return res.status(404).end('Not found')
    }
    const InitialView = (
      <Provider store={store}>
          <RouterContext {...renderProps} />
      </Provider>
    )

    const finalState = store.getState()
    const html = renderToString(InitialView)
    res.status(200).end(renderFullPage(html, finalState))
  })
})
// goes inside initialView

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>Auction</title>
      </head>
      <body>
        <container id="app">${html}</container>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/assets/bundle.js"></script>
      </body>
    </html>
  `
}