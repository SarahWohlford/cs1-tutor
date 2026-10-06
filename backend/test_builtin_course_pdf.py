"""The built-in CSCI 1100 course must not serve the old FOCS textbook PDF."""

import learning_resources as lr


def test_builtin_course_has_no_pdf():
    book = lr.resolve_textbook_for_request("focs", None)
    assert book.book_id == "focs"
    assert book.pdf_bytes is None
    assert book.pdf_page_offset == 0


def test_builtin_course_request_does_not_load_a_pdf(monkeypatch):
    def fail_if_called():
        raise AssertionError("FOCS.pdf should not be loaded for CSCI 1100")

    monkeypatch.setattr(lr, "load_focs_pdf", fail_if_called)
    with lr.request_book("focs", None):
        assert lr.get_effective_pdf_bytes() is None
