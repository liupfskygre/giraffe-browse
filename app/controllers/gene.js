const template = require('jade').compileFile(__dirname + '/../assets/templates/gene.jade')

class GeneController {
  constructor (req, res) {
    this.id = req.params.id
    this.res = res
  }

  view () {
    let gene = this.retrieveGene(this.id)
      , html = template({ title: 'Gene', data: gene })
    this.res.send(html)
  }

  retrieveGene (id) {
    return { scaffold: id }
  }
}

module.exports = GeneController
