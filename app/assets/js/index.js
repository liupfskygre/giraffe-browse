const Action = require('./actions')
let action = new Action()

$('.echo').on('click', () => {
  action.echo()
})
