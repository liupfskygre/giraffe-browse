const Clipboard = require('clipboard')

class Actions {

  cleanForm () {
    $('input').each((index, obj) => {
      if ($(obj).val() === '') {
        $(obj).remove()
      }
    })

    if ($('select').val() === '') {
      $('select').remove()
    }

    if ($('textarea').val() === '') {
      $('textarea').remove()
    }
  }

  copyCoding () {
    let highlight = $('.contig')[0]
      , start = parseInt($(highlight).attr('start'))
      , end = parseInt($(highlight).attr('end'))
      , fail = $(highlight).attr('fail')
      , plusminus = parseInt($('.plusminus').val()) || 0

    if (fail) {
      $('.infobox').text('Coding sequence couldn\'t be found.')
    } else {
      let contig = $('.contig').text()
        , before = contig.substr(start - plusminus, plusminus)
        , after = contig.substr(end + start, plusminus)
        , coding = $('.highlight').text()

      $('.hidden-box').text(before + coding + after)

      let clip = new Clipboard('.copybutton')

      clip.on('success', (e) => {
        $('.infobox').text('Sequence copied!')
        $('.hidden-box').hide()
        e.clearSelection()
      })

      clip.on('error', () => {
        $('.infobox').text('Can\'t copy in this browser! :(')
      })
    }
  }

  highlight () {
    let highlight = $('.contig')[0]
      , fail = $(highlight).attr('fail')

    if (fail) {
      console.log('Coding sequence couldn\'t be found in contig!')
      return
    } else {
      let start = $(highlight).attr('start')
        , end = $(highlight).attr('end')
        , coding = highlight.innerHTML.substr(start, end)
        , regex = new RegExp(coding, 'gi')

      highlight.innerHTML = highlight.innerHTML.replace(regex, function (match) {
        return '<span class="highlight">' + match + '</span>'
      })
    }
  }

}

module.exports = Actions
