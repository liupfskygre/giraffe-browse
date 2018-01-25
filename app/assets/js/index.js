const Action = require('./actions')
let action = new Action()

$('.search').on('click', () => {
  action.cleanForm()
})

$('.reverse').on('click', () => {
  action.reverseCompliment()
})

const Clipboard = require('clipboard')

let clip = new Clipboard('.copybutton', { })

clip.on('success', (e) => {
  if (e.text) {
    $('.infobox').text('Sequence copied!')
  } else {
    $('.infobox').text('Coding sequence couldn\'t be found.')
  }
  $('.hidden-box').hide()
  e.clearSelection()
})

clip.on('error', () => {
  $('.infobox').text('Can\'t copy in this browser:(')
})
