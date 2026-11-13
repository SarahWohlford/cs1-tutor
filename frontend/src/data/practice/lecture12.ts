import type { PracticeSet } from "../../practice/types";

// Original CSCI 1100 Lecture 12 questions on ranges, nested loops, and loop control.
// Topics follow the course lecture. Wording is not copied from the notes or the exercises.
export const LECTURE_12_PRACTICE: PracticeSet = {
  chapter: "12",
  title: "Controlling Loops",
  warmup: [
    {
      id: "l12-w-stop",
      front: "Does range include its stop value?",
      back: "No. range(1, 6, 2) produces 1, 3, and 5. 6 is not included.",
    },
    {
      id: "l12-w-step",
      front: "What is the third argument of range?",
      back: "The step added after each value. range(4, 10, 3) produces 4 and 7.",
    },
    {
      id: "l12-w-break",
      front: "What does break do?",
      back: "It leaves the current loop immediately. Execution continues on the line after the loop.",
    },
    {
      id: "l12-w-continue",
      front: "What does continue do?",
      back: "It skips the rest of this pass and starts the next one. The loop itself does not end.",
    },
  ],
  practice: [
    {
      kind: "fill-blank",
      id: "l12-p-range",
      prompt: "range(1, 6, 2) produces 1, 3, and one more number.",
      before: "The last number is",
      after: "",
      accept: ["5"],
      why: "Start at 1, add 2, and stop before 6. The values are 1, 3, and 5.",
    },
    {
      kind: "mcq",
      id: "l12-p-neighbor",
      prompt: "The body reads word[i] and word[i + 1]. Which range stays inside a word of length n?",
      choices: [
        "range(n)",
        "range(n - 1)",
        "range(1, n + 1)",
        "range(n + 1)",
      ],
      answerIndex: 1,
      why: "The last index is n - 1. If i is n - 1, then i + 1 is off the end. i must stop at n - 2, which is what range(n - 1) does.",
    },
    {
      kind: "fill-blank",
      id: "l12-p-pairs",
      prompt: "for i in range(3):\n    for j in range(i + 1, 3):\n        print(i, j)\nHow many lines print?",
      before: "",
      after: "",
      accept: ["3"],
      why: "The pairs are (0, 1), (0, 2), and (1, 2). When i is 2, the inner range is empty.",
    },
    {
      kind: "fill-blank",
      id: "l12-p-min",
      prompt: "groups = [[4, 9], [2, 8]]",
      before: "The smallest number in groups is",
      after: "",
      accept: ["2"],
      why: "Look through both inner lists. 4, 9, 2, and 8. The smallest is 2.",
    },
    {
      kind: "mcq",
      id: "l12-p-continue",
      prompt: "for n in [1, -2, 3]:\n    if n < 0:\n        continue\n    print(n)\nWhat prints?",
      choices: ["1, then -2, then 3", "1, then 3", "Only -2", "Nothing, because continue ends the loop"],
      answerIndex: 1,
      why: "continue skips the print for -2 and goes on to 3. The loop does not stop.",
    },
    {
      kind: "mcq",
      id: "l12-p-sqrt",
      prompt: "Start with x = 9. Which loop can keep running forever?",
      choices: [
        "while x > 1: x = x ** 0.5",
        "while x >= 1: x = x ** 0.5",
        "while x > 9: x = x ** 0.5",
        "for i in range(4): x = x ** 0.5",
      ],
      answerIndex: 1,
      why: "Square roots move 9 toward 1. Once x is 1, x > 1 is false, so that loop stops. x >= 1 stays true because the square root of 1 is 1.",
    },
  ],
  challenge: [
    {
      id: "l12-c-min",
      prompt:
        "Write min_in_groups(groups) for a non-empty list of non-empty lists of numbers. Use nested for loops and return the smallest number. min_in_groups([[11, 3], [6, 4]]) must return 3. Do not call min on the outer list.",
      solution:
        "def min_in_groups(groups):\n    best = groups[0][0]\n    for group in groups:\n        for value in group:\n            if value < best:\n                best = value\n    return best",
      rubric:
        "Full credit if nested for loops look at every number and the function returns the smallest. min_in_groups([[11, 3], [6, 4]]) is 3. Calling min on the outer list, or checking only the first inner list, misses the task. Using min on one inner list is acceptable only if every group is still examined.",
    },
  ],
};
