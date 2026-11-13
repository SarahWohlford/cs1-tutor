import type { PracticeSet } from "../../practice/types";

// Original CSCI 1100 Lecture 11 questions on logic, testing, and random steps.
// Topics follow the course lecture. Wording is not copied from the notes or the exercises.
export const LECTURE_11_PRACTICE: PracticeSet = {
  chapter: "11",
  title: "Decisions, Part 2",
  warmup: [
    {
      id: "l11-w-and",
      front: "When is a and b true?",
      back: "Only when both a and b are true. If either one is false, the result is false.",
    },
    {
      id: "l11-w-demorgan",
      front: "What matches not (a or b)?",
      back: "(not a) and (not b). Both sides have to fail.",
    },
    {
      id: "l11-w-main",
      front: "When does the if __name__ == \"__main__\" block run?",
      back: "When you run that file as the program. Importing the file skips the block and still defines the functions.",
    },
    {
      id: "l11-w-choice",
      front: "What does random.choice([-1, 1]) return?",
      back: "Either -1 or 1. It picks one entry from the sequence.",
    },
  ],
  practice: [
    {
      kind: "mcq",
      id: "l11-p-demorgan",
      prompt: "Which expression matches not (cold and wet)?",
      choices: [
        "(not cold) and (not wet)",
        "(not cold) or (not wet)",
        "cold or wet",
        "not cold and wet",
      ],
      answerIndex: 1,
      why: "Negating an and flips it into an or of the negated sides. The result is true when it is not cold, or not wet, or both.",
    },
    {
      kind: "mcq",
      id: "l11-p-short",
      prompt: "ready = False and ask_server()\nWhen does ask_server() run?",
      choices: [
        "Always",
        "Never, because the left side is already false",
        "Only when ask_server would return True",
        "Only when ready was True before this line",
      ],
      answerIndex: 1,
      why: "and stops when the left side is false. The right side is not evaluated, so ask_server is not called.",
    },
    {
      kind: "mcq",
      id: "l11-p-nested",
      prompt: "if x > 0:\n    if x < 0:\n        print(1)\n    else:\n        print(2)\nWhat prints for x = 3, and what prints for x = -1?",
      choices: [
        "3 prints 1, and -1 prints 2",
        "3 prints 2, and -1 prints nothing",
        "Both print 2",
        "3 prints nothing, and -1 prints 1",
      ],
      answerIndex: 1,
      why: "x = 3 enters the outer if, fails the inner test, and hits the else, so it prints 2. x = -1 fails the outer if, so neither print runs.",
    },
    {
      kind: "mcq",
      id: "l11-p-store",
      prompt: "score = 80\nready = score >= 70\nif ready:\n    print('go')\nWhat happens?",
      choices: [
        "ready is the number 80, so this is a type error",
        "ready is True, so the program prints go",
        "ready is False, so nothing prints",
        "The comparison cannot be stored in a name",
      ],
      answerIndex: 1,
      why: "score >= 70 is True. Storing that boolean and testing it later is the same as writing the comparison in the if.",
    },
    {
      kind: "fill-blank",
      id: "l11-p-randint",
      prompt: "random.randint(0, 2) includes both ends.",
      before: "The largest value it can return is",
      after: "",
      accept: ["2"],
      why: "randint includes the stop value. The possible results are 0, 1, and 2.",
    },
    {
      kind: "spot-flaw",
      id: "l11-p-empty",
      prompt: "This branch is supposed to catch a failing score, below 60. Click the line that can never be true.",
      lines: [
        { id: "read", text: "score = int(input('Score: '))" },
        { id: "pass", text: "if score >= 60:" },
        { id: "ok", text: "    print('pass')" },
        { id: "bad", text: "elif score >= 60 and score < 60:" },
        { id: "fail", text: "    print('fail')" },
      ],
      flawLineId: "bad",
      why: "A score cannot be both >= 60 and < 60. The fail message is unreachable. The failing case is score < 60.",
    },
  ],
  challenge: [
    {
      id: "l11-c-earlier",
      prompt:
        "Write before_release(a, b) for pairs like ('beta', 3) and ('gold', 3). In one cycle, beta comes before gold. A smaller cycle number is always earlier, no matter the stage. Return True only when a is strictly earlier than b. before_release(('gold', 2), ('beta', 3)) is True. before_release(('gold', 3), ('beta', 3)) is False. before_release(('beta', 3), ('gold', 3)) is True.",
      solution:
        "def before_release(a, b):\n    if a[1] != b[1]:\n        return a[1] < b[1]\n    if a[0] == b[0]:\n        return False\n    return a[0] == 'beta'",
      rubric:
        "Full credit if a smaller cycle is earlier regardless of stage, the same cycle and stage returns False, and in one cycle beta is earlier than gold. The three sample calls must match. Treating gold as earlier than beta in the same cycle, or ignoring the cycle number, misses the rule.",
    },
  ],
};
