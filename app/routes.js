const GeneController = require(__dirname + '/controllers/gene.js')

module.exports = (app) => {

  app.get('/gene/:id?', (req, res, next) => {
    try {
      let gene = new GeneController(req, res)
      if (req.params.id) {
        gene.view({ _id: req.params.id })
      } else {
        gene.view(req.query)
      }
    } catch (e) {
      next(e)
    }
  })

  app.get('*', (req, res, next) => {
    let home = require('jade').compileFile(__dirname + '/assets/templates/index.jade')
    try {
      let html = home({ title: 'Home' })
      res.send(html)
    } catch (e) {
      next(e)
    }
  })

  return app
}
