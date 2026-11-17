import type { PracticeSet } from "../../practice/types";

// Original CSCI 1100 Lecture 9 questions on while loops.
// Topics follow the course lecture. Wording is not copied from the notes or the exercises.
export const LECTURE_09_PRACTICE: PracticeSet = {
  chapter: "9",
  title: "While Loops",
  warmup: [
    {
      id: "l9-w-stop",
      front: "When does a while loop stop?",
      back: "When its condition is false. The body runs only while the condition is true.",
    },
    {
      id: "l9-w-update",
      front: "What happens if a counting loop never changes its variable?",
      back: "The condition stays true, so the loop does not end.",
    },
    {
      id: "l9-w-index",
      front: "What indexes are legal for a list of length n?",
      back: "0 through n - 1. The loop condition is i < len(items), not i <= len(items).",
    },
    {
      id: "l9-w-down",
      front: "How do you count down with while?",
      back: "Start at the high value, test i > 0, and subtract 1 in the body.",
    },
  ],
  practice: [
    {
      kind: "fill-blank",
      id: "l9-p-count",
      prompt: "i = 1\nwhile i < 4:\n    i += 1\nHow many times does the body run?",
      before: "",
      after: "",
      accept: ["3"],
      why: "i starts at 1. The body runs for 1, 2, and 3. After the third update, i is 4 and 4 < 4 is false.",
    },
    {
      kind: "mcq",
      id: "l9-p-final",
      prompt: "i = 1\nwhile i < 4:\n    i += 1\nWhat is i after the loop?",
      choices: ["3", "4", "1", "The loop never ends"],
      answerIndex: 1,
      why: "The last body pass sets i to 4. The condition is then false, so the loop stops with i equal to 4.",
    },
    {
      kind: "spot-flaw",
      id: "l9-p-infinite",
      prompt: "This loop is supposed to print 0, 1, and 2 and then stop. Click the line that keeps it from ending.",
      lines: [
        { id: "start", text: "i = 0" },
        { id: "cond", text: "while i < 3:" },
        { id: "show", text: "    print(i)" },
        { id: "miss", text: "    i = i" },
      ],
      flawLineId: "miss",
      why: "i = i does not move i. The condition i < 3 stays true. The update needs to be i += 1.",
    },
    {
      kind: "fill-blank",
      id: "l9-p-sum",
      prompt: "nums = [4, 1, 5]\ni = 0\ntotal = 0\nwhile i < len(nums):\n    total += nums[i]\n    i += 1\nWhat is total?",
      before: "",
      after: "",
      accept: ["10"],
      why: "The loop adds 4, then 1, then 5. The total is 10. i ends at 3, which is the length.",
    },
    {
      kind: "mcq",
      id: "l9-p-bound",
      prompt: "nums has length 3. Which condition visits every item once and does not raise IndexError?",
      choices: ["while i <= len(nums)", "while i < len(nums)", "while i < len(nums) - 2", "while i != 0"],
      answerIndex: 1,
      why: "Indexes 0, 1, and 2 are legal. i <= len(nums) eventually uses index 3, which does not exist.",
    },
    {
      kind: "mcq",
      id: "l9-p-sentinel",
      prompt: "A loop adds numbers the user types and stops when the user types 0. Which value should be added?",
      choices: [
        "Every number, including the final 0",
        "Every number except the 0 that ends the loop",
        "Only the 0",
        "Nothing until the user types 0",
      ],
      answerIndex: 1,
      why: "0 is the sentinel. It signals stop and is not one of the values being totaled.",
    },
    {
      kind: "mcq",
      id: "l9-p-nested",
      prompt: "An outer while walks i from 0 to 2, and for each i an inner while walks j from 0 to 2. How many times does the inner body run?",
      choices: ["3", "6", "9", "2"],
      answerIndex: 2,
      why: "Each of the 3 outer passes runs the inner loop 3 times. 3 times 3 is 9.",
    },
  ],
  challenge: [
    {
      id: "l9-c-count",
      prompt:
        "Write count_above(nums, cutoff) with a while loop and an index. Return how many items are strictly greater than cutoff. count_above([4, 9, 2, 9], 5) must return 2. Do not use a for loop.",
      solution:
        "def count_above(nums, cutoff):\n    i = 0\n    count = 0\n    while i < len(nums):\n        if nums[i] > cutoff:\n            count += 1\n        i += 1\n    return count",
      rubric:
        "Full credit if a while loop starts an index at 0, continues while the index is less than the length, counts items strictly greater than cutoff, increments the index every pass, and returns the count. count_above([4, 9, 2, 9], 5) is 2. Using >=, forgetting the index update, or using a for loop misses the task.",
    },
  ],
};
