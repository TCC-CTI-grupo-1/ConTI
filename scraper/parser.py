import re
from bs4 import BeautifulSoup

class Question:
    def __init__(self):
        self.enunciado = ""
        self.alternativa = {}

# Initialize an empty dictionary to store the questions
questions = {}

# Initialize variables to store the current question and alternative
current_question = None
current_alternative = None
path = "CTI_prova-2024.pdf.html"
content = ""
with open(path,'r') as file:
    content = file.read()

# Parse the HTML
soup = BeautifulSoup(content, 'html.parser')

# Iterate over the elements with class .t.m0.x10 or .t.m0.x17
for element in soup.select('.t.m0.x10, .t.m0.x17'):
    # Get the text of the element
    text = element.get_text()

    # Check if the text contains 'Questão {number}'
    match = re.search(r'Questão\s*(\d+)', text)
    if match:
        question_number = match.group(1)
        if current_question is not None:
            questions[question_number] = current_question
        current_question = Question()
        current_alternative = None
        continue

    # Check for alternative
    match = re.search(r'\((\w)\)', text)
    if match:
        current_alternative = match.group(1)
        current_question.alternativa[current_alternative] = ""
        continue

    # Store text
    if current_alternative is not None:
        current_question.alternativa[current_alternative] += text
    else:
        current_question.enunciado += text

# Store the last question
if current_question is not None:
    questions[question_number] = current_question