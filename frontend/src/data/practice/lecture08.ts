import type { PracticeSet } from "../../practice/types";

// Original CSCI 1100 Lecture 8 questions on lists.
// Topics follow the course lecture. Wording is not copied from the notes or the exercises.
export const LECTURE_08_PRACTICE: PracticeSet = {
  chapter: "8",
  title: "Lists, Part 1",
  warmup: [
    {
      id: "l8-w-syntax",
      front: "How do you write a list of three scores?",
      back: "scores = [70, 85, 90]. Square brackets, commas between items. scores[0] is 70.",
    },
    {
      id: "l8-w-neg",
      front: "What does a negative index mean?",
      back: "It counts from the end. nums[-1] is the last item, and nums[-2] is the one before that.",
    },
    {
      id: "l8-w-sort",
      front: "What does sort() return?",
      back: "None. It reorders the list in place. sorted(nums) returns a new list and leaves the original alone.",
    },
    {
      id: "l8-w-edit",
      front: "Which list methods add or delete an item?",
      back: "append adds at the end. insert adds at an index. pop removes by index and returns the item. remove deletes the first matching value.",
    },
  ],
  practice: [
    {
      kind: "fill-blank",
      id: "l8-p-index",
      prompt: "nums = [4, 1, 7]",
      before: "nums[0] ==",
      after: "",
      accept: ["4"],
      why: "List indexes start at 0. The first item is 4.",
    },
    {
      kind: "mcq",
      id: "l8-p-assign",
      prompt: "nums = [4, 1, 7]\nnums[1] = 8\nWhat is nums?",
      choices: ["[4, 1, 7]", "[4, 8, 7]", "[8, 1, 7]", "[4, 1, 8]"],
      answerIndex: 1,
      why: "Lists can be changed in place. Index 1 was 1 and is now 8. The other items stay.",
    },
    {
      kind: "mcq",
      id: "l8-p-neg",
      prompt: "nums = [4, 8, 7]\nWhat is nums[-1]?",
      choices: ["4", "8", "7", "None"],
      answerIndex: 2,
      why: "Negative indexes count from the end. -1 is the last item, 7.",
    },
    {
      kind: "fill-blank",
      id: "l8-p-sum",
      prompt: "nums = [4, 8, 7]. Predict the built-in sum.",
      before: "sum(nums) ==",
      after: "",
      accept: ["19"],
      why: "sum adds the items: 4 + 8 + 7 is 19. max(nums) would be 8 and min(nums) would be 4.",
    },
    {
      kind: "mcq",
      id: "l8-p-sort-none",
      prompt: "vals = [3, 1, 2]\nresult = vals.sort()\nWhat is result, and what is vals?",
      choices: [
        "result is [1, 2, 3] and vals is [3, 1, 2]",
        "result is None and vals is [1, 2, 3]",
        "result is [1, 2, 3] and vals is [1, 2, 3]",
        "result is None and vals is [3, 1, 2]",
      ],
      answerIndex: 1,
      why: "sort reorders the list and returns None. Assigning the call back onto vals would wipe the list.",
    },
    {
      kind: "mcq",
      id: "l8-p-sorted",
      prompt: "vals = [3, 1, 2]\nfresh = sorted(vals)\nWhat is true afterward?",
      choices: [
        "vals is [1, 2, 3] and fresh is None",
        "vals is still [3, 1, 2] and fresh is [1, 2, 3]",
        "Both names refer to the same reordered list",
        "sorted raises TypeError on a list",
      ],
      answerIndex: 1,
      why: "sorted builds a new list. The original vals stays in its old order.",
    },
    {
      kind: "mcq",
      id: "l8-p-methods",
      prompt: "colors = ['red', 'blue']\ncolors.append('green')\ncolors.insert(0, 'gold')\ncolors.pop()\ncolors.remove('red')\nWhat is colors?",
      choices: [
        "['gold', 'blue']",
        "['gold', 'red', 'blue']",
        "['red', 'blue', 'green']",
        "['gold', 'blue', 'green']",
      ],
      answerIndex: 0,
      why: "append makes ['red', 'blue', 'green']. insert at 0 makes ['gold', 'red', 'blue', 'green']. pop removes green. remove deletes red. Left: ['gold', 'blue'].",
    },
    {
      kind: "fill-blank",
      id: "l8-p-grid",
      prompt: "grid = [[1, 2], [3, 4]]",
      before: "grid[1][0] ==",
      after: "",
      accept: ["3"],
      why: "grid[1] is the inner list [3, 4]. Index 0 of that inner list is 3.",
    },
  ],
  challenge: [
    {
      id: "l8-c-edit",
      prompt:
        "Write edit_scores(scores) for a list like [70, 85, 90]. Set index 0 to 75, append 100, and remove the value 85. Return the same list. edit_scores([70, 85, 90]) must be [75, 90, 100].",
      solution:
        "def edit_scores(scores):\n    scores[0] = 75\n    scores.append(100)\n    scores.remove(85)\n    return scores",
      rubric:
        "Full credit if the returned list is [75, 90, 100], the first item was changed in place, 100 was appended, and 85 was removed. Building a brand-new list with the right items is acceptable if the result matches. Leaving 85 in the list or dropping 90 misses the edit.",
    },
  ],
};
