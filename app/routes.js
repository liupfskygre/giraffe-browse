const HitController = require(__dirname + '/controllers/hit.js')
const ContigController = require(__dirname + '/controllers/contig.js')

module.exports = (app) => {

  app.get('/hit/:id?', (req, res, next) => {
    try {
      let hit = new HitController(req, res, app.meta)
      if (req.params.id) {
        hit.view({ _id: req.params.id }, req.query)
      } else {
        hit.search(req.query)
      }
    } catch (e) {
      next(e)
    }
  })

  app.get('/contig/:id', (req, res, next) => {
    try {
      let contig = new ContigController(req, res)
      if (req.params.id) {
        contig.view({ _id: req.params.id })
      }
    } catch (e) {
      next(e)
    }
  })

  app.get('*', (req, res, next) => {
    try {
      req.fields = app.fields
      let hits = new HitController(req, res, app.meta)
      hits.search(req.query)
    } catch (e) {
      next(e)
    }
  })

  return app
}
