import type { PracticeSet } from "../../practice/types";

// Original CSCI 1100 Lecture 4 questions on functions and modules.
// Topics follow the course lecture. Wording is not copied from the notes or the exercises.
export const LECTURE_04_PRACTICE: PracticeSet = {
  chapter: "4",
  title: "Functions and Modules",
  warmup: [
    {
      id: "l4-w-builtin",
      front: "Name three built-in functions that work on numbers.",
      back: "abs, pow, round, int, float, max, and min are all built in. They are available without import.",
    },
    {
      id: "l4-w-method",
      front: "How do you call a method?",
      back: "value.method(arguments). Example: 'cs 1'.upper() is 'CS 1'. The original value does not change.",
    },
    {
      id: "l4-w-import",
      front: "How do you use sqrt from the math module?",
      back: "import math, then math.sqrt(n). Or from math import sqrt, then sqrt(n).",
    },
    {
      id: "l4-w-format",
      front: "What does {:.2f} mean inside a format string?",
      back: "Show that argument as a float with two digits after the decimal, rounding if needed.",
    },
  ],
  practice: [
    {
      kind: "mcq",
      id: "l4-p-abs",
      prompt: "What is abs(-4.6)?",
      choices: ["-4.6", "4", "4.6", "5"],
      answerIndex: 2,
      why: "abs drops the sign and keeps the value. round(-4.6) is the one that becomes -5.",
    },
    {
      kind: "fill-blank",
      id: "l4-p-pow",
      prompt: "pow(base, exp) raises base to exp.",
      before: "pow(2, 5) ==",
      after: "",
      accept: ["32"],
      why: "2 to the 5th is 32. ** does the same job: 2 ** 5.",
    },
    {
      kind: "mcq",
      id: "l4-p-mutate",
      prompt: "name = 'Ada'. What is name after name.lower()?",
      choices: ["'ada'", "'Ada'", "'ADA'", "It raises AttributeError"],
      answerIndex: 1,
      why: "lower returns a new string. name is still 'Ada' unless you assign the result back.",
    },
    {
      kind: "mcq",
      id: "l4-p-find",
      prompt: "What is 'banana'.find('a')?",
      choices: ["0", "1", "2", "-1"],
      answerIndex: 1,
      why: "Indexes start at 0. The first a is at index 1. find returns -1 only when the text is missing.",
    },
    {
      kind: "fill-blank",
      id: "l4-p-strip",
      prompt: "strip removes the given characters from both ends, not from the middle.",
      before: "'aaaba'.strip('a') ==",
      after: "",
      accept: ["'b'", "\"b\"", "b"],
      why: "strip walks in from both ends. Every a at either end is removed, which leaves b.",
    },
    {
      kind: "mcq",
      id: "l4-p-format",
      prompt: "What is '{:.2f}'.format(1.239)?",
      choices: ["'1.23'", "'1.24'", "'1.239'", "'1.2'"],
      answerIndex: 1,
      why: "Two digits after the decimal, and the third digit 9 rounds the 3 up to 4.",
    },
    {
      kind: "mcq",
      id: "l4-p-ceil",
      prompt: "After import math, what is math.ceil(2.1)?",
      choices: ["2", "2.1", "3", "2.0"],
      answerIndex: 2,
      why: "ceil goes up to the next integer. math.trunc(2.9) chops toward zero and is 2.",
    },
    {
      kind: "mcq",
      id: "l4-p-star",
      prompt: "Which import is the one to avoid?",
      choices: [
        "import math",
        "import math as m",
        "from math import sqrt, pi",
        "from math import *",
      ],
      answerIndex: 3,
      why: "from math import * copies every name into your file, so a math name can silently hide one of yours.",
    },
  ],
  challenge: [
    {
      id: "l4-c-tag",
      prompt:
        "phrase is already 'open lab hours'. Make a hashtag: capitalize each word, delete the spaces, and put # in front. Print both phrase and the hashtag. phrase itself must stay unchanged.",
      solution:
        "hashtag = '#' + phrase.title().replace(' ', '')\nprint(phrase)\nprint(hashtag)",
      rubric:
        "Full credit if phrase still prints as open lab hours and the hashtag is #OpenLabHours. title capitalizes each word. replace removes spaces. Assigning back onto phrase is wrong.",
    },
    {
      id: "l4-c-circles",
      prompt:
        "Using the math module, print the areas of two circles. Radius 2 must use **. Radius 10 must use pow. Show radius 2 with format to two decimals, and radius 10 with round to two decimals. The lines must be exactly:\nArea 1 = 12.57\nArea 2 = 314.16",
      solution:
        "import math\narea1 = math.pi * 2 ** 2\narea2 = math.pi * pow(10, 2)\nprint('Area 1 = {:.2f}'.format(area1))\nprint('Area 2 =', round(area2, 2))",
      rubric:
        "Full credit only if both lines match 12.57 and 314.16, one area uses **, one uses pow, one print uses format, and one uses round.",
    },
  ],
};
