import pdfplumber
import os

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            text += f"Page {i}:\n{page.extract_text()}\n\n"
    return text.encode('utf-8',errors='replace').decode('utf-8')
# Extract text from PDF and write to a file
nomedopdf = "split-pdf-down-the-middle_prova-2024-2.pdf"
pdf_path = os.getcwd() + "\\scraper\\" + nomedopdf
pdf_text = extract_text_from_pdf(pdf_path)
with open('MARCOS.txt', 'w', encoding='utf-8') as f:
    f.write(pdf_text)