let express = require('express')
  , logger = require('morgan')
  , app = express()
  , addRoutes = require('./routes')
  , port = process.env.PORT || 3000
  , path = require('path')
  , connectDatabase = require('./database.js')
  , cache = require('express-cache-headers')
// , basicAuth = require('basic-auth-connect')

// app.use(basicAuth('ibers', 'candida'))
app.use(cache(300))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'assets', 'build')))
addRoutes(app)

connectDatabase()

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
