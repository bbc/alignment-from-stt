const compareWordsInSentence = require('./index.js');

const baseTextOne =  "I asked a friend to hold a baby dinosaur robot upside down.";
const wordsOne = [
    {  "start": 15.67,  "end": 15.82, "text": "I" },
    {  "start": 15.82,  "end": 16.19, "text": "asked"   },
    {  "start": 16.19,  "end": 16.27, "text": "a" },
    {  "start": 16.27,  "end": 16.65, "text": "friend" },
    {  "start": 16.65,  "end": 16.74, "text": "to" },
    {  "start": 16.74,  "end": 17.2,  "text": "hold" },
    {  "start": 17.23,  "end": 17.32, "text": "a" },
    {  "start": 17.32,  "end": 17.63, "text": "baby"  },
    {  "start": 17.63, "end": 18.13,  "text": "dinosaur" },
    {  "start": 18.17,  "end": 18.61, "text": "robot"},
    {  "start": 18.72,  "end": 19.17, "text": "upside" },
    { "start": 19.17, "end": 19.56,  "text": "down." }
    ];
    
const expectedOutput  = [
    {  "start": 15.67,  "end": 15.82, "text": "I" },
    {  "start": 15.82,  "end": 16.19, "text": "asked"   },
    {  "start": 16.19,  "end": 16.27, "text": "a" },
    {  "start": 16.27,  "end": 16.65, "text": "friend" },
    {  "start": 16.65,  "end": 16.74, "text": "to" },
    {  "start": 16.74,  "end": 17.2,  "text": "hold" },
    {  "start": 17.23,  "end": 17.32, "text": "a" },
    {  "start": 17.32,  "end": 17.63, "text": "baby"  },
    {  "start": 17.63, "end": 18.13,  "text": "dinosaur" },
    {  "start": 18.17,  "end": 18.61, "text": "robot"},
    {  "start": 18.72,  "end": 19.17, "text": "upside" },
    { "start": 19.17, "end": 19.56,  "text": "down." }
    ];

test('comparison - same', () => {
    const result = compareWordsInSentence(baseTextOne ,wordsOne)
  	expect(result).toEqual(expectedOutput);
});


describe('Even if all words are incorrect it can transpose timecodes', function() {

    const baseTextTwo =  "I asked a friend to hold a baby dinosaur robot upside down.";
    const wordsTwo = [
        {  "start": 15.67,  "end": 15.82,  "text": "RANDOM-1" },
        {  "start": 15.82, "end": 16.19,   "text": "RANDOM-2"   },
        {  "start": 16.19,  "end": 16.27,  "text": "RANDOM-3" },
        {  "start": 16.27,  "end": 16.65,  "text": "RANDOM-4" },
        {  "start": 16.65,  "end": 16.74,  "text": "RANDOM-5" },
        {  "start": 16.74,  "end": 17.2,  "text": "RANDOM-6" },
        {  "start": 17.23,  "end": 17.32,  "text": "RANDOM-7" },
        { "start": 17.32,     "end": 17.63,  "text": "RANDOM-8"  },
        {  "start": 17.63, "end": 18.13,  "text": "RANDOM-9" },
        {  "start": 18.17,  "end": 18.61,  "text": "RANDOM-10"},
        {  "start": 18.72,  "end": 19.17,  "text": "RANDOM-11" },
        { "start": 19.17, "end": 19.56,  "text": "RANDOM-12" }
    ];

test('comparison - substitution', () => {
        const result = compareWordsInSentence(baseTextTwo ,wordsTwo)
        expect(result).toEqual(expectedOutput);
    });
})

describe('If there are missing words in STT results it can interpolate the times - 2 middle', function() {

    const baseTextThree =  "I asked a friend to hold a baby dinosaur robot upside down.";
    const wordsThree =[
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

    const expectedOutputThree  = [ 
        { start: 15.67, end: 15.82, text: 'I' },
        { start: 15.82, end: 16.19, text: 'asked' }, //<--
        { start: 16.19, end: 16.27, text: 'a' },
        { start: 16.27, end: 16.65, text: 'friend' },
        { start: 16.65, end: 16.74, text: 'to' },
        { start: 16.74, end: 17.2, text: 'hold' },
        { start: 17.23, end: 17.32, text: 'a' },
        { start: 17.32, end: 17.63, text: 'baby' }, //<--
        { start: 17.63, end: 18.13, text: 'dinosaur' },
        { start: 18.17, end: 18.61, text: 'robot' },
        { start: 18.72, end: 19.17, text: 'upside' },
        { start: 19.17, end: 19.56, text: 'down.' } 
    ]

    test('comparison - deletion - 2 words', () => {
        const result = compareWordsInSentence(baseTextThree ,wordsThree)
        expect(result).toEqual(expectedOutputThree);
    });
})

describe('If there are missing words in STT results it can interpolate the times - start', function() {

    const baseTextThree =  "I asked a friend to hold a baby dinosaur robot upside down.";
    const wordsThree =[
    // {  "start": 15.67,  "end": 15.82,  "text": "I" },
      {     "start": 15.82,     "end": 16.19,     "text": "asked"   },
    {  "start": 16.19,  "end": 16.27,  "text": "a" },
    {  "start": 16.27,  "end": 16.65,  "text": "friend" },
    {  "start": 16.65,  "end": 16.74,  "text": "to" },
    {  "start": 16.74,  "end": 17.2,  "text": "hold" },
    {  "start": 17.23,  "end": 17.32,  "text": "a" },
    {     "start": 17.32,     "end": 17.63,     "text": "baby"  },
    {  "start": 17.63, "end": 18.13,  "text": "dinosaur" },
    {  "start": 18.17,  "end": 18.61,  "text": "robot"},
    {  "start": 18.72,  "end": 19.17,  "text": "upside" },
    { "start": 19.17, "end": 19.56,  "text": "down." }
    ];

    const expectedOutputThree  = [ 
        { start: 15.67, end: 15.82, text: 'I' }, //<--
        {  "start": 16.19,  "end": 16.27,  "text": "a" },
    {  "start": 16.27,  "end": 16.65,  "text": "friend" },
    {  "start": 16.65,  "end": 16.74,  "text": "to" },
    {  "start": 16.74,  "end": 17.2,  "text": "hold" },
    {  "start": 17.23,  "end": 17.32,  "text": "a" },
    {     "start": 17.32,     "end": 17.63,     "text": "baby"  },
    {  "start": 17.63, "end": 18.13,  "text": "dinosaur" },
    {  "start": 18.17,  "end": 18.61,  "text": "robot"},
    {  "start": 18.72,  "end": 19.17,  "text": "upside" },
    { "start": 19.17, "end": 19.56,  "text": "down." }
    ];
    

    test('comparison - deletion - 2 words', () => {
        const result = compareWordsInSentence(baseTextThree ,wordsThree)
        expect(result).toEqual(expectedOutputThree);
    });
})