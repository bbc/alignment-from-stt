const compareWordsInSentence = require('./index.js');

const baseSentenceSame ='But we’ll back with more from our correspondents’ next Saturday morning as usual.'
const newSentenceSame = 'But we’ll back with more from our correspondents’ next Saturday morning as usual.'

test('comparison - same', () => {
    const result = compareWordsInSentence(baseSentenceSame ,newSentenceSame)
  	expect(result.length).toEqual(0);
});


const baseSentenceSubstitution ='But we’ll back with more from our correspondents’ next Saturday morning as usual.'
const newSentenceSubstitution = 'But SUB back with more from our correspondents’ next Saturday morning as usual.'

test('comparison - substitution', () => {
    const result = compareWordsInSentence(baseSentenceSubstitution ,newSentenceSubstitution)
  	expect(result).toEqual([1]);
});

const baseSentenceSubstitution2 ='But we’ll back with more from our correspondents’ next Saturday morning as usual.'
const newSentenceSubstitution2 = 'But SUB back with SUB from our correspondents’ next Saturday morning as usual.'

test('comparison - substitution', () => {
    const result = compareWordsInSentence(baseSentenceSubstitution2 ,newSentenceSubstitution2)
      expect(result).toEqual([1,4]);
      expect(result.length).toEqual(2);
});


const baseSentenceInsertion ='But we’ll back with more from our correspondents’ next Saturday morning as usual.'
const newSentenceInsertion = 'But we’ll INSERT back with more from our correspondents’ next Saturday morning as usual.'

test.skip('comparison - insertion', () => {
    const result = compareWordsInSentence(baseSentenceInsertion ,newSentenceInsertion)
  	expect(result.length).toEqual(0);
});


const baseSentenceDeletion ='But we’ll back with more from our correspondents’ next Saturday morning as usual.'
const newSentenceDeletion = 'But back with more from our correspondents’ next Saturday morning as usual.'
//                                   | del
test('comparison - deletion', () => {
    const result = compareWordsInSentence(baseSentenceDeletion ,newSentenceDeletion)
  	expect(result.length).toEqual(0);
});