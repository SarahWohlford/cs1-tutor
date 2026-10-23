import type { PracticeSet } from "../../practice/types";

// Original CSCI 1100 Lecture 5 questions on writing functions.
// Topics follow the course lecture. Wording is not copied from the notes or the exercises.
export const LECTURE_05_PRACTICE: PracticeSet = {
  chapter: "5",
  title: "Python Functions",
  warmup: [
    {
      id: "l5-w-dry",
      front: "Why put a repeated calculation in a function?",
      back: "So the steps live in one place. A later fix happens once, and each call reuses that name. That is DRY: don't repeat yourself.",
    },
    {
      id: "l5-w-param",
      front: "What is the difference between a parameter and an argument?",
      back: "A parameter is the name in the def line. An argument is the value you pass when you call the function.",
    },
    {
      id: "l5-w-flow",
      front: "When does the body of a function run?",
      back: "Not at the def line. The body runs only when the function is called. return sends a value back and leaves the body.",
    },
    {
      id: "l5-w-none",
      front: "What value does a function give back if it never executes return?",
      back: "None. print shows text, but the call itself is still None unless you return something.",
    },
  ],
  practice: [
    {
      kind: "fill-blank",
      id: "l5-p-cm",
      prompt: "def inches_to_cm(inches):\n    return inches * 2.54",
      before: "inches_to_cm(10) ==",
      after: "",
      accept: ["25.4"],
      why: "The argument 10 fills the parameter inches. 10 * 2.54 is 25.4, and return hands that number back.",
    },
    {
      kind: "mcq",
      id: "l5-p-none",
      prompt: "def show(name):\n    print(name)\nx = show('Sam')\nBesides the printed line, what is x?",
      choices: ["'Sam'", "None", "''", "The call crashes because show has no return"],
      answerIndex: 1,
      why: "A function with no return finishes and gives back None. print displays Sam, but that display is not the value of the call.",
    },
    {
      kind: "mcq",
      id: "l5-p-local",
      prompt: "def bump(n):\n    n = n + 1\n    return n\nx = 4\ny = bump(x)\nWhat is x afterward?",
      choices: ["5", "4", "None", "1"],
      answerIndex: 1,
      why: "n is local to bump. Assigning n does not change the caller's x. y is 5 because that is the returned value.",
    },
    {
      kind: "mcq",
      id: "l5-p-inner",
      prompt: "def twice(n):\n    return n * 2\ndef box(n):\n    return twice(n) ** 2\nWhat is box(3)?",
      choices: ["12", "18", "36", "6"],
      answerIndex: 2,
      why: "box calls twice first. twice(3) returns 6, then 6 ** 2 is 36. The inner call finishes before the outer return.",
    },
    {
      kind: "mcq",
      id: "l5-p-flow",
      prompt: "A file defines main, then double, then calls main() on the last line. double is used inside main. When does double's body run?",
      choices: [
        "While Python is still reading the def double line",
        "At the def main line, before double exists",
        "When main calls it, after both defs have been stored",
        "Never, because double is written below main",
      ],
      answerIndex: 2,
      why: "def only stores a function. By the time the bottom line calls main(), both names exist, and double runs when main calls it.",
    },
    {
      kind: "fill-blank",
      id: "l5-p-fence",
      prompt: "def fence(length, width):\n    return 2 * (length + width)",
      before: "fence(5, 3) ==",
      after: "",
      accept: ["16"],
      why: "Arguments match by position: length is 5 and width is 3. 2 * (5 + 3) is 16.",
    },
    {
      kind: "mcq",
      id: "l5-p-pi",
      prompt: "The file already has import math. Which expression is the area of a circle with radius r?",
      choices: ["pi * r ** 2", "math.pi * r ** 2", "math.PI * r ** 2", "math.pi * r"],
      answerIndex: 1,
      why: "import math keeps the constant under the module name. Area uses r squared, so math.pi * r ** 2.",
    },
    {
      kind: "mcq",
      id: "l5-p-indent",
      prompt: "What happens if the line after def area(r): is not indented?",
      choices: [
        "The function returns None",
        "Python reports IndentationError",
        "The body runs immediately",
        "Python reports NameError",
      ],
      answerIndex: 1,
      why: "A def body has to be indented. Python rejects the file before any call happens.",
    },
  ],
  challenge: [
    {
      id: "l5-c-convert",
      prompt:
        "Write inches_to_cm(inches) so it returns inches * 2.54 and prints nothing. Write main() that prints inches_to_cm(12). Call main() after both definitions.",
      solution:
        "def inches_to_cm(inches):\n    return inches * 2.54\n\ndef main():\n    print(inches_to_cm(12))\n\nmain()",
      rubric:
        "Full credit if inches_to_cm returns the number and does not print, main prints 30.48, and main() is called after the definitions. Printing inside inches_to_cm misses the return.",
    },
    {
      id: "l5-c-print",
      prompt:
        "Write show_course(name) so it prints name and does not use return. Write main() that calls show_course('CSCI 1100') without printing that call. Call main() at the bottom. The only output should be the course name.",
      solution:
        "def show_course(name):\n    print(name)\n\ndef main():\n    show_course('CSCI 1100')\n\nmain()",
      rubric:
        "Full credit if the only output is CSCI 1100, show_course has no return, and main does not print the call. Printing the call would also show None.",
    },
  ],
};
