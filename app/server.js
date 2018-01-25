let express = require('express')
  , logger = require('morgan')
  , app = express()
  , addRoutes = require('./routes')
  , port = process.env.PORT || 3000
  , path = require('path')
  , connectDatabase = require('./database.js')
  , cache = require('express-cache-headers')
  , compression = require('compression')
  , MetadataController = require('./controllers/metadata')

app.use(cache(31536000))
app.use(logger('combined'))
app.use(compression())
app.use(express.static(path.join(__dirname, 'assets', 'build')))
addRoutes(app)

connectDatabase()

const Meta = new MetadataController()
Meta.getMeta().then((data) => {
  app.meta = data
}).catch((err) => { console.log(err) })

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
