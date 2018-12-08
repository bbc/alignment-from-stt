// https://github.com/google/diff-match-patch
// wiki - https://github.com/google/diff-match-patch/wiki
// API - https://github.com/google/diff-match-patch/wiki/API
// word diff - https://github.com/google/diff-match-patch/wiki/Line-or-Word-Diffs
// npm - https://www.npmjs.com/package/diff-match-patch
// node module - https://github.com/JackuB/diff-match-patch
// js - https://github.com/google/diff-match-patch/wiki/Language:-JavaScript
// Plain Text vs. Structured Content - https://github.com/google/diff-match-patch/wiki/Plain-Text-vs.-Structured-Content
// diff_linesToChars -> diff_linesToWords https://github.com/google/diff-match-patch/blob/master/javascript/diff_match_patch_uncompressed.js#L248
// lineEnd = text.indexOf('\n', lineStart);
// https://github.com/google/diff-match-patch/blob/master/javascript/diff_match_patch_uncompressed.js#L492
// Change this line to look for any runs of whitespace, not just end of lines.
// https://github.com/google/diff-match-patch/issues/16#issuecomment-392136654

// const DiffMatchPatch = require('diff-match-patch');
const DiffMatchPatch = require('./index.js');

function diff_lineMode(text1, text2) {
    var dmp = new DiffMatchPatch();
    var a = dmp.diff_linesToChars_(text1, text2);
    var lineText1 = a.chars1;
    var lineText2 = a.chars2;
    var lineArray = a.lineArray;
    var diffs = dmp.diff_main(lineText1, lineText2, false);
    dmp.diff_charsToLines_(diffs, lineArray);
    return diffs;
  }
const textOne = "Today: Armenia has a long history of invasion and turbulence but it’s just manageda bloodless revolution."
const textTwo = "Armenia has a INSERTION history of INSERTION INSERTION invasion and turbulence but it’s just revolution."
const textTwoWordsObjects= [ {
  "word": "TODAY",
  "confidence": 1.0,
  "start": 5.4,
  "end": 5.99,
  "alignment": "aligned",
  "matching": {
    "ref": "TODAY",
    "hyp": "TODAY",
    "err": "correct"
  },
  "text": "Today:"
},
{
  "word": "ARMENIA",
  "confidence": 1.0,
  "start": 6.04,
  "end": 6.79,
  "alignment": "aligned",
  "matching": {
    "ref": "ARMENIA",
    "hyp": "ARMENIA",
    "err": "correct"
  },
  "text": "Armenia"
},
{
  "word": "HAS",
  "confidence": 1.0,
  "start": 6.79,
  "end": 7.03,
  "alignment": "aligned",
  "matching": {
    "ref": "HAS",
    "hyp": "HAS",
    "err": "correct"
  },
  "text": "has"
},
{
  "word": "A",
  "confidence": 1.0,
  "start": 7.03,
  "end": 7.1,
  "alignment": "aligned",
  "matching": {
    "ref": "A",
    "hyp": "A",
    "err": "correct"
  },
  "text": "a"
},
{
  "word": "LONG",
  "confidence": 1.0,
  "start": 7.1,
  "end": 7.37,
  "alignment": "aligned",
  "matching": {
    "ref": "LONG",
    "hyp": "LONG",
    "err": "correct"
  },
  "text": "long"
},
{
  "word": "HISTORY",
  "confidence": 1.0,
  "start": 7.37,
  "end": 7.84,
  "alignment": "aligned",
  "matching": {
    "ref": "HISTORY",
    "hyp": "HISTORY",
    "err": "correct"
  },
  "text": "history"
},
{
  "word": "OF",
  "confidence": 1.0,
  "start": 7.84,
  "end": 7.95,
  "alignment": "aligned",
  "matching": {
    "ref": "OF",
    "hyp": "OF",
    "err": "correct"
  },
  "text": "of"
},
{
  "word": "INVASION",
  "confidence": 1.0,
  "start": 7.95,
  "end": 8.62,
  "alignment": "aligned",
  "matching": {
    "ref": "INVASION",
    "hyp": "INVASION",
    "err": "correct"
  },
  "text": "invasion"
},
{
  "word": "AND",
  "confidence": 1.0,
  "start": 8.62,
  "end": 8.82,
  "alignment": "aligned",
  "matching": {
    "ref": "AND",
    "hyp": "AND",
    "err": "correct"
  },
  "text": "and"
},
{
  "word": "TURBULENCE",
  "confidence": 1.0,
  "start": 8.82,
  "end": 9.54,
  "alignment": "aligned",
  "matching": {
    "ref": "TURBULENCE",
    "hyp": "TURBULENCE",
    "err": "correct"
  },
  "text": "turbulence"
},
{
  "word": "BUT",
  "confidence": 1.0,
  "start": 9.91,
  "end": 10.18,
  "alignment": "aligned",
  "matching": {
    "ref": "BUT",
    "hyp": "BUT",
    "err": "correct"
  },
  "text": "but"
},
{
  "word": "IT'S",
  "confidence": 1.0,
  "start": 10.18,
  "end": 10.46,
  "alignment": "aligned",
  "matching": {
    "ref": "IT'S",
    "hyp": "IT'S",
    "err": "correct"
  },
  "text": "it’s"
},
{
  "word": "JUST",
  "confidence": 1.0,
  "start": 10.46,
  "end": 10.79,
  "alignment": "aligned",
  "matching": {
    "ref": "JUST",
    "hyp": "JUST",
    "err": "correct"
  },
  "text": "just"
},
{
  "word": "MANAGED",
  "confidence": 1.0,
  "start": 10.79,
  "end": 11.24,
  "alignment": "aligned",
  "matching": {
    "ref": "MANAGED",
    "hyp": "MANAGED",
    "err": "correct"
  },
  "text": "managed"
},
{
  "word": "A",
  "confidence": 1.0,
  "start": 11.24,
  "end": 11.3,
  "alignment": "aligned",
  "matching": {
    "ref": "A",
    "hyp": "A",
    "err": "correct"
  },
  "text": "a"
},
{
  "word": "BLOODLESS",
  "confidence": 1.0,
  "start": 11.3,
  "end": 11.96,
  "alignment": "aligned",
  "matching": {
    "ref": "BLOODLESS",
    "hyp": "BLOODLESS",
    "err": "correct"
  },
  "text": "bloodless"
},
{
  "word": "REVOLUTION",
  "confidence": 1.0,
  "start": 11.96,
  "end": 12.64,
  "alignment": "aligned",
  "matching": {
    "ref": "REVOLUTION",
    "hyp": "REVOLUTION",
    "err": "correct"
  },
  "text": "revolution."
}
]

