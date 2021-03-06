// TODO
// Clean this up to use proper mock data and the import scripts fucntion & reverse complement

const assert = require('assert')
const fasta2json = require('fasta2json')
const fasta = __dirname + '/../data/prokka-ecoli.fa'
const realCDS = 'ATGAAACTCTACAATCTGAAAGATCACAACGAGCAGGTCAGCTTTGCGCAAGCCGTAACCCAGGGGTTGGGCAAAAATCAGGGGCTGTTTTTTCCGCACGACCTGCCGGAATTCAGCCTGACTGAAATTGATGAGATGCTGAAGCTGGATTTTGTCACCCGCAGTGCGAAGATCCTCTCGGCGTTTATTGGTGATGAAATCCCACAGGAAATCCTGGAAGAGCGCGTGCGCGCGGCGTTTGCCTTCCCGGCTCCGGTCGCCAATGTTGAAAGCGATGTCGGTTGTCTGGAATTGTTCCACGGGCCAACGCTGGCATTTAAAGATTTCGGCGGTCGCTTTATGGCACAAATGCTGACCCATATTGCGGGTGATAAGCCAGTGACCATTCTGACCGCGACCTCCGGTGATACCGGAGCGGCAGTGGCTCATGCTTTCTACGGTTTACCGAATGTGAAAGTGGTTATCCTCTATCCACGAGGCAAAATCAGTCCACTGCAAGAAAAACTGTTCTGTACATTGGGCGGCAATATCGAAACTGTTGCCATCGACGGCGATTTCGATGCCTGTCAGGCGCTGGTGAAGCAGGCGTTTGATGATGAAGAACTGAAAGTGGCGCTAGGGTTAAACTCGGCTAACTCGATTAACATCAGCCGTTTGCTGGCGCAGATTTGCTACTACTTTGAAGCTGTTGCGCAGCTGCCGCAGGAGACGCGCAACCAGCTGGTTGTCTCGGTGCCAAGCGGAAACTTCGGCGATTTGACGGCGGGTCTGCTGGCGAAGTCACTCGGTCTGCCGGTGAAACGTTTTATTGCTGCGACCAACGTGAACGATACCGTGCCACGTTTCCTGCACGACGGTCAGTGGTCACCCAAAGCGACTCAGGCGACGTTATCCAACGCGATGGACGTGAGTCAGCCGAACAACTGGCCGCGTGTGGAAGAGTTGTTCCGCCGCAAAATCTGGCAACTGAAAGAGCTGGGTTATGCAGCCGTGGATGATGAAACCACGCAACAGACAATGCGTGAGTTAAAAGAACTGGGCTACACTTCGGAGCCGCACGCTGCCGTAGCTTATCGTGCGCTGCGTGATCAGTTGAATCCAGGCGAATATGGCTTGTTCCTCGGCACCGCGCATCCGGCGAAATTTAAAGAGAGCGTGGAAGCGATTCTCGGTGAAACGTTGGATCTGCCAAAAGAGCTGGCAGAACGTGCTGATTTACCCTTGCTTTCACATAATCTGCCCGCCGATTTTGCTGCGTTGCGTAAATTGATGATGAATCATCAGTAA' // eslint-disable-line
const contigs = fasta2json.ReadFasta(fasta)
const contig = contigs[0].seq
const gff =
  { type: 'CDS'
  , start: '3734'
  , end: '5020'
  , score: '.'
  , strand: '+'
  , phase: '0'
  , attributes:
    { ID: 'FNAFGOFC_00003'
    , Name: 'thrC'
    , gene: 'thrC'
    , inference: 'ab initio prediction:Prodigal:2.6,similar to AA sequence:UniProtKB:P00934'
    , product: 'Threonine synthase'
    }
  }

const cds = contig.substring(gff.start - 1, gff.end)

describe('Testing CDS selection', () => {
  it('should match the mock data', () => {
    assert.equal(cds.length, realCDS.length, 'Incorrect CDS length')
    assert.equal(cds, realCDS, 'Incorrect CDS')
  })
})

