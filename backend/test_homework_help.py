import homework_help as hw


def test_prompt_forbids_code_and_uses_the_loaded_outline():
    prompt = hw.system_prompt("2 Python as a Calculator\n  2.1 Expressions and values")
    assert "Do not write Python code" in prompt
    assert "2.1 Expressions and values" in prompt
    assert "solution key" in prompt
    assert "Never mention FOCS" in prompt
    follow = hw.follow_prompt("2 Python as a Calculator")
    assert "Do not return JSON" in follow
    assert "2 Python as a Calculator" in follow


def test_strip_removes_fenced_python_and_keeps_the_plan():
    answer = (
        "Use a while loop from Lecture 9.\n"
        "```python\n"
        "def count(nums):\n"
        "    return len(nums)\n"
        "```\n"
        "Try it by hand on two numbers."
    )
    cleaned = hw.strip_solution_code(answer)
    assert "def count" not in cleaned
    assert "return len" not in cleaned
    assert "while loop" in cleaned
    assert "two numbers" in cleaned
    assert hw.WRITE_IT in cleaned


def test_strip_removes_a_bare_code_line_and_keeps_a_sentence():
    cleaned = hw.strip_solution_code(
        "If the condition is false, the loop stops.\n"
        "total = 0\n"
        "i += 1\n"
        "Check the last index yourself."
    )
    assert "total = 0" not in cleaned
    assert "i += 1" not in cleaned
    assert "the loop stops" in cleaned
    assert "last index" in cleaned
    focs = hw.strip_solution_code(
        "Use a list from Lecture 8. See FOCS chapter 5 on induction. Try two items by hand."
    )
    assert "FOCS" not in focs
    assert "Lecture 8" in focs
    assert "two items" in focs
    kept = hw.strip_solution_code(
        "Break the problem into the input and the output.\n"
        "Continue with the lecture on loops.\n"
        "nums.append(1)\n"
        "pass\n"
    )
    assert "Break the problem" in kept
    assert "Continue with the lecture" in kept
    assert "nums.append" not in kept
    assert "\npass" not in kept and not kept.endswith("pass")


def test_assignment_text_keeps_a_paste_and_rejects_a_non_pdf():
    assert hw.assignment_text("Count the items.", None) == "Count the items."
    try:
        hw.assignment_text("", "not-base64")
    except hw.HomeworkInputError as exc:
        assert "PDF" in str(exc)
    else:
        raise AssertionError("expected a bad file to be rejected")


def test_user_message_includes_the_assignment_and_the_follow_up():
    text = hw.user_message("Count the items.", "Which lecture?", "")
    assert "Count the items." in text
    assert "Which lecture?" in text
    history = hw.sanitize_history(
        [
            {"role": "assistant", "content": "```python\nprint(1)\n```"},
            {"role": "nope", "content": "skip"},
            {"role": "user", "content": "Where do I start?"},
        ]
    )
    assert history[0]["role"] == "assistant"
    assert "print(1)" not in history[0]["content"]
    assert history[-1]["content"] == "Where do I start?"