const diffLineMode = diff_lineMode(textOne,textTwo);
console.log(diffLineMode)

console.log('----');

function countWords(text){
  return text.trim().split(' ').length;
}

function transposeTimecodeToWord(text, word){
  return {start: word.start, end: word.end, text: text}
}

function transposeTimecodesToLine(){

}
// using words indexes
function getSentenceSegment(text, startIndex, endIndex){
  let list =  text.split(' ');
  return list.splice(startIndex,endIndex).join(' ');
}

function currentWordObjectsSegment(list, startIndex, endIndex){

}

let results = [];

let wordIndexCounter =0;
diffLineMode.forEach((tupple)=>{
  let typeOfDiff = tupple[0];
  let matchedWords = tupple[1];
  // deletion 
  if( typeOfDiff === -1){
    wordIndexCounter+=countWords(matchedWords);
    
    console.log(typeOfDiff, matchedWords, countWords(matchedWords),wordIndexCounter)
    //TODO: get from previous and next. if present.
    // TODO: + interpolate the rest.
  }
  // match 
  else if( typeOfDiff === 0){
    let indexStartMatch = wordIndexCounter;
    wordIndexCounter+=countWords(matchedWords);
    let indexEndMatch = wordIndexCounter;
    let currentSentenceSegment = getSentenceSegment(textTwo,indexStartMatch, indexEndMatch)
    console.log(currentSentenceSegment);
    // let currentWordObjectsSegment = currentWordObjectsSegment(textTwoWordsObjects,indexStartMatch, indexEndMatch)
    // console.log(transposeTimecodeToWord(matchedWords.split(' ')[0],textTwoWordsObjects[wordIndexCounter]))
    console.log(typeOfDiff, matchedWords, countWords(matchedWords), wordIndexCounter, indexStartMatch, indexEndMatch)
    //TODO: Transpose timecodes for matched section. 
  }
  // insertion 
  else if ( typeOfDiff ===+1){
    console.log(tupple)
    // TODO: interpolate between words on either side
  }
})

