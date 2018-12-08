const compareWordsInSentence = require('./compare-sentences/index.js');

function getTextFromListOfWordsObjects(timecodedWordsList){
    let wordsList = timecodedWordsList.map((word)=>{
        return word.text;
    })

    return wordsList.join(' ');
}

function compare(stringOne, stringTwo){
    // TODO: could also strip out punctuation.
    return stringOne.toLowerCase() === stringTwo.toLowerCase();
}


function alignSegment(correctText,wordsWithTimecodes){
    const correctTextWordsList = correctText.split(' ');
    const numberOfWordsWithTimecodes = wordsWithTimecodes.length;
    const numberOfCorrectWords = correctTextWordsList.length;

     // if the number of correct words is the same as number of words with timecodes
     // it might be the same OR there might had been substitutions.
    if(numberOfCorrectWords === numberOfWordsWithTimecodes){
        console.log('same number of numberOfCorrectWords and numberOfWordsWithTimecodes');
        // if it's the same
        // console.log(correctTextWordsList.join(' '), getTextFromListOfWordsObjects(wordsWithTimecodes))
        const correctTextWordsListString = correctTextWordsList.join(' ');
        const wordsWithTimecodesString = getTextFromListOfWordsObjects(wordsWithTimecodes)
        console.log(compare(correctTextWordsListString, wordsWithTimecodesString ))
        // if they are already the same 
        if(compare(correctTextWordsListString, wordsWithTimecodesString )){
            // TODO: could add step to transpose word, to adjust capitalization if needed.
            // also consider transposing punctuation
            return wordsWithTimecodes;
        }
        // if they are not the same
        else{
            console.log(correctTextWordsListString+'\n\n', wordsWithTimecodesString)
            return compareWordsInSentence(correctTextWordsListString ,wordsWithTimecodesString)
        }
        // if there are subsitutions
    }
    // if the number of correct words is greater then the number of words with timecodes
    // there might have been deletion in the STT results
    else if(numberOfCorrectWords > numberOfWordsWithTimecodes){
        console.log('numberOfCorrectWords > numberOfWordsWithTimecodes');
        
    }
    // if the number of the correct words is less the number of words with timecodes
    // there might have been insertion in the STT results
    else if(numberOfCorrectWords < numberOfWordsWithTimecodes){
        console.log('numberOfCorrectWords < numberOfWordsWithTimecodes');
    }
    else{
        console.error('something went wrong',numberOfCorrectWords, numberOfWordsWithTimecodes);
    }

    
}


function compareWords(wordOne, wordTwo){
    return wordOne === wordTwo
}



// console.log(alignSegment('hello', 'yolo'))
// console.log(alignSegment('hello', 'hello'))

module.exports = alignSegment;