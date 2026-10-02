import type { SectionNote } from "../utils/sectionNotes";

const empty = { vocabulary: [] as SectionNote["vocabulary"], formulas: [] as SectionNote["formulas"] };

// Study notes for CSCI 1100 Fall 2026 Lecture 2. Lecture 1 is not loaded.
export const FOCS_SECTION_NOTES: Record<string, SectionNote> = {
  "2": {
    objectives:
      "Lecture 2 treats Python as a calculator: expressions, types, precedence, variables, print, and the difference between syntax errors and semantic errors. Most of this is Practical Programming chapter 2. Lecture 1 (course logistics and Hello World) is not loaded.",
    vocabulary: [
      {
        term: "expression",
        definition: "A combination of values, variables, and operators that Python evaluates to a value.",
        example: "2 * base_area + 2 * pi * radius * height",
      },
      {
        term: "variable",
        definition: "A name associated with a value. The name does not exist until it is assigned.",
      },
    ],
    formulas: [
      {
        expr: "F = C * 9/5 + 32",
        explanation: "Celsius to Fahrenheit. Multiply before you add, or use parentheses.",
      },
    ],
  },
  "2.1": {
    objectives:
      "Use the Python shell as a calculator for the area of a circle, minutes in a year, the volume of a box, and the volume of the Earth. Operators introduced: +, -, *, /, and **.",
    ...empty,
    vocabulary: [
      {
        term: "**",
        definition: "Exponentiation. 2 ** 3 is 8.",
      },
    ],
    formulas: [],
  },
  "2.2": {
    objectives:
      "Use // for floor division and % for the remainder when you need a whole number of hours and leftover minutes. Try all four sign combinations of 8 and 3 before you trust negative results.",
    ...empty,
    vocabulary: [
      {
        term: "//",
        definition: "Floor division. It divides and rounds down. 8 // 3 is 2. 8 // -3 is -3.",
        example: "8 // 3, 8 // -3, -8 // 3, -8 // -3",
      },
      {
        term: "%",
        definition: "Remainder after floor division. 8 % 3 is 2.",
      },
    ],
    formulas: [],
  },
  "2.3": {
    objectives:
      "A type is a set of values plus the operations on those values. float approximates real numbers with limited precision (try 2/3, 5/3, and 8/3). int is a whole number and can be arbitrarily large. Mixing an int with a float, or using /, produces a float. Each value is an object.",
    ...empty,
    vocabulary: [
      {
        term: "float",
        definition: "A finite approximation of a real number. 9. and 9.0 are floats. 9 is not.",
      },
      {
        term: "int",
        definition: "An integer: ..., -2, -1, 0, 1, 2, ... Python ints are not limited to a fixed number of bits.",
      },
    ],
    formulas: [],
  },
  "2.4": {
    objectives:
      "Operations apply from highest precedence to lowest: parentheses, then ** (right to left), then unary minus, then *, /, //, % (left to right), then + and - (left to right). 45 - 32 * 5 / 9 does not convert 45 Fahrenheit to Celsius, because * and / happen before -.",
    ...empty,
    vocabulary: [
      {
        term: "precedence",
        definition: "The order Python applies operators when an expression has more than one.",
        example: "(45 - 32) * 5 / 9",
      },
    ],
    formulas: [
      {
        expr: "(45 - 32) * 5 / 9",
        explanation: "Parentheses force the subtraction to happen before scaling Fahrenheit to Celsius.",
      },
    ],
  },
  "2.5": {
    objectives:
      "A variable is a name with a value associated with it. The right-hand side of = is evaluated and then stored in the name on the left. base_area * height = volume is not legal. There is no output until you print.",
    ...empty,
    vocabulary: [
      {
        term: "assignment",
        definition: "The = operator stores the value of the expression on the right in the variable on the left. It is not mathematical equality.",
        example: "base_area = pi * radius ** 2",
      },
    ],
    formulas: [
      {
        expr: "pi = 3.14159",
        explanation: "Then radius = 2 and height = 10. base_area = pi * radius ** 2, volume = base_area * height, surface_area = 2 * base_area + 2 * pi * radius * height. Volume is 125.6636 and surface area is 150.79632.",
      },
    ],
  },
  "2.6": {
    objectives:
      "print joins strings and variable values, separated by commas, into one line of output.",
    ...empty,
    vocabulary: [
      {
        term: "print",
        definition: "A function that displays values. Separate items with commas.",
        example: "print(\"volume is\", volume, \", surface area is\", surface_area)",
      },
    ],
    formulas: [],
  },
  "2.7": {
    objectives:
      "A legal name starts with a letter or underscore and continues with letters, underscores, or digits. Spaces and hyphens end the name. Capital and lowercase letters are different.",
    ...empty,
    vocabulary: [
      {
        term: "variable name",
        definition: "Must start with a letter or _. car_talk and abc56 are legal. 56abc, car-talk, and car talk are not.",
      },
    ],
    formulas: [],
  },
  "2.8": {
    objectives:
      "The shell (>>>) sends one statement at a time to the interpreter. Lecture exercises, labs, and homework belong in a saved file that you run. In Spyder, File → New File, save it, then use the green triangle. Lab 1 is the first practice with files.",
    ...empty,
    vocabulary: [
      {
        term: "shell",
        definition: "The interactive interpreter. A >>> prompt means the code is being typed directly, not saved in a file.",
      },
    ],
    formulas: [],
  },
  "2.9": {
    objectives:
      "A syntax error is a mistake in the form of the code. Python reports it before the program runs. A semantic error is a mistake in meaning: the program runs and the result is wrong. Using 21 // 7 as pi, or using r before it is assigned, are semantic errors. A variable does not exist until it is assigned.",
    ...empty,
    vocabulary: [
      {
        term: "syntax error",
        definition: "The code is not legal Python, so it will not run. r + 5 = r_new is a syntax error.",
      },
      {
        term: "semantic error",
        definition: "The code runs but means the wrong thing, so the output is incorrect.",
      },
    ],
    formulas: [],
  },
  "2.10": {
    objectives:
      "Keywords are reserved names with special meaning. They cannot be used as variables. In the shell: import keyword, then print(keyword.kwlist). The dot means “look up kwlist inside the keyword module.”",
    ...empty,
    vocabulary: [
      {
        term: "keyword",
        definition: "A reserved word such as import, if, or for. It cannot be a variable name.",
      },
    ],
    formulas: [],
  },
  "2.11": {
    objectives:
      "i = i + 1 reads the current value of i, adds 1, and stores it back. i += 1 means the same thing. Other mixed operators are -=, *=, and /=. += is the one you will see most.",
    ...empty,
    vocabulary: [
      {
        term: "+=",
        definition: "Add the right-hand side to the variable and store the result. i += 1 is exactly i = i + 1.",
      },
    ],
    formulas: [],
  },
  "2.12": {
    objectives:
      "An expression is values, names, and operators combined. In the programs so far, the expression sits on the right-hand side of an assignment.",
    ...empty,
    vocabulary: [
      {
        term: "expression",
        definition: "The part Python evaluates, such as the right-hand side 2 * base_area + 2 * pi * radius * height.",
      },
    ],
    formulas: [],
  },
  "2.13": {
    objectives:
      "Lecture 2 exercises for Submitty, submitted as part of Lab 1. Work them during or right after lecture. You may discuss them in a small group, but write and submit your own file. Three problems: convert 64 Celsius to Fahrenheit in one line, compute a 16.5 x 12.5 x 5 box, and predict the two-line output of the z/x program.",
    ...empty,
    vocabulary: [],
    formulas: [],
  },
  "3": {
    objectives:
      "Lecture 3 is strings: text in quotes, length, concatenation, conversion with str and int, repetition, escape characters, and multiline strings. These notes follow the course textbook topics. The textbook wording is not stored here.",
    vocabulary: [
      {
        term: "str",
        definition: "The string type. A string is a sequence of characters written between matching quotes.",
      },
    ],
    formulas: [],
  },
  "3.1": {
    objectives: "Write a string with matching single or double quotes. The empty string is '' or \"\". Mismatched quotes are a syntax error (EOL while scanning a string).",
    vocabulary: [
      {
        term: "empty string",
        definition: "A string with no characters. len('') is 0.",
      },
    ],
    formulas: [],
  },
  "3.2": {
    objectives: "len counts every character, including spaces. + on two strings concatenates them. + cannot mix a string and a number.",
    vocabulary: [
      {
        term: "concatenation",
        definition: "Joining two strings with +. 'cs' + '1' is 'cs1'.",
      },
    ],
    formulas: [],
  },
  "3.3": {
    objectives: "str(n) turns a number into text so it can be concatenated. int(s) and float(s) turn numeric text into a number. int('a') raises ValueError.",
    vocabulary: [
      {
        term: "str()",
        definition: "Convert a value to its text form. str(1100) is '1100'.",
      },
    ],
    formulas: [],
  },
  "3.4": {
    objectives: "A string times an integer repeats the string. 'ab' * 3 is 'ababab'. A count of 0 or less produces the empty string.",
    vocabulary: [
      {
        term: "repetition",
        definition: "string * n repeats the string n times when n is a positive integer.",
      },
    ],
    formulas: [],
  },
  "3.5": {
    objectives: "Use the other quote style when the text contains a quote. A backslash starts an escape: quote, backslash, tab, and newline. The escape is one character even though you type two.",
    vocabulary: [
      {
        term: "escape sequence",
        definition: "A backslash and the following character, stored as one character. \\n is a newline.",
      },
    ],
    formulas: [],
  },
  "3.6": {
    objectives: "A single-line quote cannot cross a line break. Triple quotes can. Each line break inside them becomes a \\n character. Python stores newlines as \\n even on Windows.",
    vocabulary: [
      {
        term: "newline",
        definition: "The character \\n. Triple-quoted strings insert one wherever the source starts a new line.",
      },
    ],
    formulas: [],
  },
  "3.7": {
    objectives: "Lecture 3 practice: length, concatenation with str, and repetition. Open Study questions on the learning page, or click this section.",
    vocabulary: [],
    formulas: [],
  },
};
