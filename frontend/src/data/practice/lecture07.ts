import type { PracticeSet } from "../../practice/types";

// Original CSCI 1100 Lecture 7 questions on tuples, modules, and images.
// Topics follow the course lecture. Wording is not copied from the notes or the exercises.
export const LECTURE_07_PRACTICE: PracticeSet = {
  chapter: "7",
  title: "Tuples, Modules, and Images",
  warmup: [
    {
      id: "l7-w-index",
      front: "What is the index of the first item in a tuple?",
      back: "0. point[0] is the first item of point, and point[1] is the second.",
    },
    {
      id: "l7-w-frozen",
      front: "Can you replace an item inside a tuple?",
      back: "No. A tuple is immutable. pair[0] = 9 raises TypeError. Build a new tuple instead.",
    },
    {
      id: "l7-w-unpack",
      front: "What does width, height = (80, 40) do?",
      back: "It unpacks the tuple. width becomes 80 and height becomes 40. The two names are filled together.",
    },
    {
      id: "l7-w-image",
      front: "Name four Image operations at a high level.",
      back: "open loads a file, size is the width and height, crop cuts a rectangle, resize changes the dimensions, and paste lays one image on another. Pillow may be missing, and this tutor does not ship image files.",
    },
  ],
  practice: [
    {
      kind: "fill-blank",
      id: "l7-p-index",
      prompt: "point = (3, 5, 7)",
      before: "point[0] ==",
      after: "",
      accept: ["3"],
      why: "Tuple indexes start at 0. The first item is 3, not 5.",
    },
    {
      kind: "mcq",
      id: "l7-p-immutable",
      prompt: "pair = (1, 2)\nWhat does pair[0] = 9 do?",
      choices: [
        "pair becomes (9, 2)",
        "It raises TypeError",
        "It returns a new tuple (9, 2)",
        "pair becomes [9, 2]",
      ],
      answerIndex: 1,
      why: "Tuples do not allow item assignment. Build a new tuple, such as (9, pair[1]), if you need a different pair.",
    },
    {
      kind: "mcq",
      id: "l7-p-unpack",
      prompt: "left, right = (4, 1)\nWhat is left?",
      choices: ["4", "1", "(4, 1)", "None"],
      answerIndex: 0,
      why: "Multiple assignment fills names from left to right. left gets 4 and right gets 1.",
    },
    {
      kind: "fill-blank",
      id: "l7-p-return",
      prompt: "def ends(text):\n    return text[0], text[-1]\nfirst, last = ends('code')",
      before: "last ==",
      after: "",
      accept: ["'e'", "\"e\""],
      why: "return text[0], text[-1] hands back one tuple. Unpacking gives first the letter c and last the letter e.",
    },
    {
      kind: "mcq",
      id: "l7-p-import",
      prompt: "The file starts with import math. Which call is the square root of 9?",
      choices: ["sqrt(9)", "math.sqrt(9)", "math.square_root(9)", "pi.sqrt(9)"],
      answerIndex: 1,
      why: "import math keeps the functions under the module name. math.sqrt is the function. A bare sqrt needs from math import sqrt.",
    },
    {
      kind: "mcq",
      id: "l7-p-size",
      prompt: "An image was opened and its size is (200, 80). What does that tuple mean?",
      choices: [
        "200 pixels tall and 80 pixels wide",
        "200 pixels wide and 80 pixels tall",
        "The file is 200 by 80 bytes",
        "The crop box is (200, 80)",
      ],
      answerIndex: 1,
      why: "Image.size is a tuple of (width, height). 200 is the width and 80 is the height.",
    },
    {
      kind: "mcq",
      id: "l7-p-crop",
      prompt: "Which description matches crop, resize, and paste?",
      choices: [
        "crop changes the file name, resize prints the image, paste deletes pixels",
        "crop cuts a rectangle, resize sets a new width and height, paste lays one image onto another",
        "crop returns a tuple, resize imports Pillow, paste assigns into a tuple",
        "All three require an image file that ships with this tutor",
      ],
      answerIndex: 1,
      why: "Those are the high-level Image jobs. This tutor does not include picture files, and Pillow may be absent on a given machine.",
    },
    {
      kind: "mcq",
      id: "l7-p-review",
      prompt: "The exam-skills list in this lecture is which of these?",
      choices: [
        "A second textbook with new page numbers",
        "A short list of skills from earlier lectures",
        "A new chapter on proofs",
        "A replacement for Practical Programming",
      ],
      answerIndex: 1,
      why: "The review only names skills already taught: expressions, strings, functions, modules, and decisions. It is not another book.",
    },
  ],
  challenge: [
    {
      id: "l7-c-tuple",
      prompt:
        "Write a tuple helper swap_ends(pair). pair is a tuple of two items. Return a new tuple with those items exchanged. Do not assign into pair. swap_ends(('left', 'right')) must be ('right', 'left'), and swap_ends((4, 1)) must be (1, 4).",
      solution:
        "def swap_ends(pair):\n    left, right = pair\n    return (right, left)",
      rubric:
        "Full credit if the function returns a new two-item tuple in reverse order for both examples and never assigns into the original tuple. Indexing with pair[0] and pair[1] is fine. Changing pair in place is not possible and is not credit.",
    },
  ],
};
