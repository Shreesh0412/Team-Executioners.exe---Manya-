import fitz
import os


TEXT_FOLDER = "uploads/extracted_text"

os.makedirs(TEXT_FOLDER, exist_ok=True)


def extract_text(document):

    pdf = fitz.open(document.file_path)

    full_text = ""

    for page in pdf:

        full_text += page.get_text()

        full_text += "\n"

    pdf.close()

    text_filename = f"{document.id}.txt"

    text_path = os.path.join(
        TEXT_FOLDER,
        text_filename,
    )

    with open(
        text_path,
        "w",
        encoding="utf-8",
    ) as file:

        file.write(full_text)

    return text_path

def load_text(document):

    with open(
        document.text_path,
        "r",
        encoding="utf-8",
    ) as file:

        return file.read()