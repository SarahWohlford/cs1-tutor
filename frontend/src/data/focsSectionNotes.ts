import type { SectionNote } from "../utils/sectionNotes";

const empty = { vocabulary: [] as SectionNote["vocabulary"], formulas: [] as SectionNote["formulas"] };

// Study notes for CSCI 1100 Fall 2026 Lectures 2–12. Lecture 1 is not loaded.
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
  "5": {
    objectives:
      "Lecture 5 is writing your own functions. Name a job once, then call it wherever you need it. def stores the function, the indented body runs on a call, and return sends a value back. The course places this late in Practical Programming chapter 3.",
    vocabulary: [
      {
        term: "function",
        definition: "A named block of steps. You call it by name instead of copying the steps.",
      },
    ],
    formulas: [],
  },
  "5.1": {
    objectives:
      "If the same lines appear twice, a bug has to be fixed twice. A function gives that job one name. Call the name each time. That habit is DRY: don't repeat yourself.",
    vocabulary: [
      {
        term: "DRY",
        definition: "Don't repeat yourself. One function, many calls.",
      },
    ],
    formulas: [],
  },
  "5.2": {
    objectives:
      "def starts a function and the header ends with a colon. The body is indented underneath. return hands a value back to the caller and skips the rest of the body. A function that never reaches return gives back None.",
    vocabulary: [
      {
        term: "return",
        definition: "Leaves the function and sends a value back. Without it, the call is worth None.",
      },
    ],
    formulas: [],
  },
  "5.3": {
    objectives:
      "A parameter is the name written in the def header. An argument is the value passed at the call. A local variable is a name assigned inside the body. Locals exist only during that call. Assigning a local does not change a variable in the caller, even when the names match.",
    vocabulary: [
      {
        term: "parameter",
        definition: "The name in the header that receives an argument.",
      },
      {
        term: "local variable",
        definition: "A name created inside the function. It is gone when the call ends.",
      },
    ],
    formulas: [],
  },
  "5.4": {
    objectives:
      "Python reads the file from top to bottom, but a def line only stores the function. The body runs when a call happens. Execution jumps into the body, hits return, and continues at the next line of the caller.",
    vocabulary: [
      {
        term: "flow of control",
        definition: "The order in which lines actually run. A call jumps in and return jumps back.",
      },
    ],
    formulas: [],
  },
  "5.5": {
    objectives:
      "One function may call another. The inner call runs all the way to its return before the outer function continues. The same function can also be called more than once with different arguments.",
    vocabulary: [],
    formulas: [],
  },
  "5.6": {
    objectives:
      "Several parameters are separated by commas. At the call, arguments line up by position: the first argument fills the first parameter. def fence(length, width): return 2 * (length + width), so fence(5, 3) is 16.",
    vocabulary: [],
    formulas: [],
  },
  "5.7": {
    objectives:
      "import math belongs near the top of the file. math.pi is the circle constant. Use it inside a function you write, as in return math.pi * radius ** 2, instead of typing a shortened decimal.",
    vocabulary: [
      {
        term: "math.pi",
        definition: "The constant π from the math module, available after import math.",
      },
    ],
    formulas: [],
  },
  "5.8": {
    objectives:
      "Lay a file out in four layers: a short comment saying what the program does, then imports, then the def blocks, then a main function that reads input, calls the other functions, and prints. Call main() on the last line, after every def.",
    vocabulary: [
      {
        term: "main",
        definition: "The function that starts the program's work by calling the others.",
      },
    ],
    formulas: [],
  },
  "5.9": {
    objectives:
      "Encapsulation means the caller relies on the function's name, its parameters, and what it returns, not on the temporary names inside. You can rewrite the body later if the same arguments still produce the same result.",
    vocabulary: [
      {
        term: "encapsulation",
        definition: "Hiding the steps behind the function's name so callers use the result, not the locals.",
      },
    ],
    formulas: [],
  },
  "5.10": {
    objectives:
      "Lecture 5 practice: a conversion function that returns a number, and a function that only prints and does not return. Open Study questions on the learning page, or click this section.",
    vocabulary: [],
    formulas: [],
  },
  "6": {
    objectives:
      "Lecture 6 is decisions. Comparisons produce True or False, and if, elif, and else choose which block runs. and, or, and not combine those tests. The course places this in Practical Programming chapter 5.",
    vocabulary: [
      {
        term: "condition",
        definition: "An expression whose value is True or False, used to choose a branch.",
      },
    ],
    formulas: [],
  },
  "6.1": {
    objectives:
      "A bool is either True or False. Those two names are values, not strings. A comparison such as 3 < 10 produces a bool. if expects that kind of value.",
    vocabulary: [
      {
        term: "bool",
        definition: "The type of True and False.",
      },
    ],
    formulas: [],
  },
  "6.2": {
    objectives:
      "Relational operators compare two values and give back a bool: <, <=, >, >=, ==, and !=. On numbers they use numeric order. On strings they compare one character at a time, so 'cat' < 'dog' because c comes before d, and 'cat' == 'Cat' is False because the cases differ.",
    vocabulary: [
      {
        term: "relational operator",
        definition: "A comparison such as < or == that produces True or False.",
      },
    ],
    formulas: [],
  },
  "6.3": {
    objectives:
      "== asks whether two values are equal. = stores a value in a name. if x = 3 is a syntax error, because that line is trying to assign inside the condition. Write if x == 3.",
    vocabulary: [
      {
        term: "==",
        definition: "Equality test. It does not store anything.",
      },
    ],
    formulas: [],
  },
  "6.4": {
    objectives:
      "if runs its indented block only when the condition is true. else runs when that condition is false. Exactly one of the two blocks runs. Both headers end with a colon, and the bodies are indented.",
    vocabulary: [],
    formulas: [],
  },
  "6.5": {
    objectives:
      "elif adds another condition after an if. Python checks the branches from top to bottom and runs the first one whose condition is true. Later branches, including else, are skipped. Use elif when the choices are mutually exclusive, such as grade bands.",
    vocabulary: [
      {
        term: "elif",
        definition: "An extra branch checked only when every earlier condition was false.",
      },
    ],
    formulas: [],
  },
  "6.6": {
    objectives:
      "and is true only when both sides are true. or is true when at least one side is true. not flips True to False and False to True. Parentheses make a mixed expression easier to read: not (score < 0 or score > 100).",
    vocabulary: [
      {
        term: "and",
        definition: "True only if both sides are true.",
      },
      {
        term: "not",
        definition: "Flips a bool.",
      },
    ],
    formulas: [],
  },
  "6.7": {
    objectives:
      "Python's or is inclusive. It is true when the left side is true, when the right side is true, or when both are true. (1 == 1) or (2 == 2) is True. Inclusive or does not mean 'one or the other, but not both'.",
    vocabulary: [
      {
        term: "inclusive or",
        definition: "or stays true when both sides are true.",
      },
    ],
    formulas: [],
  },
  "6.8": {
    objectives:
      "Lecture 6 practice: predict a few comparisons, then write a short input check that uses if/elif and prints an average. Open Study questions on the learning page, or click this section.",
    vocabulary: [],
    formulas: [],
  },
  "7": {
    objectives:
      "Lecture 7 groups three tools: tuples, modules, and images. A tuple holds a fixed sequence and indexes from 0. A module is a file of functions you import. Images are a high-level look at open, size, crop, resize, and paste. Most of this lecture sits outside Practical Programming. No picture files are included here, and Pillow may be missing on a given machine.",
    vocabulary: [
      {
        term: "tuple",
        definition: "An ordered group of values written with parentheses. The group itself cannot be edited in place.",
      },
    ],
    formulas: [],
  },
  "7.1": {
    objectives:
      "Indexes start at 0. For point = (3, 5, 7), point[0] is 3, point[1] is 5, and point[-1] is the last item, 7. len(point) is 3. A bad index raises IndexError.",
    vocabulary: [
      {
        term: "index",
        definition: "The position of an item. The first position is 0.",
      },
    ],
    formulas: [],
  },
  "7.2": {
    objectives:
      "A tuple is immutable. pair[0] = 9 raises TypeError. You cannot append to it either. If you need a different pair, build a new one, such as (9, pair[1]). The old tuple stays as it was.",
    vocabulary: [
      {
        term: "immutable",
        definition: "Cannot be changed in place. Item assignment on a tuple fails.",
      },
    ],
    formulas: [],
  },
  "7.3": {
    objectives:
      "One assignment can fill several names from a tuple: width, height = (80, 40) sets width to 80 and height to 40. The number of names must match the number of items. The same pattern reads a pair you already have: left, right = pair.",
    vocabulary: [
      {
        term: "multiple assignment",
        definition: "Filling several names from one tuple in a single line.",
      },
    ],
    formulas: [],
  },
  "7.4": {
    objectives:
      "A function can return two values by returning one tuple: return low, high. The caller unpacks it: small, large = extremes(nums). You still returned a single object, the tuple. The caller decides the names.",
    vocabulary: [],
    formulas: [],
  },
  "7.5": {
    objectives:
      "import math loads that module, and math.sqrt(9) calls a function that lives inside it. from math import sqrt lets you call sqrt(9) with no prefix. A module is just a collection of names. Use the prefix form unless you have a reason to pull one name in.",
    vocabulary: [
      {
        term: "module function",
        definition: "A function that lives in an imported module, called as module.function(arguments).",
      },
    ],
    formulas: [],
  },
  "7.6": {
    objectives:
      "Pillow's Image type is the usual way to touch a picture, and the import can fail when Pillow is not installed. At a high level: Image.open(path) loads a file, image.size is a (width, height) tuple, crop(box) cuts a rectangle, resize((width, height)) builds a new size, and paste lays one image onto another at a position. This tutor does not add image files.",
    vocabulary: [
      {
        term: "Image.size",
        definition: "A tuple (width, height) for an opened picture.",
      },
    ],
    formulas: [],
  },
  "7.7": {
    objectives:
      "Exam review here is only a reminder of skills already taught, not a second textbook and not a new set of page numbers. You should be able to: evaluate expressions and assign variables, work with strings and input, call built-ins and methods, import a module, define a function with parameters and return, and choose a branch with if, elif, else, and, or, and not.",
    vocabulary: [],
    formulas: [],
  },
  "7.8": {
    objectives:
      "Lecture 7 practice: write a small tuple helper that returns a new tuple. Open Study questions on the learning page, or click this section.",
    vocabulary: [],
    formulas: [],
  },
  "8": {
    objectives:
      "Lecture 8 is the first pass at lists. A list is an ordered, editable sequence in square brackets. You can read items, replace them, ask for the sum or the extremes, reorder, and add or delete items. A list can also hold other lists. The course places this in Practical Programming sections 8.1–8.3.",
    vocabulary: [
      {
        term: "list",
        definition: "An ordered collection written with square brackets. Items can be replaced.",
      },
    ],
    formulas: [],
  },
  "8.1": {
    objectives:
      "Write a list with square brackets: scores = [70, 85, 90]. Indexes start at 0, so scores[0] is 70 and scores[1] is 85. len(scores) is 3. A bad index raises IndexError.",
    vocabulary: [
      {
        term: "index",
        definition: "The position of a list item. The first position is 0.",
      },
    ],
    formulas: [],
  },
  "8.2": {
    objectives:
      "Unlike a tuple, a list lets you replace an item: nums[1] = 8 changes that slot and leaves the others. A negative index counts from the end. nums[-1] is the last item, and nums[-2] is the one before it. nums[-1] = 0 replaces the last item.",
    vocabulary: [
      {
        term: "negative index",
        definition: "An index counted from the end. -1 is the last item.",
      },
    ],
    formulas: [],
  },
  "8.3": {
    objectives:
      "sum(nums) adds the numbers. max(nums) is the largest, and min(nums) is the smallest. For nums = [4, 8, 7], the sum is 19, the max is 8, and the min is 4. These functions do not reorder the list.",
    vocabulary: [],
    formulas: [],
  },
  "8.4": {
    objectives:
      "vals.sort() reorders that list and returns None. Do not write vals = vals.sort(), or you will replace the list with None. sorted(vals) returns a new list in order and leaves vals as it was.",
    vocabulary: [
      {
        term: "sort()",
        definition: "Reorders a list in place and returns None.",
      },
      {
        term: "sorted()",
        definition: "Returns a new ordered list and does not change the original.",
      },
    ],
    formulas: [],
  },
  "8.5": {
    objectives:
      "append(item) adds at the end. insert(index, item) adds at that position and shifts the rest right. pop() removes and returns the last item; pop(index) removes that slot. remove(value) deletes the first item equal to value. pop works by position. remove works by value.",
    vocabulary: [
      {
        term: "append()",
        definition: "Adds one item at the end of the list.",
      },
      {
        term: "remove()",
        definition: "Deletes the first item equal to the given value.",
      },
    ],
    formulas: [],
  },
  "8.6": {
    objectives:
      "A list item can be another list: grid = [[1, 2], [3, 4]]. grid[0] is [1, 2]. grid[1][0] is 3, the first item of the second row. Replacing grid[0][1] changes only that inner slot.",
    vocabulary: [
      {
        term: "nested list",
        definition: "A list stored as an item of another list. Reach it with two indexes.",
      },
    ],
    formulas: [],
  },
  "8.7": {
    objectives:
      "Lecture 8 practice: trace a short list, then do a tiny in-place edit. Open Study questions on the learning page, or click this section.",
    vocabulary: [],
    formulas: [],
  },
  "9": {
    objectives:
      "Lecture 9 repeats a block of code with a while loop. The course points this reading at Practical Programming section 9.6, and it teaches while loops before for loops. A while loop keeps going only while its condition is true, and it stops when that condition is false.",
    vocabulary: [
      {
        term: "while loop",
        definition: "A loop that runs its body, then checks the condition again, until the condition is false.",
      },
    ],
    formulas: [],
  },
  "9.1": {
    objectives:
      "Use a loop when the same steps should happen more than once, such as visiting every item in a list. Python can repeat work with while or with for. while is the more general form: a for loop can be rewritten as a while loop. This lecture starts with while.",
    vocabulary: [],
    formulas: [],
  },
  "9.2": {
    objectives:
      "A counting loop needs a start value, a condition, and a change inside the body. For i = 1, the body runs while i < 10, and the body must do i += 1. Counting down uses i -= 1 and a condition such as i > 0. If that update is missing, or if the update moves the variable the wrong way, the condition stays true and the loop never ends. Code before the while runs once. Code after the while runs only after the condition is false.",
    vocabulary: [
      {
        term: "loop variable",
        definition: "A name the loop checks and updates. Give it a start value before the while.",
      },
    ],
    formulas: [],
  },
  "9.3": {
    objectives:
      "To visit every item, start an index at 0 and keep going while the index is less than len(items). The last valid index is len(items) - 1. items[i] is the item at that position. If each item is a pair, items[i][0] is the first part of the pair and items[i][1] is the second. Using i <= len(items) reads one past the end and raises IndexError.",
    vocabulary: [
      {
        term: "index",
        definition: "A number that picks one list item. Legal indexes run from 0 up to, but not including, the length.",
      },
    ],
    formulas: [],
  },
  "9.4": {
    objectives:
      "An accumulator is a variable that starts before the loop, usually at 0, and is updated on each pass. total += i adds the loop variable. total += items[i] adds a list item. Print the total after the loop, not inside it, if you want one result. sum(items) does this kind of walk for you, but you should still be able to write the loop.",
    vocabulary: [
      {
        term: "accumulator",
        definition: "A variable that collects a result one step at a time, such as a running total or a count.",
      },
    ],
    formulas: [],
  },
  "9.5": {
    objectives:
      "Some loops stop because of input, not because a counter hits a limit. A sentinel is a special value, such as 0, that means stop. Read a value in the body, and if it is the sentinel, set a flag so the condition fails. Otherwise fold the value into the total. Do not add the sentinel itself.",
    vocabulary: [
      {
        term: "sentinel",
        definition: "A special input that ends the loop. It is a signal, not another data value.",
      },
    ],
    formulas: [],
  },
  "9.6": {
    objectives:
      "A loop body can contain another loop. The inner loop finishes all of its passes before the outer loop takes one more step. For every pair of indexes, start the inner index over on each outer pass. Starting the inner index at the outer index plus one prints each unordered pair once and skips a value paired with itself.",
    vocabulary: [
      {
        term: "nested loop",
        definition: "A loop written inside the body of another loop.",
      },
    ],
    formulas: [],
  },
  "9.7": {
    objectives:
      "Lecture 9 practice: trace a while loop, then write one that walks a list by index. Open Study questions on the learning page, or click this section.",
    vocabulary: [],
    formulas: [],
  },
  "10": {
    objectives:
      "Lecture 10 stays with lists. Assigning one list name to another does not copy the items. A for loop walks the values. Change a slot by index, using range when you need the position. Slicing, copy, concatenation, and replication build a new list. split and join move between a string and a list of strings.",
    vocabulary: [
      {
        term: "alias",
        definition: "A second name for the same list. Editing through either name changes that one list.",
      },
    ],
    formulas: [],
  },
  "10.1": {
    objectives:
      "After L2 = L1, L1 and L2 refer to the same list. L2.append(...) and L2[0] = ... are visible through L1. A different list that happens to hold the same values is not an alias. L1.copy(), list(L1), and L1[:] each make a new list of the same items. That copy is shallow: inner lists are still shared.",
    vocabulary: [
      {
        term: "copy()",
        definition: "A list method that returns a new list with the same items.",
      },
    ],
    formulas: [],
  },
  "10.2": {
    objectives:
      "A function parameter gets its own copy of a number or a boolean. A list parameter is an alias of the list that was passed in. Appending, sorting, or replacing items inside the function changes the caller's list. Writing names = some_other_list only retargets the parameter. The caller's variable still refers to the original list.",
    vocabulary: [],
    formulas: [],
  },
  "10.3": {
    objectives:
      "for animal in animals: sets animal to each item in order. The name after for is the item, not the index. You can append a changed item onto a new list and leave the original as it was. Assigning animal = animal.capitalize() rebinds that name. It does not replace the string stored in the list.",
    vocabulary: [
      {
        term: "for loop",
        definition: "A loop that sets its variable to each item of a sequence, one pass per item.",
      },
    ],
    formulas: [],
  },
  "10.4": {
    objectives:
      "range(5) produces 0, 1, 2, 3, 4. range(start, stop) stops before stop. range(start, stop, step) adds step, which may be negative. for i in range(len(names)): gives the index, so names[i] = names[i].capitalize() replaces that item. You do not write the i += 1 yourself.",
    vocabulary: [
      {
        term: "range",
        definition: "A generator of integers. The stop value is not included.",
      },
    ],
    formulas: [],
  },
  "10.5": {
    objectives:
      "items[start:stop] builds a new list from start up to, but not including, stop. Leave off start to begin at 0, or leave off stop to run through the end. A negative index counts from the end. items[::2] keeps the even indexes. items + more and [0] * 3 also create new lists. append, sort, pop, and remove change the list you already have.",
    vocabulary: [
      {
        term: "slice",
        definition: "A new list made from a stretch of an existing list. The end index is not included.",
      },
    ],
    formulas: [],
  },
  "10.6": {
    objectives:
      "list('hi') is ['h', 'i']. s.split() breaks on whitespace and drops empty pieces. s.split(' ') splits on a single space and can leave empty strings. separator.join(parts) pastes the parts together with that separator between them. Strings can be indexed and sliced, but s[i] = 'x' raises TypeError because a string cannot be changed in place.",
    vocabulary: [
      {
        term: "split()",
        definition: "A string method that returns a list of pieces.",
      },
      {
        term: "join()",
        definition: "A string method that pastes a list of strings into one string.",
      },
    ],
    formulas: [],
  },
  "10.7": {
    objectives:
      "Lecture 10 practice: tell an alias from a copy, then update a list by index. Open Study questions on the learning page, or click this section.",
    vocabulary: [],
    formulas: [],
  },
  "11": {
    objectives:
      "Lecture 11 returns to decisions and to how a program is organized. Solve a small piece, move repeated work into a function, and test both ordinary inputs and inputs at the edge. and, or, and not combine conditions. A condition can be stored in a name, and an if can sit inside another if.",
    vocabulary: [
      {
        term: "boolean",
        definition: "A value that is either True or False.",
      },
    ],
    formulas: [],
  },
  "11.1": {
    objectives:
      "Start with one small step that you can run, then add the next piece. Put a repeated block in a function with a name that says what it does. A function that promises a result should return on every path. A comment that only restates the next line, such as a note that an assignment increments a variable, does not earn its keep. State assumptions that a caller must meet.",
    vocabulary: [],
    formulas: [],
  },
  "11.2": {
    objectives:
      "A syntax error means the program does not run. A semantic error runs and does the wrong thing. Fix the first error first, because later messages may be fallout from it. Print the values just before and after the step you doubt. If you comment out later code and the failure disappears, the bug is in what you just removed. Do not treat an untested branch as correct.",
    vocabulary: [
      {
        term: "semantic error",
        definition: "A mistake in meaning. The program runs, but the result is wrong.",
      },
    ],
    formulas: [],
  },
  "11.3": {
    objectives:
      "Put definitions first. Under if __name__ == \"__main__\": put the steps that should run only when this file is the program. Running the file executes that block. Importing the file defines the functions and skips the block, so another file can call them without answering the prompts.",
    vocabulary: [
      {
        term: "main guard",
        definition: "The if __name__ == \"__main__\" block. It runs for a program and is skipped on import.",
      },
    ],
    formulas: [],
  },
  "11.4": {
    objectives:
      "import random, then pick a number. random.random() is a float from 0 up to, but not including, 1. random.randint(a, b) is an int that can be either endpoint. random.choice(options) returns one entry from the sequence. A walk can start at a position and repeatedly add choice([-1, 1]) until the position leaves the allowed interval. random.seed(n) repeats the same picks, which makes a test possible.",
    vocabulary: [
      {
        term: "random.choice",
        definition: "Returns one item from the sequence you pass in.",
      },
    ],
    formulas: [],
  },
  "11.5": {
    objectives:
      "and is true only when both sides are true. or is true when at least one side is true. not flips True and False. A truth table lists every True and False pair so you can see the result of and, or, and not. not (a and b) matches (not a) or (not b). not (a or b) matches (not a) and (not b). Python stops early: for and, a false left side means the right side is not evaluated; for or, a true left side means the right side is not evaluated.",
    vocabulary: [
      {
        term: "short-circuit",
        definition: "Skipping the rest of a boolean expression once the result is already known.",
      },
      {
        term: "truth table",
        definition: "A list of every True and False combination and the result of the expression.",
      },
    ],
    formulas: [],
  },
  "11.6": {
    objectives:
      "An inner if runs only when the outer condition is true as well. else attaches to the nearest if at that indent. You can store a test: ready = score >= 70, then write if ready. The name documents the test and avoids doing the same work twice. Check that every input you care about lands in some branch. In Python, changing the indent moves a line into a different branch.",
    vocabulary: [
      {
        term: "nested if",
        definition: "An if statement placed in the body of another if.",
      },
    ],
    formulas: [],
  },
  "11.7": {
    objectives:
      "Lecture 11 practice: trace a boolean expression, then compare two (stage, cycle) pairs. Open Study questions on the learning page, or click this section.",
    vocabulary: [],
    formulas: [],
  },
  "12": {
    objectives:
      "Lecture 12 finishes the loop material. The course places the rest of this reading in Practical Programming chapter 9. range can start, stop, and step. Nested loops walk pairs and tables. break leaves a loop, and continue skips the rest of one pass. A while loop still has to be able to end.",
    vocabulary: [
      {
        term: "break",
        definition: "Leaves the current loop immediately and continues with the code after it.",
      },
    ],
    formulas: [],
  },
  "12.1": {
    objectives:
      "range(10) yields 0 through 9. range(3, 8) yields 3 through 7. range(4, 20, 3) starts at 4 and adds 3 until it would reach or pass 20. A negative step counts backward: range(-1, -10, -1) yields -1 through -9. The stop value is never one of the results.",
    vocabulary: [
      {
        term: "step",
        definition: "The third argument to range. It is added after each value. The default step is 1.",
      },
    ],
    formulas: [],
  },
  "12.2": {
    objectives:
      "If the body reads s[i] and s[i+1], the last legal i is len(s) - 2. range(len(s) - 1) stops before that last index. If the body also reads i+5, i must stop early enough that i+5 is still inside s. Stopping too soon misses a real match. Stopping too late raises IndexError.",
    vocabulary: [],
    formulas: [],
  },
  "12.3": {
    objectives:
      "The inner for runs to completion for each value of the outer variable. The outer variable stays fixed during those inner passes. To visit every unordered pair once, and to skip pairing a value with itself, start the inner index at the outer index plus one.",
    vocabulary: [
      {
        term: "nested for",
        definition: "A for loop written in the body of another for loop.",
      },
    ],
    formulas: [],
  },
  "12.4": {
    objectives:
      "A list of lists can store one group of readings per site. for site in groups: visits each inner list, and site is an alias of that inner list. sum(site) / len(site) is the group's average. To find the smallest reading of all, walk each inner list and keep the smallest value seen so far.",
    vocabulary: [
      {
        term: "list of lists",
        definition: "A list whose items are themselves lists. The outer loop visits groups, and the inner loop visits values.",
      },
    ],
    formulas: [],
  },
  "12.5": {
    objectives:
      "break jumps to the first line after the current loop. continue jumps back to the next pass and skips the rest of the body. while True: runs until a break. A loop with break or continue can be rewritten without either one. Use them when the stop is clearer that way. More than one break or continue in the same loop is usually a sign to restructure it.",
    vocabulary: [
      {
        term: "continue",
        definition: "Skips the rest of this pass and starts the next one.",
      },
    ],
    formulas: [],
  },
  "12.6": {
    objectives:
      "A while loop ends only if something in the body can make the condition false. Repeatedly replacing a number greater than 1 with its square root moves it toward 1, so a test of x > 1 does end. A test of x >= 1 does not: the square root of 1 is 1, and the condition stays true.",
    vocabulary: [
      {
        term: "infinite loop",
        definition: "A loop whose condition never becomes false and that never hits a break.",
      },
    ],
    formulas: [],
  },
  "12.7": {
    objectives:
      "Lecture 12 practice: predict a range, then find the smallest value in a list of lists. Open Study questions on the learning page, or click this section.",
    vocabulary: [],
    formulas: [],
  },
};
