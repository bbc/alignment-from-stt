"use strict";
const fs = require('fs');
const align = require('./index.js');

const automatedTranscription = require('../../sample-data/kaldi-alignments.json').words;
// array of words, each .end, .start., .transcript_text;
const humanCorrectedTranscription = fs.readFileSync('./sample-data/human-transcription-on-one-line.txt').toString();

const expectedOutput = require('../../sample-output/sample-line-aligned-output.json')


test('add line break between sentences', () => {
    const reAlignedTranscription = align(humanCorrectedTranscription,automatedTranscription);

  	expect(reAlignedTranscription).toEqual(expectedOutput);
});


test('add line break between sentences,with optional honorifics', () => {
	const reAlignedTranscription = align(humanCorrectedTranscription,automatedTranscription);
  	expect(reAlignedTranscription).toEqual(expectedOutput);
});
