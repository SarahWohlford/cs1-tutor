// Starter prompts above Learning Mode chat input (book content stays English).
export const LEARNING_CHAT_EXAMPLES = [
  {
    id: "floor-div",
    label: "What is the difference between / and //?",
    sendText: "In Lecture 2, what is the difference between / and //? Give a short example.",
  },
  {
    id: "celsius",
    label: "Convert 64 Celsius to Fahrenheit",
    sendText:
      "Write a single line of Python that converts 64 degrees Celsius to Fahrenheit and prints the number.",
  },
  {
    id: "string-len",
    label: "What does len do on a string?",
    sendText: "In Lecture 3, what does len return for a string? Give a short example that includes a space.",
  },
] as const;
