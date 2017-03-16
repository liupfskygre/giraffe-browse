module.exports = () => {
  let hit =
    { hitid: 'gi|68475779|ref|XP_718096.1|'
    , species: 'tropicalis'
    , def: 'hypothetical protein CaO19.5760 [Candida albicans SC5314]'
    , name: 'IHD1'
    , accession: 'XP_718096'
    , uniprot: 'Q5A8I8'
    , cgdid: 'CAL0000194292'
    , refseq: 'XP_719068'
    , len: '512'
    , bitscore: '115.161'
    , evalue: '3.09451e-28'
    , qfrom: '3'
    , qto: '60'
    , hfrom: '1'
    , hto: '58'
    , gaps: '0'
    , alignlen: '58'
    , contig:
      { head: 'C381466'
      , seq: `
	  AAAAACGAGAGAAAAAAAAAATTCTTCCTTTCAACGAAAACAAAAGCCCAA
	  CATCATGTCTATGTATCCACAACGTACACAGCATCAACAACGTTTGACTGA
	  GTTGTTGGACGCTATCAAGTCTGAGTTTGATTATGCTTTAAACGAAGCCAG
	  CAGTTTCAAAAAGGTCCAAGAAGACTATGACACCAAGTACCAGCAACAAGC
	  TGCTGAAATGCAACAAATCCGTCAAACTGTTTACGAATTGGAAATGGCACA
	  CAGAAAAATCAAAGAAGCATACGAAGAGGAAATTTTAAGATTGAAAAACGA
	  GTTGGACAATAGAGATAGACAAATGAAAAATGGTTACCAACAACCTCCTCC
	  TCCCCAAACTCAACCACAACAACAACCACAACAAC
        `
      }
    , protein:
      { head: 'scaffold9.g322.t1 hypothetical GPI-anchored|GO:0016020'
      , seq: 'mrkttlffallqialaakradddcndhctaalakqnscggsgdagtqsetlkclckdedyw...'
      , headid: 'scaffold9.g322.t1'
      , goids: [ 'GO:0016020' ]
      }
    }

  hit.contig.seq = hit.contig.seq.replace(/[^ACTG]/g, '')

  return hit
}
