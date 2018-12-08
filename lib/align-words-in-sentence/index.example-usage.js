const compareWordsInSentence = require('./index.js');

const baseTextOne =  "I asked a friend to hold a baby dinosaur robot upside down.";
const wordsOne = [
    {  "start": 15.67,  "end": 15.82,  "text": "I" },
    //   {     "start": 15.82,     "end": 16.19,     "text": "asked"   },
    {  "start": 16.19,  "end": 16.27,  "text": "a" },
    {  "start": 16.27,  "end": 16.65,  "text": "friend" },
    {  "start": 16.65,  "end": 16.74,  "text": "to" },
    {  "start": 16.74,  "end": 17.2,  "text": "hold" },
    {  "start": 17.23,  "end": 17.32,  "text": "a" },
    //   {     "start": 17.32,     "end": 17.63,     "text": "baby"  },
    {  "start": 17.63, "end": 18.13,  "text": "dinosaur" },
    {  "start": 18.17,  "end": 18.61,  "text": "robot"},
    {  "start": 18.72,  "end": 19.17,  "text": "upside" },
    { "start": 19.17, "end": 19.56,  "text": "down." }
];




const result = compareWordsInSentence(baseTextOne, wordsOne);
console.log(result);