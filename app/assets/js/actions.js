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

  copy () {
    let highlight = $('.contig')[0]
      , start = parseInt($(highlight).attr('start'))
      , end = parseInt($(highlight).attr('end'))
      , fail = $(highlight).attr('fail')
      , plusminus = parseInt($('.plusminus').val()) || 0

    if (start === 0) start += plusminus

    if (fail) return null

    let contig = $('.contig').text()
      , before = contig.substr(start - plusminus, plusminus)
      , after = contig.substr(end, plusminus)
      , coding = $('.highlight').text()

    return plusminus ? before + '|' + coding + '|' + after : coding
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
        , coding = highlight.innerHTML.substring(start, end)
        , regex = new RegExp(coding, 'gi')

      highlight.innerHTML = highlight.innerHTML.replace(regex, function (match) {
        return '<span class="highlight">' + match + '</span>'
      })
    }
  }

}

module.exports = Actions
