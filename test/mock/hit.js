module.exports = () => {
  let hit =
    { hitid: 'gi|353558886|sp|P0CY34.1|TUP1_CANAL'
    , species: 'shehate'
    , def: 'RecName: Full=Transcriptional repressor TUP1'
    , name: 'TUP1'
    , accession: 'P0CY34'
    , uniprot: 'P0CY34'
    , cgdid: 'CAL0000186393'
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
