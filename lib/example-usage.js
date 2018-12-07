const fs = require('fs');
const align = require('./index.js');
const automatedTranscription = require('../sample-data/kaldi-alignments.json').words;
// array of words, each .end, .start., .transcript_text;
const humanCorrectedTranscription = fs.readFileSync('./sample-data/human-transcription-on-one-line.txt').toString();

const reAlignedTranscription = align(humanCorrectedTranscription,automatedTranscription);

// generate example file for automated testing 
// fs.writeFileSync('./sample-output/sample-line-aligned-output.json',JSON.stringify(reAlignedTranscription,null,2) )
console.log(reAlignedTranscription)