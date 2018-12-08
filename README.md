# Alignement 
<!-- _One liner + link to confluence page_

_Screenshot of UI - optional_ -->

Work in progress, originally developed by Mathieu Triay, in BBC R&D as part of the New News prototype "fast forward". Being refactored into a reusable module by News Labs.

<!--
BBC Transcription Model  

- check/test Adapter Kaldi to Transcription model with alignement.json output. 
- autoEditJson Adapter to Transcription model?


- Transcription model to "adapter" autoEditJson. to do 2 ways

-->




## Setup

_stack - optional_

_How to build and run the code/app_

```
git clone git@github.com:bbc/alignment-from-stt.git
```

```
cd alignment-from-stt
``` 

```
npm install
```

## Usage

To try out example
```
node lib/example-usage.js
```

to use elsewhere

```js
const fs = require('fs');
const align = require('./index.js');
const automatedTranscription = require('../sample-data/kaldi-alignments.json').words;
// array of words, each .end, .start., .transcript_text;
const humanCorrectedTranscription = fs.readFileSync('./sample-data/human-transcription-on-one-line.txt').toString();

var reAlignedTranscription = align(humanCorrectedTranscription,automatedTranscription);

console.log(reAlignedTranscription)
```
 

## System Architecture
<!-- _High level overview of system architecture_ -->

Input is 
- a json, array of words objects, with `start`, `end`, and `transcript_text`.
- plain text, humanan accurate, correct text.

Then `lib/text-segmentation` uses a sentence boundary detection module to split the human accurate plain text into an array of sentences. This avoid threating honorifics like `Mr.` as if they were sentence boundaries.

`lib/alignement` uses the segmented sentences and transposes the timecodes from the json (from STT) onto the accurate text. 

```js
...
  { start: 578.43,
    end: 582.52,
    text: '"The only thing I\'m here to discuss is your resignation," said Pashinyan.',
    words: [] },
  { start: 582.92,
    end: 594.12,
    text: 'Mr. Sargsyan walkedout, saying that Pashinyan had no right to speak on behalf of the people when his party had only received 7% of votes in the last elections.',
    words: [] },
  { start: 595.1,
    end: 600.86,
    text: 'Shortly afterwards, Nikol Pashinyan and other protest leaders were detained by the police.',
    words: [] },
...
```

At the moment it does so at sentence, level. Ideally will get to a point where it also reaches word level.


 

## Development env

 <!-- _How to run the development environment_

_Coding style convention ref optional, eg which linter to use_

_Linting, github pre-push hook - optional_ -->

- node > 8
- npm > 5.6.0


## Build

<!-- _How to run build_ -->

No build step for now
 

## Tests
<!-- _How to carry out tests_ -->
Unit tests written with jest.

```
npm run test
```

or 

```
npm run test:watch
```

If you want to run tests while developing - recommended.
 
## Sample material
In the interest of making the sample material reproducible, decided to use two sample datas, the first chapter from the "Moby Dick" book by Herman Melville. and a Ted Talk.

The ted Talk seems to have a bit more errors in the STT that are slightly easier to spot and overall more representative of STT accuracy in the wild.

### Moby dick chapter 1

[LibriVox](https://librivox.org/moby-dick-by-herman-melville/) provides the audio book version and link to [project gutenberg](http://www.gutenberg.org/ebooks/2701) text version.

Direct links

- [Text](http://www.gutenberg.org/files/2701/2701-0.txt) - `12` kb
- [audio - Stewart Wills](http://ia802604.us.archive.org/32/items/moby_dick_librivox/mobydick_001_002_melville.mp3) - `21.9` MB
<!-- - alternative audio by [ Tilda Swinton](https://soundcloud.com/moby-dick-big-read) `20.7`MB as part of The Moby-Dick Big Read project -->

To bloating the github repository the audio file is not included in this repository. However the text for the first chapter can be found in [`/sample-data/moby-dick/moby-dick-chapter-1.txt`]( ./sample-data/moby-dick/moby-dick-chapter-1.txt).


The `sample-data` folder also contains the STT json for the first chapter of Moby Dick from LibriVox as transcribed by the BBC Kaldi system 
[`/sample-data/moby-dick/moby-dick-kaldi-stt.json`]( ./sample-data/moby-dick/moby-dick-kaldi-stt.json).

You could replace this with your own STT json from another service, provided you have access to an array of words, with `start`, `end`, and `text` attribute. These are needed by the aligner module to do the alignment.

### Ted Talk

Another one is a TED Talk by [Kate Darling: Why we have an emotional connection to robots ](https://www.ted.com/talks/kate_darling_why_we_have_an_emotional_connection_to_robots/transcript?language=en)
- [video](https://download.ted.com/talks/KateDarling_2018S-950k.mp4)
- [Transcript](https://www.ted.com/talks/kate_darling_why_we_have_an_emotional_connection_to_robots/transcript?language=en) copied from interactive web page and normalised.


data:
- accurate text transcription [`./sample-data/ted-talk-Kate-Darling-robot-emotions/ted-talk-transcript.txt`](./sample-data/ted-talk-Kate-Darling-robot-emotions/ted-talk-transcript.txt)
- transcript json from BBC Kaldi [`./sample-data/ted-talk-Kate-Darling-robot-emotions/ted-talk-bbc-kaldi.json`](./sample-data/ted-talk-Kate-Darling-robot-emotions/ted-talk-bbc-kaldi.json)

## Deployment

<!-- _How to deploy the code/app into test/staging/production_ -->

NA

## TODO:

- [ ] there is an issue with this char `’` that is being escaped as `\\\'` in final result. it comes from .txt input file. should add check to replace as `'`.


<!-- ’ -->