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
