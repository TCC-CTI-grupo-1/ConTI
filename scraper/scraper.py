import requests
import soupsieve as sv
from bs4 import BeautifulSoup as bs 
import json
import string
import random
import os

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

class Question:
    def __init__(self, enunciado, alternativas, ano, banca, orgao, prova, materia, conteudo, texto_associado = ""):
        self.enunciado = enunciado
        self.alternativas = alternativas
        self.ano = ano
        self.banca = banca
        self.orgao = orgao
        self.prova = prova
        self.materia = materia
        self.conteudo = conteudo
        self.texto_associado = texto_associado
    def to_dict(self):
        return {
        'enunciado': self.enunciado,
        'alternativas': {letras[i]: self.alternativas[i] for i in range(len(self.alternativas))},
        'ano': self.ano,
        'banca': self.banca,
        'orgao': self.orgao,
        'prova': self.prova,
        'materia': self.materia,
        'conteudo': self.conteudo,
        'texto_associado': self.texto_associado,
        }

questions = []
for i in range (1,69):
        
    payload = { 'api_key': 'd1a75152a94a33caa28176a051d0eae8', 'url': f'https://www.qconcursos.com/questoes-de-concursos/questoes?administrative_level_ids%5B%5D=16&discipline_ids%5B%5D=1&discipline_ids%5B%5D=13&discipline_ids%5B%5D=73&discipline_ids%5B%5D=198&discipline_ids%5B%5D=208&discipline_ids%5B%5D=244&discipline_ids%5B%5D=550&discipline_ids%5B%5D=567&examining_board_ids%5B%5D=152&page={i}&scholarity_ids%5B%5D=2' }
    r = requests.get('https://api.scraperapi.com/', params=payload)
    content = r.text
    soup = bs(content, 'html5lib')

    # Select all parent elements
    parents = soup.select('.js-question-item.q-question-item')


    for parent in parents:
        enunciado = parent.select_one('.q-question-enunciation').get_text()
        letras = [l.get_text() for l in parent.select('.q-option-item')]
        alternativas = [a.get_text() for a in parent.select('.q-item-enum.js-alternative-content')]
        ano = parent.select_one('.q-question-info > span:not(strong)').get_text()
        banca = parent.select_one('.q-question-info span:nth-child(2) a').get_text()
        orgao = parent.select_one('.q-question-info span:nth-child(3) a').get_text()
        prova = parent.select_one('.q-question-info span:nth-child(4) a').get_text()
        materia = parent.select_one('.q-question-breadcrumb>a').get_text()
        conteudo = parent.select_one('.q-question-breadcrumb:not(.q-question-breadcrumb>a)').get_text()
        
        # Select the associated text within the parent. If there's no associated text, it will return None
        texto_associado_element = parent.select_one('.q-question-text--print-hide.collapse p')
        texto_associado = texto_associado_element.get_text() if texto_associado_element else ""
        
        # Group the alternatives into groups of 5    
        question = Question(enunciado, alternativas, ano, banca, orgao, prova, materia, conteudo, texto_associado)
        questions.append(question)

    # Print out the content in an organized manner


    # Convert the list of Question objects to a list of dictionaries
    questions_dict = [question.to_dict() for question in questions]

    # Open the file in write mode
filename = 'scraper/json/questionInformation_code_' + id_generator(6) + '.json'
print(filename)
with open(filename, 'w', encoding='utf-8') as f:
    json.dump(questions_dict, f, ensure_ascii=False, indent=4)

# Enunciado -> .q-question-enunciation
# Letra -> .q-option-item
# Alternativa -> .q-item-enum js-alternative-content (role = "text")
# Ano -> .q-question-info > span:not(span strong)
# Banca -> .q-question info span:nth_child(2) a 
# Órgão -> .q-question info span:nth_child(3) a
# Prova -> .q-question info span:nth_child(4) a
# Matéria -> .q-question-breadcrumb>a 
# Conteúdo -> .q-question-breadcrumb:not(q-question-beadcrumb>a)
# Texto associado -> .q-question-text--print-hide collapse p