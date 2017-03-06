let home = require('jade').compileFile(__dirname + '/assets/templates/index.jade')
  , gene = require('jade').compileFile(__dirname + '/assets/templates/gene.jade')

module.exports = (app) => {

  app.get('/gene/:id', (req, res, next) => {
    try {
      let html = gene({ title: 'Home' })
      res.send(html)
    } catch (e) {
      next(e)
    }
  })

  app.get('*', (req, res, next) => {
    try {
      let html = home({ title: 'Home' })
      res.send(html)
    } catch (e) {
      next(e)
    }
  })

  return app
}
