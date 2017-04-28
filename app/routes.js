const HitController = require(__dirname + '/controllers/hit.js')
const HomeController = require(__dirname + '/controllers/home.js')

module.exports = (app) => {

  app.get('/hit/:id?', (req, res, next) => {
    try {
      let hit = new HitController(req, res)
      if (req.params.id) {
        hit.view({ _id: req.params.id }, req.query)
      } else {
        hit.search(req.query)
      }
    } catch (e) {
      next(e)
    }
  })

  app.get('*', (req, res, next) => {
    try {
      let home = new HomeController(req, res)
      home.render()
    } catch (e) {
      next(e)
    }
  })

  return app
}
