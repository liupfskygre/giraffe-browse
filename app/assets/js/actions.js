class Actions {

  cleanForm () {
    $('input').each((index, obj) => {
      if ($(obj).val() === '') {
        $(obj).remove()
      }
    })

    $('select').each((index, obj) => {
      if ($(obj).val() === '') {
        $(obj).remove()
      }
    })

    if ($('textarea').val() === '') {
      $('textarea').remove()
    }
  }

  reverseCompliment () {
    let seq = $('.coding').text().split('').reverse().join('')

    seq = seq.replace(/[ACTG]/g, (base) => {
      return 'ACTG'.charAt('TGAC'.indexOf(base))
    })

    $('.coding').text(seq)
  }

}

module.exports = Actions
