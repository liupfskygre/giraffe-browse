module.exports = (codingSeq, contig) => {
  let codingLength = codingSeq.length
    , start = 0
    , end = 0
    , selector = 12
    , fail = false

  start = contig.indexOf(codingSeq.substring(0, selector))
  end = contig.indexOf(codingSeq.substring(codingLength - selector, codingLength)) + selector

  if (start < 0 && end <= selector) fail = true
  if (start === -1) start = 0
  if (end <= selector) end = contig.length

  return { start, end, fail }
}

