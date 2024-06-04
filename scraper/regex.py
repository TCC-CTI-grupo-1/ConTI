import re
from bs4 import BeautifulSoup

class Question:
    enunciation = ""
    associated_text = None
    def __init__(self, enunciation, associated_text=None):
        self.enunciation = enunciation
        if (self.associated_text is None):
            self.associated_text = associated_text
        self.alternatives = {}

filename = "caderno-de-questoes-2022.html"

with open(filename, 'r', encoding='utf-8') as file:
    html = file.read()

soup = BeautifulSoup(html, 'html.parser')

questions = {}

text_selector = '.t.m0.ha, .t.m0.he'
question_number_selector = '.t.m0.hd'
question_elements = soup.select(question_number_selector)

current_associated_text = None
start_bound = None
end_bound = None

# Check for associated text before any question
for element in soup.select(text_selector):
    if re.search(r'Leia.*para responder.*', element.get_text()):
        spans = element.find_all('span')
        if len(spans) >= 2:
            start_bound = int(spans[0].get_text())
            end_bound = int(spans[1].get_text())
            current_associated_text = ' '.join([t for t in element.stripped_strings])
            for x in range (start_bound, end_bound + 1):
                questions[x] = Question("", current_associated_text)
                print(f"Assigned to question {x}: {questions[x].associated_text}")

for i, question_element in enumerate(question_elements):
    match = re.search(r'\d+', question_element.get_text())
    if match:
        question_number = int(match.group())
        if question_number not in questions:
            questions[question_number] = Question("")

    enunciation = ""
    current_alternative = None
    next_sibling = question_element.find_next_sibling()

    while next_sibling and (i+1 == len(question_elements) or next_sibling != question_elements[i+1]):
        if next_sibling in soup.select(text_selector):
            match = re.match(r'\s*\((\w)\)\s*(.*)', next_sibling.get_text())
            if match:
                current_alternative = match.group(1)
                alternative_text = match.group(2)
                questions[question_number].alternatives[current_alternative] = alternative_text
            elif current_alternative is not None:
                if not questions[question_number].alternatives[current_alternative].endswith('.'):
                    questions[question_number].alternatives[current_alternative] += ' ' + next_sibling.get_text().strip()
            else:
                enunciation += ' ' + next_sibling.get_text().strip()

        next_sibling = next_sibling.find_next_sibling()

    questions[question_number].enunciation = enunciation.strip()

for question_number, question in questions.items():
    if question.associated_text:
        print(f"Question {question_number}: {question.enunciation}")
        print(f"Associated text: {question.associated_text}")