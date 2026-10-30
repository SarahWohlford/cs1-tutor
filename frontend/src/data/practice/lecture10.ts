import type { PracticeSet } from "../../practice/types";

// Original CSCI 1100 Lecture 10 questions on list aliasing, for loops, and slicing.
// Topics follow the course lecture. Wording is not copied from the notes or the exercises.
export const LECTURE_10_PRACTICE: PracticeSet = {
  chapter: "10",
  title: "Lists, Part 2",
  warmup: [
    {
      id: "l10-w-alias",
      front: "After L2 = L1, what does L2.append do to L1?",
      back: "It changes L1 as well. Both names refer to the same list.",
    },
    {
      id: "l10-w-copy",
      front: "How do you get a separate list with the same items?",
      back: "L1.copy(), list(L1), or L1[:]. Editing the copy does not edit L1.",
    },
    {
      id: "l10-w-for",
      front: "In for item in items, what is item?",
      back: "The value itself, one item per pass. It is not the index.",
    },
    {
      id: "l10-w-slice",
      front: "Is the stop index included in a slice?",
      back: "No. items[1:4] starts at index 1 and stops before index 4.",
    },
  ],
  practice: [
    {
      kind: "mcq",
      id: "l10-p-alias",
      prompt: "L1 = [1, 2]\nL2 = L1\nL2.append(3)\nWhat is L1?",
      choices: ["[1, 2]", "[1, 2, 3]", "[3]", "[1, 2, 3] and L2 is still [1, 2]"],
      answerIndex: 1,
      why: "L2 is another name for L1's list. append changes that list, so both names see [1, 2, 3].",
    },
    {
      kind: "mcq",
      id: "l10-p-copy",
      prompt: "L1 = [1, 2]\nL2 = L1.copy()\nL2.append(3)\nWhat is L1?",
      choices: ["[1, 2, 3]", "[1, 2]", "[1, 2] and L2 is [1, 2]", "[3]"],
      answerIndex: 1,
      why: "copy() makes a new list. Appending to L2 leaves L1 as [1, 2]. L2 is [1, 2, 3].",
    },
    {
      kind: "mcq",
      id: "l10-p-param",
      prompt: "def stamp(nums):\n    nums.append(1)\n\nvalues = [4]\nstamp(values)\nWhat is values?",
      choices: ["[4]", "[4, 1]", "[1]", "The function raises TypeError"],
      answerIndex: 1,
      why: "The parameter nums is an alias of values. append changes the caller's list.",
    },
    {
      kind: "mcq",
      id: "l10-p-rebind",
      prompt: "def wipe(nums):\n    nums = [0]\n\nvalues = [4]\nwipe(values)\nWhat is values?",
      choices: ["[0]", "[4]", "[4, 0]", "None"],
      answerIndex: 1,
      why: "nums = [0] points the parameter at a new list. It does not retarget the caller's name values.",
    },
    {
      kind: "fill-blank",
      id: "l10-p-range",
      prompt: "range(3, 8) produces 3, 4, 5, 6, and then one more number.",
      before: "The last number is",
      after: "",
      accept: ["7"],
      why: "The stop value 8 is not included. The sequence is 3, 4, 5, 6, 7.",
    },
    {
      kind: "mcq",
      id: "l10-p-slice",
      prompt: "colors = ['red', 'blue', 'green', 'gold']\nWhat is colors[1:3]?",
      choices: [
        "['blue', 'green', 'gold']",
        "['blue', 'green']",
        "['red', 'blue']",
        "['green']",
      ],
      answerIndex: 1,
      why: "The slice starts at index 1 and stops before index 3. That is blue and green.",
    },
    {
      kind: "mcq",
      id: "l10-p-join",
      prompt: "What is ' '.join(['no', 'one'])?",
      choices: ["['no', 'one']", "'noone'", "'no one'", "'no, one'"],
      answerIndex: 2,
      why: "join pastes the list into one string, with the separator between the parts. The separator here is one space.",
    },
    {
      kind: "mcq",
      id: "l10-p-split",
      prompt: "What is 'one  two'.split()?",
      choices: ["['one', '', 'two']", "['one', 'two']", "['one  two']", "'one two'"],
      answerIndex: 1,
      why: "split() with no argument breaks on any whitespace and does not keep the empty piece between the two spaces.",
    },
  ],
  challenge: [
    {
      id: "l10-c-double",
      prompt:
        "Write double_in_place(nums) using a for loop and range. Multiply every item by 2 in the same list and return that list. double_in_place([2, 5]) must be [4, 10]. Building a separate list and returning it does not count.",
      solution:
        "def double_in_place(nums):\n    for i in range(len(nums)):\n        nums[i] = nums[i] * 2\n    return nums",
      rubric:
        "Full credit if the function uses range and an index, writes the doubled value back into nums, and returns the same list. double_in_place([2, 5]) is [4, 10]. A brand-new list, a missing index assignment, or a while loop misses the task.",
    },
  ],
};
