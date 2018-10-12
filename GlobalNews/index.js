const fs = require('fs')
const Levenshtein = require('fast-levenshtein')

const { words } = require('./alignments.json')
const lines = require('./lines')

let currentDist = 10000
let currentLine = 0
let currentStart = words[0].start
let currentEnd = 0
let currentSentence = []

const transcript = []

words.forEach((word, i) => {
    if (word.transcript_text) {
        const dist = Levenshtein.get([...currentSentence, word.transcript_text].join(' '), lines[currentLine])

        if (dist < currentDist) {
            currentEnd = word.end
            currentDist = dist

            currentSentence.push(word.transcript_text)
        }
        else {
            // console.log({ start: lines[currentLine], endin: currentSentence.join(' ') })

            transcript.push({
                start: currentStart,
                end: currentEnd,
                text: lines[currentLine]
            })

            currentLine++

            currentDist = 10000
            currentStart = word.start
            currentEnd = word.end
            currentSentence = [word.transcript_text]

            if (currentLine >= lines.length) {
                console.log("OOOOPS", i, words.length)
            }
        }
    }
})

fs.writeFileSync('subs.json', JSON.stringify(transcript))