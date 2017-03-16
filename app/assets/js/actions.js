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

}

module.exports = Actions
