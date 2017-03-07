const GeneController = require(__dirname + '/controllers/gene.js')

module.exports = (app) => {

  app.get('/gene', (req, res, next) => {
    try {
      let gene = new GeneController(req, res)
      gene.view()
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
