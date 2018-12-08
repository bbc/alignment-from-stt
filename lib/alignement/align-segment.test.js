// TODO: 
const alignSegment = require('./align-segment.js');

const humanCorrectedTranscription = "But we’ll back with more from our correspondents’ next Saturday morning as usual.";

const automatedTranscriptionCorrect = [
    {
        "start": 1672.9,
        "end": 1673.14,
        "text": "But",
    },
    {
      "start": 1673.14,
      "end": 1673.24,
      "text": "we’ll"
    },
    {
      "start": 1673.24,
      "end": 1673.52,
      "text": "back"
    },
    {
      "start": 1673.52,
      "end": 1673.64,
      "text": "with"
    },
    {
      "start": 1673.64,
      "end": 1673.81,
      "text": "more"
    },
    {
      "start": 1673.81,
      "end": 1674,
      "text": "from"
    },
    {
      "start": 1674,
      "end": 1674.07,
      "text": "our"
    },
    {
      "start": 1674.07,
      "end": 1674.95,
      "text": "correspondents’"
    },
    {
      "start": 1674.95,
      "end": 1675.24,
      "text": "next"
    },
    {
      "start": 1675.24,
      "end": 1675.66,
      "text": "Saturday"
    },
    {
      "start": 1675.66,
      "end": 1676.08,
      "text": "morning"
    },
    {
      "start": 1676.08,
      "end": 1676.22,
      "text": "as"
    },
    {
      "start": 1676.22,
      "end": 1676.73,
      "text": "usual."
    },
    {
      "start": 1676.97,
      "end": 1677.16,
      "text": "Do"
    }
  ];

  // But we’ll back with more from our correspondents’ next Saturday morning as usual.
const expectedOutput = [
    {
        "start": 1672.9,
        "end": 1673.14,
        "text": "But",
    },
    {
      "start": 1673.14,
      "end": 1673.24,
      "text": "we’ll"
    },
    {
      "start": 1673.24,
      "end": 1673.52,
      "text": "back"
    },
    {
      "start": 1673.52,
      "end": 1673.64,
      "text": "with"
    },
    {
      "start": 1673.64,
      "end": 1673.81,
      "text": "more"
    },
    {
      "start": 1673.81,
      "end": 1674,
      "text": "from"
    },
    {
      "start": 1674,
      "end": 1674.07,
      "text": "our"
    },
    {
      "start": 1674.07,
      "end": 1674.95,
      "text": "correspondents’"
    },
    {
      "start": 1674.95,
      "end": 1675.24,
      "text": "next"
    },
    {
      "start": 1675.24,
      "end": 1675.66,
      "text": "Saturday"
    },
    {
      "start": 1675.66,
      "end": 1676.08,
      "text": "morning"
    },
    {
      "start": 1676.08,
      "end": 1676.22,
      "text": "as"
    },
    {
      "start": 1676.22,
      "end": 1676.73,
      "text": "usual."
    }
  ];




test.skip('should transpose the times - same as input', () => {
	const reAlignedTranscription = alignSegment(humanCorrectedTranscription,automatedTranscriptionCorrect);
  	expect(reAlignedTranscription).toEqual(expectedOutput);
});

const automatedTranscriptionSubstitution = [
  {
      "start": 1672.9,
      "end": 1673.14,
      "text": "But",
  },
  {
    "start": 1673.14,
    "end": 1673.24,
    "text": "BELL"
  },
  {
    "start": 1673.24,
    "end": 1673.52,
    "text": "back"
  },
  {
    "start": 1673.52,
    "end": 1673.64,
    "text": "with"
  },
  {
    "start": 1673.64,
    "end": 1673.81,
    "text": "more"
  },
  {
    "start": 1673.81,
    "end": 1674,
    "text": "from"
  },
  {
    "start": 1674,
    "end": 1674.07,
    "text": "our"
  },
  {
    "start": 1674.07,
    "end": 1674.95,
    "text": "correspondents’"
  },
  {
    "start": 1674.95,
    "end": 1675.24,
    "text": "next"
  },
  {
    "start": 1675.24,
    "end": 1675.66,
    "text": "Saturday"
  },
  {
    "start": 1675.66,
    "end": 1676.08,
    "text": "morning"
  },
  {
    "start": 1676.08,
    "end": 1676.22,
    "text": "as"
  },
  {
    "start": 1676.22,
    "end": 1676.73,
    "text": "usual."
  },
  {
    "start": 1676.97,
    "end": 1677.16,
    "text": "Do"
  }
];

test.skip('should transpose the times - handles Substitution', () => {
	const reAlignedTranscription = alignSegment(humanCorrectedTranscription,automatedTranscriptionSubstitution);
  	expect(reAlignedTranscription).toEqual(expectedOutput);
});


const automatedTranscriptionDeletion = [
  {
      "start": 1672.9,
      "end": 1673.14,
      "text": "But",
  },
  // {
  //   "start": 1673.14,
  //   "end": 1673.24,
  //   "text": "BELL"
  // },
  {
    "start": 1673.24,
    "end": 1673.52,
    "text": "back"
  },
  {
    "start": 1673.52,
    "end": 1673.64,
    "text": "with"
  },
  {
    "start": 1673.64,
    "end": 1673.81,
    "text": "more"
  },
  {
    "start": 1673.81,
    "end": 1674,
    "text": "from"
  },
  {
    "start": 1674,
    "end": 1674.07,
    "text": "our"
  },
  {
    "start": 1674.07,
    "end": 1674.95,
    "text": "correspondents’"
  },
  {
    "start": 1674.95,
    "end": 1675.24,
    "text": "next"
  },
  {
    "start": 1675.24,
    "end": 1675.66,
    "text": "Saturday"
  },
  {
    "start": 1675.66,
    "end": 1676.08,
    "text": "morning"
  },
  {
    "start": 1676.08,
    "end": 1676.22,
    "text": "as"
  },
  {
    "start": 1676.22,
    "end": 1676.73,
    "text": "usual."
  },
  {
    "start": 1676.97,
    "end": 1677.16,
    "text": "Do"
  }
];

test.skip('should transpose the times - handles Substitution', () => {
	const reAlignedTranscription = alignSegment(humanCorrectedTranscription,automatedTranscriptionDeletion);
  	expect(reAlignedTranscription).toEqual(expectedOutput);
});