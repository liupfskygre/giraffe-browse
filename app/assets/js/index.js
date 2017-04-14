const Action = require('./actions')
let action = new Action()

$('.search').on('click', () => {
  action.cleanForm()
})

$('.copybutton').on('click', (e) => {
  e.preventDefault()
  action.copyCoding()
})

if ($('.contig').length) {
  action.highlight()
}
