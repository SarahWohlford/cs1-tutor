import type { SectionNote } from "../utils/sectionNotes";

const empty = { vocabulary: [] as SectionNote["vocabulary"], formulas: [] as SectionNote["formulas"] };

// Study notes for CSCI 1100 Fall 2026 Lectures 2–4. Lecture 1 is not loaded.
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
      "Lecture 3 is strings, the third type after int and float. A lot of programs deal with text. These notes cover quotes, escapes, concatenation, repetition, len and conversions, print's sep and end, and input. Wording here is original.",
    vocabulary: [
      {
        term: "str",
        definition: "The string type. A string is a sequence of characters written between matching quotes.",
      },
    ],
    formulas: [],
  },
  "3.1": {
    objectives:
      "A string is zero or more characters between matching single quotes or matching double quotes. '' is empty. print shows the characters. Asking the interpreter for the value also shows the quotes. Assign a string the same way you assign a number.",
    vocabulary: [
      {
        term: "empty string",
        definition: "A string with no characters. len('') is 0.",
      },
    ],
    formulas: [],
  },
  "3.2": {
    objectives:
      "A double-quoted string may contain single quotes, and a single-quoted string may contain double quotes. The opening and closing marks must match. Triple quotes may cross lines. Each line break inside them is stored as a newline, which shows up as \\n when you look at the value and as a real line break when you print it.",
    vocabulary: [
      {
        term: "triple quotes",
        definition: "''' or \"\"\" around text that is allowed to span lines.",
      },
    ],
    formulas: [],
  },
  "3.3": {
    objectives:
      "A backslash in a string gives the next character a special meaning. \\n starts a new line, \\t jumps to the next tab stop, \\' and \\\" put a quote in the text, and \\\\ puts one backslash. You type two characters; Python stores one.",
    vocabulary: [
      {
        term: "escape sequence",
        definition: "A backslash and the following character, stored as one character. \\n is a newline.",
      },
    ],
    formulas: [],
  },
  "3.4": {
    objectives:
      "+ joins strings. 'Good' + ' ' + 'day' is 'Good day'. Two quoted pieces written next to each other also join, but two variables written next to each other are a syntax error. * an integer repeats the string. A count of 0 or less yields ''. A string times a float, or a string plus a number, is illegal.",
    vocabulary: [
      {
        term: "concatenation",
        definition: "Joining strings with + or by writing two string literals next to each other.",
      },
      {
        term: "replication",
        definition: "string * n repeats the string when n is an integer. 'Ha' * 3 is 'HaHaHa'.",
      },
    ],
    formulas: [],
  },
  "3.5": {
    objectives:
      "len(s) returns how many characters are in s, spaces included. str turns a number into text so it can be joined to a string. int and float turn numeric text into a number. int('a') or float('x') raises ValueError. Lectures 4 and 5 go further on functions.",
    vocabulary: [
      {
        term: "len()",
        definition: "Returns the number of characters in a string. len('Hello!') is 6.",
      },
      {
        term: "str()",
        definition: "Convert a value to text. str(1100) is '1100'.",
      },
    ],
    formulas: [],
  },
  "3.6": {
    objectives:
      "print takes any number of values. sep is placed between them (default is a space) and end is placed after the last one (default is a newline). input(prompt) waits for a line and returns it as a string. Convert with int or float before you do arithmetic. In class the cylinder program reads a radius and a height, computes base area, volume, and surface area, and prints both results.",
    vocabulary: [
      {
        term: "sep",
        definition: "The string print inserts between values. print(4, 2, sep=',') shows 4,2.",
      },
      {
        term: "end",
        definition: "The string print adds after the last value. The default is a newline. end='' stays on the same line.",
      },
      {
        term: "input()",
        definition: "Reads one line from the user and returns a string, even when the line looks like a number.",
      },
    ],
    formulas: [
      {
        expr: "volume = pi * radius ** 2 * height",
        explanation: "Surface area is 2 * base_area + 2 * pi * radius * height, with base_area = pi * radius ** 2.",
      },
    ],
  },
  "3.7": {
    objectives:
      "Lecture 3 practice: valid strings, escapes, concatenation, repetition, len, conversions, print's sep and end, and input. Open Study questions on the learning page, or click this section.",
    vocabulary: [],
    formulas: [],
  },
  "4": {
    objectives:
      "Lecture 4 is functions and modules. Built-in functions work on numbers and strings. Methods are functions attached to an object and called with a dot. Modules such as math add more functions after you import them.",
    vocabulary: [
      {
        term: "built-in function",
        definition: "A function that is available as soon as Python starts, such as len, abs, or round.",
      },
    ],
    formulas: [],
  },
  "4.1": {
    objectives:
      "Numerical built-ins to know: abs, pow, int, float, round, max, and min. abs(-4.6) is 4.6. round(-4.6) is -5. pow(2, 5) is 32. max and min take two or more values. int chops toward zero when given a float; float adds a decimal.",
    vocabulary: [
      {
        term: "round()",
        definition: "Nearest integer by default. A second argument sets the number of decimal places.",
      },
    ],
    formulas: [],
  },
  "4.2": {
    objectives:
      "Every value is an object. A method is a function that belongs to that object. Call it as value.method(arguments), for example 'good morning'.find('o', 3). Some operations stay in function form (len) or operator form (+). help(str) lists the string methods.",
    vocabulary: [
      {
        term: "method",
        definition: "A function called on an object with a dot: name.lower().",
      },
    ],
    formulas: [],
  },
  "4.3": {
    objectives:
      "Useful string methods: lower, upper, capitalize, title, replace, find, count, and strip. find returns the first index, or -1 when the text is missing. strip removes the given characters from both ends. None of these methods change the original string. Save the result if you need it.",
    vocabulary: [
      {
        term: "find()",
        definition: "Index of the first match, or -1. A second argument is the index to start at.",
      },
      {
        term: "replace()",
        definition: "A new string with each match swapped. 'book'.replace('o', 'a') is 'baak'.",
      },
    ],
    formulas: [],
  },
  "4.4": {
    objectives:
      "str.format fills the { } slots in a string from the arguments. {:.2f} shows a float with two digits after the decimal and rounds. You can number the slots ({0}, {1}) when the printed order should differ from the argument order. Leaving off :.2f uses the usual float text.",
    vocabulary: [
      {
        term: "format()",
        definition: "Builds a string by replacing each { } with an argument, with an optional format such as .2f.",
      },
    ],
    formulas: [],
  },
  "4.5": {
    objectives:
      "A module is a collection of functions and constants that is not loaded until you import it. import math, then call math.sqrt, math.trunc, math.ceil, math.log, and use math.pi and math.e. help(math) describes them. Assigning math.pi = 3 changes that name for the rest of the session.",
    vocabulary: [
      {
        term: "module",
        definition: "A library you load with import. math is one that ships with Python.",
      },
    ],
    formulas: [],
  },
  "4.6": {
    objectives:
      "import math keeps the names under math. from math import sqrt, pi brings those names in directly. import math as m shortens the prefix. from math import * dumps every name into your file and is a bad idea, because a later name can hide one of yours.",
    vocabulary: [
      {
        term: "import",
        definition: "Loads a module. The form you use decides whether you write math.sqrt or just sqrt.",
      },
    ],
    formulas: [],
  },
  "4.7": {
    objectives:
      "Order a file so the flow is easy to see: a short comment on what the program does, then imports, then variables and input, then the calculation, then output. The in-class sketch asks for a name, a radius, and a height, then prints the cylinder's surface area and volume with format.",
    vocabulary: [],
    formulas: [],
  },
  "4.8": {
    objectives:
      "Lecture 4 practice: built-ins, string methods, format, and the math module. Open Study questions on the learning page, or click this section.",
    vocabulary: [],
    formulas: [],
  },
};
