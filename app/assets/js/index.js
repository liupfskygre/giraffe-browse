const Action = require('./actions')
let action = new Action()

$('.search').on('click', () => {
  action.cleanForm()
})

