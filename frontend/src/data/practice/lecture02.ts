import type { PracticeSet } from "../../practice/types";

// CSCI 1100 Fall 2026 Lecture 2 practice, from the course notes and Submitty exercises.
export const LECTURE_02_PRACTICE: PracticeSet = {
  chapter: "2",
  title: "Python as a Calculator",
  warmup: [
    {
      id: "l2-w-div",
      front: "What do / and // do in Python 3?",
      back: "/ is true division and always returns a float. // is floor division: it divides and rounds down to an integer (still a float if either operand is a float).",
    },
    {
      id: "l2-w-mod",
      front: "What does % compute?",
      back: "The remainder. For positive numbers, 8 % 3 is 2. Python’s remainder follows floor division, so negative operands need experimentation.",
    },
    {
      id: "l2-w-types",
      front: "When is a result a float?",
      back: "A literal with a decimal point is a float (9. and 9.0). Mixing int and float, or using /, produces a float. 9 // 4 is an int. 9. // 4 is a float.",
    },
    {
      id: "l2-w-pow",
      front: "How does ** associate?",
      back: "Exponentiation is right-to-left. 2**3**2 means 2**(3**2), which is 512, not (2**3)**2, which is 64.",
    },
    {
      id: "l2-w-assign",
      front: "What does = mean in Python?",
      back: "Assignment. The right-hand side is evaluated and stored in the name on the left. It is not mathematical equality, and the left side must be a variable name.",
    },
    {
      id: "l2-w-errors",
      front: "Syntax error vs semantic error?",
      back: "A syntax error is bad form, so the program will not run. A semantic error runs and produces the wrong result, such as using 21 // 7 as pi.",
    },
  ],
  practice: [
    {
      kind: "mcq",
      id: "l2-p-types",
      prompt: "Which of these values is a float?",
      choices: ["9", "9 + 3", "9 // 4", "9.0"],
      answerIndex: 3,
      why: "9.0 has a decimal point, so it is a float. 9, 9 + 3, and 9 // 4 are ints.",
    },
    {
      kind: "mcq",
      id: "l2-p-truediv",
      prompt: "What are the value and type of 9 / 4?",
      choices: ["2, int", "2.25, float", "2.0, float", "2.25, int"],
      answerIndex: 1,
      why: "True division / always returns a float. 9 / 4 is 2.25.",
    },
    {
      kind: "mcq",
      id: "l2-p-floordiv",
      prompt: "What are the value and type of 9. // 4?",
      choices: ["2, int", "2.0, float", "2.25, float", "2.0, int"],
      answerIndex: 1,
      why: "Floor division of a float returns a float. 9. // 4 is 2.0.",
    },
    {
      kind: "fill-blank",
      id: "l2-p-pow",
      prompt: "Python evaluates ** from right to left. What integer does 2**3**2 produce?",
      before: "2**3**2 ==",
      after: "",
      accept: ["512"],
      why: "2**3**2 is 2**(3**2) = 2**9 = 512. (2**3)**2 is 64.",
    },
    {
      kind: "fill-blank",
      id: "l2-p-unary",
      prompt: "Unary minus has lower precedence than **. What integer does -2**3 - 2 * 5 produce?",
      before: "-2**3 - 2 * 5 ==",
      after: "",
      accept: ["-18"],
      why: "-2**3 is -(2**3) = -8, and 2 * 5 is 10, so the expression is -8 - 10 = -18.",
    },
    {
      kind: "mcq",
      id: "l2-p-names",
      prompt: "Which of these is a legal Python variable name?",
      choices: ["import", "56abc", "car-talk", "car_talk"],
      answerIndex: 3,
      why: "car_talk starts with a letter and uses only letters and an underscore. import is a keyword, 56abc starts with a digit, and car-talk contains a hyphen.",
    },
    {
      kind: "spot-flaw",
      id: "l2-p-syntax",
      prompt: "This program is supposed to compute the area of a circle. Click the line that is a syntax error.",
      lines: [
        { id: "pi", text: "pi = 21 // 7" },
        { id: "area", text: "area = pi * r * r" },
        { id: "r", text: "r = 6.5" },
        { id: "bad", text: "r + 5 = r_new" },
        { id: "out", text: "print(area)" },
      ],
      flawLineId: "bad",
      why: "The left side of = must be a variable name. r + 5 = r_new will not run. The other mistakes (r used before assignment, and 21 // 7 as pi) are semantic.",
    },
    {
      kind: "mcq",
      id: "l2-p-neg",
      prompt: "What is 8 // -3 in Python?",
      choices: ["-2", "-3", "2", "-2.666"],
      answerIndex: 1,
      why: "Floor division rounds toward negative infinity. 8 / -3 is about -2.666, and the floor of that is -3.",
    },
  ],
  challenge: [
    {
      id: "l2-c-temp",
      prompt:
        "Write a single line of Python that converts 64 degrees Celsius to Fahrenheit and prints only that number. Use multiplication and print. (F = C * 9/5 + 32.)",
      solution: "print(64 * 9 / 5 + 32)",
      rubric:
        "Award full credit for a single statement that prints 64 * 9 / 5 + 32 (or an equivalent expression that evaluates to 147.2). The output must be the number, not a labeled sentence. Multiplication and print must both appear.",
    },
    {
      id: "l2-c-box",
      prompt:
        "A box is 16.5 by 12.5 by 5. Create variables length, width, and height. Compute volume and surface area into variables, then print both. Use five assignment statements and two print calls. Expected output:\nvolume = 1031.25\narea = 702.5",
      solution:
        "length = 16.5\nwidth = 12.5\nheight = 5\nvolume = length * width * height\narea = 2 * (length * width + length * height + width * height)\nprint('volume =', volume)\nprint('area =', area)",
      rubric:
        "Full credit requires length, width, height, volume, and area assigned, then two prints matching volume = 1031.25 and area = 702.5. Surface area is 2*(lw + lh + wh).",
    },
    {
      id: "l2-c-trace",
      prompt:
        "Without running it, what two integers does this program print?\n\nz = 2\nz = z**2**3\nprint(z)\nx = 6\nx = x**2 + 6 - z // 10 * 2\nprint(x)",
      solution: "256\n-8",
      rubric:
        "First line must be 256 because z**2**3 is 2**(2**3) = 256. Second line must be -8: 36 + 6 - (256 // 10) * 2 = 42 - 50. Both lines required.",
    },
  ],
};
