const Levenshtein = require('fast-levenshtein');

/**
 * 
 * @param {string} sentenceOne 
 * @param {string} sentenceTwo 
 * @return {array} - returns array of indexes of matches.
 */
function compareWordsInSentence(sentenceOne,sentenceTwo){
    let result = [];
    const sentenceOneList = sentenceOne.split(' ');
    const sentenceTwoList = sentenceTwo.split(' ');
    
    const sentenceTwoWordCount = sentenceTwoList.length;
    if(isSameLengthSentence(sentenceOne,sentenceTwo) === 0){
       
        // assumes two sentences are same length
        sentenceOneList.forEach((word1, index)=>{
            const currentSentenceTwoWord = sentenceTwoList[index];
            // console.log(word1)
            if(currentSentenceTwoWord !== undefined){
                result.push(compareWords(word1, currentSentenceTwoWord))
            }
        })
        let diffList= result.map((res, index)=>{
            // console.log(index)
            if(res === true){
                return index
            };
        });
        diffCondensedToMatches= diffList.filter((res, index)=>{
            // console.log(index)
            return res !== undefined
        });
        return diffCondensedToMatches;
    }
    // first sentence greater then second, 
    else if(isSameLengthSentence(sentenceOne,sentenceTwo) === 1){
        sentenceOneList.forEach((word1, index)=>{
            if(sentenceTwoWordCount <index){
                const currentSentenceTwoWord = sentenceTwoList[index];
                result.push(compareWords(word1, currentSentenceTwoWord))
            }
        })
        let diffList= result.map((res, index)=>{
            // console.log(index)
            if(res === true){
                return index
            };
        });
        diffCondensedToMatches= diffList.filter((res, index)=>{
            // console.log(index)
            return res !== undefined
        });
        return diffCondensedToMatches;        
        

    // // first sentence less then second sentence
    } else if(isSameLengthSentence(sentenceOne,sentenceTwo) === -1){
        return [5,3]
    }
}

/**
 * 
 * @param {string} sentenceOne 
 * @param {string} sentenceTwo 
 * @return {number} - 0 === same length
 * 1 first sentence greater then second, 
 * -1 first sentence less then second sentence
 */
function isSameLengthSentence(sentenceOne, sentenceTwo){
    const sentenceOneWordCount = countWords(sentenceOne);
    const sentenceTwoWordCount = countWords(sentenceTwo);
    if(sentenceOneWordCount ===sentenceTwoWordCount){
        return 0;
    }
    else if(sentenceOneWordCount > sentenceTwoWordCount){
        return 1
    }
    else if(sentenceOneWordCount < sentenceTwoWordCount){
        return -1
    }
}

function countWords(text){
    return text.split(' ').length;
}

/**
 * 
 * @param {string} wordOne -
 * @param {string} wordTwo 
 * @return {boolean} - returns true if words are different, and false if they are same.
 */
function compareWords(wordOne,wordTwo){
    if(levenshtein(normaliseText(wordOne), normaliseText(wordTwo))> 0) {
        return true;
    }else{
        return false;
    }
}


function levenshtein(stringOne,stringTwo){
    const dist = Levenshtein.get(stringOne,stringTwo)
    return dist;
}

function normaliseText(text){
   return text.toLowerCase().trim();
}

module.exports = compareWordsInSentence;