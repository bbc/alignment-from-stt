function getTextFromWords(wordsList){
    let newWordsList = wordsList.map((word)=>{
        return word.text;
    })
    return newWordsList.join(' ');
}

/**
 * 
 * @param {string} text - single word as a string, accurate text
 * @param {object} word - word object - STT Generated
 * @param {float} word.start - start tiem in seconds
 * @param {float} word.end - end time in seconds
 * @param {string} word.text - word text
 * @return a word object, preserving timecodes, 
 * and swapping text attribute for accurate one
 */
function transposeWordTimecodes(text, word){
    return {
        start: word.start, 
        end: word.end,
        text: text
    }
}

// assumes, same length
function transposeSentenceTimecodes(text, words){
    let newWordListResult = [];
    const textList = text.split(' ');
    textList.forEach((textWord, index)=>{
       const currentWord =  words[index];
       newWordListResult.push(transposeWordTimecodes(textWord,currentWord))
    })
    return newWordListResult;
}

function countWords(text){
    return text.split(' ').length;
}

function isSameWord(wordOne, wordTwo){
    // // possible alternative implementation. <-- ?
    // const Levenshtein = require('fast-levenshtein');
    // if(levenshtein(normaliseText(wordOne), normaliseText(wordTwo))> 0) {
    //     return true;
    // }else{
    //     return false;
    // }
    if(wordOne === wordTwo){
        return true;
    }
    else{
        return false;
    }
}


function normalise(text){
    // TODO: remove punctuation
    // TODO: convert numbers eg 7 to seven.
    // https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
    return text.trim().toLowercase();
}

function compareWords(wordOne, wordTwo){
    const wordOneNormalised = normalise(wordOne);
    const wordTwoNormalised = normalise(wordTwo);
    return isSameWord(wordOneNormalised, wordTwoNormalised)
}

function doesItMatchTheNextWord(currentWord,nextWord){
    return isSameWord(currentWord, nextWord);
}

function identifyDeletions(sentenceOne, wordsObjectsList){
    // console.log(wordsObjectsList)
    const sentenceTwo = getTextFromWords(wordsObjectsList);
    let resultList= [];
    // normalise - normalise()
    const sentenceOneList = sentenceOne.split(' ');
    const sentenceTwoList = sentenceTwo.split(' ');
    const sentenceOneListCount = sentenceOneList.length;
    const sentenceTwoWordCount = sentenceTwoList.length;

   let counter =0;
    sentenceOneList.forEach((currentSentenceOneWord, index)=>{
        if((counter) < sentenceTwoWordCount ){
            let currentSentenceTwoWord = sentenceTwoList[counter];
            if(isSameWord(currentSentenceOneWord, currentSentenceTwoWord)){
                resultList.push(transposeWordTimecodes(currentSentenceOneWord,wordsObjectsList[counter] ))
                counter++;
            }
            else{
                let nextWordSentenceTwo = sentenceTwoList[counter+1];

                // let nextWordObject = wordsObjectsList[counter+1];
                let previousWordObject = wordsObjectsList[counter-1];
                //  last and firs tword word edge case
                if(nextWordSentenceTwo !== undefined && previousWordObject !== undefined){
                    if(!isSameWord(currentSentenceOneWord,nextWordSentenceTwo)){
                        resultList.push(transposeWordTimecodes(currentSentenceOneWord,{
                            start: previousWordObject.end,
                            end: wordsObjectsList[counter].start,
                            text: currentSentenceOneWord
                        } ))
                        // console.log(currentSentenceOneWord, nextWordSentenceTwo, wordsObjectsList[counter].text)
                        // console.log( currentSentenceOneWord, nextWordObject.text,nextWordObject.start,previousWordObject.text,previousWordObject.end )


                        // counter++;
                    }
                    else{
                        counter++;
                        console.log('insertion?')
                    }
                }
                else{
                    console.log('edge last and first word in sentence')
                }
               
                // // add edge case, eg last word
                // if(!doesItMatchTheNextWord(currentSentenceOneWord,wordsObjectsList[counter+1] )){
                   
                //     console.log(counter)
                // }
                
                // console.log('ONE::: ',sentenceTwoWordCount , index,  (index) < sentenceTwoWordCount, currentSentenceOneWord , '-',currentSentenceTwoWord )
            }
           
        }
        else{
            console.log('**TWO::: ',sentenceTwoWordCount , index,  (index) < sentenceTwoWordCount, currentSentenceOneWord  )
        }
        
    })
    // console.log(sentenceOne+'\n\n',sentenceTwo )
    return resultList;
}

function compareWordsInSentence(text, words){
    const textWordCount = countWords(text);
    const wordsWordCount = countWords(getTextFromWords(words));
    // same length - transpose timecodes to accurate text.
    // there might be a base case where there's no substitutions 
    // and this operation is extra, but we are ignoring it for now.
    // good to transpose also to preserve base text capitalization and punctuation.
    // we are assuming words are joined with punctuation
    if(textWordCount === wordsWordCount){
        return transposeSentenceTimecodes(text, words)
    }
    // deletion - word missing from STT output
    if(textWordCount > wordsWordCount){
        // console.log(textWordCount , wordsWordCount)
        // console.log(text, getTextFromWords(words))
        return identifyDeletions(text, words)
    }
    // insertion - word in STT out not present in base text 
}



module.exports = compareWordsInSentence;