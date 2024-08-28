import re
import os
from bs4 import BeautifulSoup
import json


ANOGLOBAL = 2022

class Question:
    question_ID = ""
    question_number = 0
    enunciation = ""
    associated_text = ""
    materia = ""
    macroconteudo = "MACRO_CONTENT"
    subconteudo = "SUB_CONTENT"
    banca = "VUNESP"
    prova = "CTI"
    ano = 0
    def __init__(self,enunciation, question_number, associated_text=None):
        self.question_number = int(question_number)
        self.enunciation = enunciation
        if (not self.associated_text and associated_text is not None):
            self.associated_text = associated_text
        if (1<=question_number<=15):
            self.materia = "Português"
        elif (16<=question_number<=30):
            self.materia = "Matemática"
        elif (31<=question_number<=45):
            self.materia = "Ciências da Natureza"
        elif (46<=question_number<=50):
            self.materia = "História"
        self.alternatives = {}
        self.ano = ANOGLOBAL
    
    def build_id(self):
        return f"{self.prova}-{self.ano} - {self.question_number}"
    def to_dict(self):
        return {
                'question_number': self.question_number,
                'enunciation': self.enunciation,
                'alternatives': self.alternatives,
                'associated_text': self.associated_text,
                'materia': self.materia,
                'macroconteudo': self.macroconteudo,
                'subconteudo': self.subconteudo,
                'ano': self.ano,
                'banca': self.banca,
                'prova': self.prova
        }


questions = {}
for CURRENTYEAR in range(2014, 2025):
    print(f"\n\n\n\n\n--------------------------------{CURRENTYEAR}--------------------------------\n\n\n\n\n")
    ANOGLOBAL = CURRENTYEAR
    CURRENT_PATH = os.path.dirname(os.path.abspath(__file__))
    filename = f"{CURRENT_PATH}\\HTML_questoes\\{ANOGLOBAL}.html"
    FILE_EXISTS = os.path.exists(filename)
    if not FILE_EXISTS:
        print(f"File {filename} not found.")
        continue
    with open(filename, 'r', encoding='utf-8') as file:
        html = file.read()

    soup = BeautifulSoup(html, 'html.parser')

    questions[ANOGLOBAL] = {}
    text_selector = ""
    question_number_selector = '.t.m0.hd'


    for c in range(ord('a'),ord('z')+1):
        testing_selector = f'.t.m0.h{chr(c)}'
        if(len(soup.select(testing_selector)) == 50):
            question_number_selector = testing_selector
            break
        
    for c in range(ord('a'),ord('z')+1):
        testing_selector = f'.t.m0.h{chr(c)}'
        if(len(soup.select(testing_selector)) >= 1):
            if (not text_selector==""):
                text_selector += ", "
            text_selector += testing_selector
    question_elements = soup.select(question_number_selector)

    current_associated_text = None
    start_bound = None
    end_bound = None

    # Check for associated text before any question
    for element in soup.select(text_selector):
        if re.search(r'Leia.*para responder.*', element.get_text()):
            spans = element.find_all('span')
            if len(spans) >= 2:
                start_bound = int(re.search(r'\d+',spans[0].get_text()).group(0))
                end_bound = int(re.search(r'\d+',spans[1].get_text()).group(0))
                associated_texts = []
                next_element = element.find_next_sibling()
                while next_element and not next_element in soup.select(question_number_selector):
                    if next_element in soup.select(text_selector) or True:
                        associated_texts.append(' '.join([t for t in next_element.stripped_strings]))
                    next_element = next_element.find_next_sibling()
                associated_text = ' '.join(associated_texts)
                for x in range(start_bound, end_bound + 1):
                    questions[ANOGLOBAL][x] = Question("",x, associated_text)
                    print(f"Assigned to question {x}: {questions[ANOGLOBAL][x].associated_text}")

    for i, question_element in enumerate(question_elements):
        match = re.search(r'\d+', question_element.get_text())
        if match:
            question_number = int(match.group())
            if ANOGLOBAL not in questions or question_number not in questions[ANOGLOBAL]:
                questions[ANOGLOBAL][question_number] = Question("",question_number=int(question_number))
            else:
                print(f"\n\n Question {question_number} already exists. Skipping...\n\n")

        enunciation = ""
        current_alternative = None
        next_sibling = question_element.find_next_sibling()

        while next_sibling and (i+1 == len(question_elements) or next_sibling != question_elements[i+1]):
            if next_sibling in soup.select(text_selector):
                match = re.match(r'\s*\((\w)\)\s*(.*)', next_sibling.get_text())
                if match:
                    current_alternative = match.group(1)
                    alternative_text = match.group(2)
                    questions[ANOGLOBAL][question_number].alternatives[current_alternative] = alternative_text
                elif current_alternative is not None:
                    if not questions[ANOGLOBAL][question_number].alternatives[current_alternative].endswith('.'):
                        questions[ANOGLOBAL][question_number].alternatives[current_alternative] += ' ' + next_sibling.get_text().strip()
                else:
                    enunciation += ' ' + next_sibling.get_text().strip()

            next_sibling = next_sibling.find_next_sibling()

        questions[ANOGLOBAL][question_number].enunciation = enunciation.strip()

        


# Write all questions to a JSON file
with open(f"questions.json", 'w', encoding='utf-8') as file:
    #iterate over all questions and write them to the file
    for year, year_questions in questions.items():
        for question_number, question in year_questions.items():
            file.write(f'"{question.build_id()}": ')
            json.dump(question.to_dict(), file, ensure_ascii=False, indent=4)
            file.write(",\n")
