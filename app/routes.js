const HitController = require(__dirname + '/controllers/hit.js')

module.exports = (app) => {

  app.get('/hit/:id?', (req, res, next) => {
    try {
      let hit = new HitController(req, res)
      if (req.params.id) {
        hit.view({ _id: req.params.id })
      } else {
        hit.view(req.query)
      }
    } catch (e) {
      next(e)
    }
  })

  app.get('*', (req, res, next) => {
    try {
      let hit = new HitController(req, res)
      hit.listKnown()
    } catch (e) {
      next(e)
    }
  })

  return app
}
