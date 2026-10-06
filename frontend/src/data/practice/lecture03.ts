import type { PracticeSet } from "../../practice/types";

// Original CSCI 1100 Lecture 3 questions on strings.
// Topics follow the course lecture. Wording is not copied from the notes or the exercises.
export const LECTURE_03_PRACTICE: PracticeSet = {
  chapter: "3",
  title: "Python Strings",
  warmup: [
    {
      id: "l3-w-str",
      front: "How do you write a string in Python?",
      back: "Put text in matching single quotes or matching double quotes. The type is str. '' is the empty string.",
    },
    {
      id: "l3-w-len",
      front: "What does len return for a string?",
      back: "The number of characters between the quotes. Spaces count. len('') is 0.",
    },
    {
      id: "l3-w-plus",
      front: "What does + do when both sides are strings?",
      back: "It concatenates them into a new string. It does not add them as numbers. A string plus an int raises TypeError.",
    },
    {
      id: "l3-w-star",
      front: "What does a string * an integer do?",
      back: "It repeats the string that many times. 'ab' * 3 is 'ababab'. A repeat count of 0 or less yields ''.",
    },
    {
      id: "l3-w-escape",
      front: "What is an escape sequence?",
      back: "A backslash plus the next character, standing for one character. \\n is a newline, \\' is a single quote, \\\\ is a backslash.",
    },
  ],
  practice: [
    {
      kind: "mcq",
      id: "l3-p-len",
      prompt: "What is len('cs 1')?",
      choices: ["3", "4", "5", "2"],
      answerIndex: 1,
      why: "The characters are c, s, space, and 1. The space counts, so the length is 4.",
    },
    {
      kind: "fill-blank",
      id: "l3-p-concat",
      prompt: "Concatenation joins the characters of two strings.",
      before: "'lab' + '1' ==",
      after: "",
      accept: ["'lab1'", "\"lab1\"", "lab1"],
      why: "+ on two strings pastes them together. The result is lab1.",
    },
    {
      kind: "mcq",
      id: "l3-p-type",
      prompt: "What happens when Python evaluates 'lab' + 1?",
      choices: [
        "It prints lab1",
        "It prints 1lab",
        "It raises TypeError",
        "It prints lab 1",
      ],
      answerIndex: 2,
      why: "Both sides of string + must be strings. Convert the number first: 'lab' + str(1).",
    },
    {
      kind: "fill-blank",
      id: "l3-p-repeat",
      prompt: "Repeating a string uses * and an integer.",
      before: "'py' * 3 ==",
      after: "",
      accept: ["'pypypy'", "\"pypypy\"", "pypypy"],
      why: "'py' * 3 repeats the two characters three times.",
    },
    {
      kind: "mcq",
      id: "l3-p-int",
      prompt: "What is int('64') + 1?",
      choices: ["'641'", "65", "64", "A ValueError"],
      answerIndex: 1,
      why: "int('64') converts the text to the integer 64. Adding 1 gives 65. int('6a') would raise ValueError.",
    },
    {
      kind: "mcq",
      id: "l3-p-quotes",
      prompt: "Which line is legal Python?",
      choices: [
        "msg = 'don't'",
        "msg = \"don't\"",
        "msg = 'dont\"",
        "msg = \"dont'",
      ],
      answerIndex: 1,
      why: "The opening and closing quotes must match. Double quotes let a single quote sit inside the text. Mismatched quotes are a syntax error.",
    },
    {
      kind: "spot-flaw",
      id: "l3-p-syntax",
      prompt: "Click the line that is a syntax error.",
      lines: [
        { id: "ok1", text: "course = 'CSCI 1100'" },
        { id: "ok2", text: "print(len(course))" },
        { id: "bad", text: "title = 'Python as a calculator" },
        { id: "ok3", text: "print(course)" },
      ],
      flawLineId: "bad",
      why: "The opening quote is never closed, so Python hits the end of the line while it is still inside the string.",
    },
    {
      kind: "mcq",
      id: "l3-p-newline",
      prompt: "A triple-quoted string that spans two lines contains which character between those lines?",
      choices: ["A space", "\\\\n", "Nothing", "Two backslashes"],
      answerIndex: 1,
      why: "Each line break inside a triple-quoted string becomes one newline character, written \\n.",
    },
    {
      kind: "mcq",
      id: "l3-p-sep",
      prompt: "What does print('red', 'blue', sep='-') display?",
      choices: ["red blue", "red-blue", "redblue", "red - blue"],
      answerIndex: 1,
      why: "sep replaces the default space between values. end is still a newline, so the next print starts on the following line.",
    },
    {
      kind: "mcq",
      id: "l3-p-input",
      prompt: "The user types 15 and presses Enter. What is the type of input('n: ')?",
      choices: ["int", "float", "str", "bool"],
      answerIndex: 2,
      why: "input always returns a string. int or float is a separate step if you need a number.",
    },
    {
      kind: "mcq",
      id: "l3-p-adjacent",
      prompt: "Which line is legal and equals 'Hi!'?",
      choices: ["'Hi' '!'", "s t   after s = 'Hi' and t = '!'", "'Hi' + '!'", "Both the first and the third"],
      answerIndex: 3,
      why: "Quoted pieces written next to each other are joined. Two variables written next to each other are a syntax error. + joins either.",
    },
    {
      kind: "spot-flaw",
      id: "l3-p-vars",
      prompt: "Click the line that is a syntax error.",
      lines: [
        { id: "a", text: "first = 'Good'" },
        { id: "b", text: "second = 'night'" },
        { id: "bad", text: "print(first second)" },
        { id: "c", text: "print(first + second)" },
      ],
      flawLineId: "bad",
      why: "Only string literals can sit next to each other. Variables need +.",
    },
  ],
  challenge: [
    {
      id: "l3-c-len",
      prompt: "Write Python that stores 'Computer Science' in a variable and prints only its length.",
      solution: "title = 'Computer Science'\nprint(len(title))",
      rubric:
        "Full credit if the program prints 16. The space between the words must be counted. len must be used.",
    },
    {
      id: "l3-c-join",
      prompt:
        "The variables course = 'CSCI' and num = 1100 already exist. Write one print that shows CSCI 1100. Do not write the digits inside a string by hand; convert num.",
      solution: "print(course + ' ' + str(num))",
      rubric:
        "Full credit for concatenation that uses str(num) and a space, printing CSCI 1100. course + num without str is a TypeError and is not correct.",
    },
    {
      id: "l3-c-rule",
      prompt: "Print a line of exactly 12 dashes, using repetition rather than typing twelve dash characters.",
      solution: "print('-' * 12)",
      rubric: "Full credit for print('-' * 12) or the same expression with double quotes. The output must be ------------.",
    },
    {
      id: "l3-c-input",
      prompt:
        "Write a program that asks for a city with input, stores the answer, and prints it as City: followed by the name. The prompt string is your choice.",
      solution: "city = input('City: ')\nprint('City:', city)",
      rubric:
        "Full credit if input reads one line as a string and print shows City: and that text. Do not call int or float on the answer.",
    },
  ],
};
