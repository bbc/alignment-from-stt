/**
 * Using levenshtein to align transcription 
 * to do line level alignement. 
 */
const fs = require('fs')
// Word Error Rate, WER, algorithm module 
const Levenshtein = require('fast-levenshtein');
var textSegmentation = require('../text-segmentation/index.js');
// Kaldi Transcription Json

function align(accurateBaseText,automatedTranscription){
    // Lines text to align, array of lines strings. - programmatic you need honorifics to break on full stop.
    // TODO: could segment text using this module
    // https://github.com/pietrop/subtitlesComposer/tree/master/text_segmentation
    // const lines = require('./not-welcome-here-lines')
    
    // remove this char ’
    var sanitizedAccurateBaseText = accurateBaseText.replace(/’/g,"'");
    // Array of human transcription text segmented into lines 
    var accurateBaseTextLines = textSegmentation(sanitizedAccurateBaseText);
    // word error distance for WER, start with high number
    let currentDist = 10000
    // first line taken into consideration 
    let currentLine = 0
    // timecode start of the sentence -> from STT system
    const firstWord = automatedTranscription[0];
    let currentStart = firstWord.start
  
    // timecode end of the sentence -> from STT System 
    let currentEnd = 0
    // the list of words that compose the sentence we are currently looking at.
    let currentSentence = []
    // array of sentence 
    const transcript = []
    /**
     * every word from the alignement 
     * is looking at levenshtein distance of between the current sentence from the STT system(eg Kaldi) 
     * and the line from the original text (Manual accurate transcription )
     * 
     * 
     *  at a high level The idea is: 
     * If you are adding the right word to the sentence the levenshtein distance is going to decrease. 
     * If the levenshtein is increasing it means you are going into another sentence
     * 
     * so that gives you beginning and end time-code for that sentence.
     * 
     * Never looking into the actual words from STT system (eg Kaldi) only considering the timecodes.
     * 
     */
    automatedTranscription.forEach((word, i) => {
        // Works out the distance between current sentence + current word vs current line.
        // take the current sentence array, add current word string, join into a string, and compare that to the line from the base transcription.
        // returns the number of letters that are different. eg if same words 0.

        //  word.transcript_text ==> is the text in the transcription word object.
        // TODO: change this to .text  or something more API compatible 

        // adds a word at a time to current sentence

        const dist = Levenshtein.get([...currentSentence, word.transcript_text].join(' '), accurateBaseTextLines[currentLine])
       
        // distance calculate is inferior to current distance, 
        // means you are adding the word, coz it's matching the original string in base transcription line
        //
        // if the distance is getting smaller you found right word and adding to the stentece.
        if (dist < currentDist) {
            // currentEnd is the timecode for the end of the line 
            // the last time code of the sentence
            currentEnd = word.end
            // change distance to current distance
            currentDist = dist
            
            // add word to the sentence 
            // TODO: word.end, and word.start could be added here to get word level timing.
                // currentLine split onto space, and then ... TBC to figure out
            currentSentence.push(word.transcript_text)
            
        }
        else {
            // console.log(currentSentence.join(' '));
            // console.log(accurateBaseTextLines[currentLine])
            
            // If the distance increases, then we got to the end of the line that matches.
            transcript.push({
                start: currentStart,
                end: currentEnd,
                // getting line from base transcription 
                text: accurateBaseTextLines[currentLine],
                words: []
            })
            // move onto next line
            currentLine++
            // reset all values
            currentDist = 10000
            // using the last word that did not fit in previous sentence.
            currentStart = word.start
            // 
            currentEnd = word.end
            // rest current sentence word list with unmatched word from ASR
            
            currentSentence = [word.transcript_text]

            // still got some lines to align but algorithm has run over. 
            // emperically not happened, but edge case.
            if (currentLine >= accurateBaseTextLines.length) {
                console.error("OOOOPS", i, automatedTranscription.length)
            }
        }
    })

    return transcript;
}

module.exports = align;


