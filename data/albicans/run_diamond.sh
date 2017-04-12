./diamond makedb --in candida_albicans_proteins.fa -d albicans_ref -p 8

./diamond blastx -d albicans_ref.dmnd -q ../shehate/candida_shehate_codingseq.fa -o ../shehate/blastx_shehate_codingseq_albicans_proteins.xml -p 8 -f 5
./diamond blastx -d albicans_ref.dmnd -q ../tropicalis/candida_tropicalis_codingseq.fa -o ../tropicalis/blastx_tropicalis_codingseq_albicans_proteins.xml -p 8 -f 5
./diamond blastx -d albicans_ref.dmnd -q ../boidinii/candida_boidinii_codingseq.fa -o ../boidinii/blastx_boidinii_codingseq_albicans_proteins.xml -p 8 -f 5

xml2json ../shehate/blastx_shehate_codingseq_albicans_proteins.xml ../shehate/blastx_shehate_codingseq_albicans_proteins.json
xml2json ../tropicalis/blastx_tropicalis_codingseq_albicans_proteins.xml ../tropicalis/blastx_tropicalis_codingseq_albicans_proteins.json
xml2json ../boidinii/blastx_boidinii_codingseq_albicans_proteins.xml ../boidinii/blastx_boidinii_codingseq_albicans_proteins.json

rm ../shehate/blastx_shehate_codingseq_albicans_proteins.xml
rm ../tropicalis/blastx_tropicalis_codingseq_albicans_proteins.xml
rm ../boidinii/blastx_boidinii_codingseq_albicans_proteins.xml
