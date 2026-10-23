import type { PracticeSet } from "../../practice/types";

// Original CSCI 1100 Lecture 6 questions on decisions.
// Topics follow the course lecture. Wording is not copied from the notes or the exercises.
export const LECTURE_06_PRACTICE: PracticeSet = {
  chapter: "6",
  title: "Decisions",
  warmup: [
    {
      id: "l6-w-bool",
      front: "What two values does a comparison produce?",
      back: "True or False. Those are the bool values. A condition in if is one of them, or something Python treats the same way.",
    },
    {
      id: "l6-w-eq",
      front: "What is the difference between == and =?",
      back: "== asks whether two values are equal. = stores a value in a name. if x = 3 is a syntax error.",
    },
    {
      id: "l6-w-and",
      front: "When is a and b true?",
      back: "Only when both sides are true. If the first side is false, the whole and is false.",
    },
    {
      id: "l6-w-or",
      front: "Why is or called inclusive?",
      back: "It is true when either side is true, including when both sides are true. It does not mean exactly one.",
    },
  ],
  practice: [
    {
      kind: "mcq",
      id: "l6-p-num",
      prompt: "What is 7 > 3?",
      choices: ["True", "False", "7", "None"],
      answerIndex: 0,
      why: "7 is greater than 3, so the comparison's value is the bool True.",
    },
    {
      kind: "mcq",
      id: "l6-p-case",
      prompt: "What is 'cat' == 'Cat'?",
      choices: ["True", "False", "'cat'", "It raises an error"],
      answerIndex: 1,
      why: "String equality checks every character. c and C are different characters, so the strings are not equal.",
    },
    {
      kind: "mcq",
      id: "l6-p-str",
      prompt: "What is 'cat' < 'dog'?",
      choices: ["True", "False", "None", "It raises TypeError"],
      answerIndex: 0,
      why: "Strings compare one character at a time. The first characters differ, and c comes before d, so 'cat' is less.",
    },
    {
      kind: "fill-blank",
      id: "l6-p-float",
      prompt: "Predict the comparison. 10 and 10.0 have different types.",
      before: "10 == 10.0 is",
      after: "",
      accept: ["True", "true"],
      why: "== compares values. 10 and 10.0 are the same number, so the comparison is True.",
    },
    {
      kind: "mcq",
      id: "l6-p-assign",
      prompt: "Which line asks a question instead of storing a value?",
      choices: ["x = 4", "x == 4", "x = x + 1", "name = 'Ada'"],
      answerIndex: 1,
      why: "== compares. The other three use =, which assigns.",
    },
    {
      kind: "mcq",
      id: "l6-p-not",
      prompt: "What is not (4 <= 4)?",
      choices: ["True", "False", "4", "None"],
      answerIndex: 1,
      why: "4 <= 4 is True, and not flips it to False.",
    },
    {
      kind: "mcq",
      id: "l6-p-elif",
      prompt: "score = 95. Which print runs?\nif score >= 90:\n    print('high')\nelif score >= 80:\n    print('good')\nelse:\n    print('keep going')",
      choices: ["high", "good", "keep going", "high and good"],
      answerIndex: 0,
      why: "The first true branch wins. 95 >= 90, so Python prints high and skips the elif.",
    },
    {
      kind: "fill-blank",
      id: "l6-p-or",
      prompt: "Both sides are true. Inclusive or is still true.",
      before: "(1 == 1) or (2 == 2) is",
      after: "",
      accept: ["True", "true"],
      why: "or is inclusive. Two true sides still make the whole expression True. It is not 'exactly one'.",
    },
  ],
  challenge: [
    {
      id: "l6-c-average",
      prompt:
        "Read two integers with input. If either is less than 0, print invalid. Else if either is greater than 100, print out of range. Otherwise print their average. Use if/elif, and use / so the average can be a float. For 80 then 90 the only output is 85.0. For -1 then 10 the only output is invalid. For 101 then 50 the only output is out of range.",
      solution:
        "a = int(input())\nb = int(input())\nif a < 0 or b < 0:\n    print('invalid')\nelif a > 100 or b > 100:\n    print('out of range')\nelse:\n    print((a + b) / 2)",
      rubric:
        "Full credit if negatives print invalid, values above 100 print out of range, and every other pair prints the average with / (80 and 90 print 85.0). The checks must use if and elif. Printing both an error and an average misses the branch.",
    },
  ],
};
