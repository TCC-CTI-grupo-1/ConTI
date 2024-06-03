import PyPDF2

# Replace with your Gemini API key
api_key = "AIzaSyAAdzjF9ni3c3va9f6_s6oIYp-bgvl3iHE"

# Initialize Gemini model


def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        num_pages = len(reader.pages)
        for page_num in range(num_pages):
            page = reader.pages[page_num]
            text += page.extract_text()
    return text


def chunk_text(text, num_chunks):
    chunk_size = len(text) // num_chunks
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
    return chunks


def analyze_text(text, prompt):
    # Call Gemini API
    response = model.generate_text(
        prompt=prompt + text,
        temperature=0.7,
        max_tokens=150
    )
    return response.text.strip()


# Example usage:
pdf_path = "prova-2024.pdf"
pdf_text = extract_text_from_pdf(pdf_path)
chunks = chunk_text(pdf_text, 5)

# Define your custom prompt here
custom_prompt = """Hello, I am Manoel, the Manual. My task is to retrieve information in old exams from Colégio Técnico Industrial\n
I have a PDF with unstructured text. Your goal is to read the text and provide a summary of the content in a JSON format like this:\n
{
    "question_number": "The question's number",
    "enunciation": "The question's enunciation",
    "alternatives": {
        "A": "Alternative A",
        "B": "Alternative B",
        "C": "Alternative C",
        "D": "Alternative D",
        "E": "Alternative E"
    },
    "year": "2024",
    "banca": "VUNESP",
    "orgao": "CTI",
    "materia": "The question number",
    "conteudo": "YET-TO-BE-IMPLEMENTED",
    "texto_associado": "Associated text, if any"
}
"""

for i, chunk in enumerate(chunks):
    print(f"Chunk {i+1}:")
    print(analyze_text(chunk, custom_prompt))
    print("\n")