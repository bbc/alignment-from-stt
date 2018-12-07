const fs = require('fs');
const align = require('./index.js');
const automatedTranscription = require('../sample-data/kaldi-alignments.json').words;
// array of words, each .end, .start., .transcript_text;
const humanCorrectedTranscription = fs.readFileSync('./sample-data/human-transcription-on-one-line.txt').toString();

var reAlignedTranscription = align(humanCorrectedTranscription,automatedTranscription);

console.log(reAlignedTranscription)