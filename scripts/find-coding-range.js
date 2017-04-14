module.exports = (codingSeq, contig) => {
  let codingLength = codingSeq.length
    , start = 0
    , end = 0
    , selector = 12

  start = contig.indexOf(codingSeq.substr(0, selector))
  end = contig.indexOf(codingSeq.substr(codingLength - selector, codingLength)) + selector - start

  if (start === 0 && end === 0) return {}

  return { start, end }
}
