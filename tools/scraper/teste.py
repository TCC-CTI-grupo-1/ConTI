from bs4 import BeautifulSoup
import re


class Question:
    def __init__(self, enunciation):
        self.enunciation = enunciation
        self.alternatives = {}

html = """
<div class='hey this is not a question!!!'>asdasdsad</div>
<div class='hey this is not a question!!!'>asdasdsad</div>
<div class='hey this is not a question!!!'>asdasdsad</div>
<div class='hey this is not a question!!!'>asdasdsad</div>

<div class='question-number'>Question 1</div>
<div class ='text'>Bom dia tudo bem com você?</div>
<div class='text'> É um dia lindo hoje! </div>
<div class='text'> (A) Alternative</div>
<div class='text'> (B) Alternative</div>
<div class='text'> (C) Alternative</div>
<div class='text'> (D) Alternative</div>
<div class='text'> (E) Alternative</div>
<div class='hey this is not a question!!!'>asdasdsad</div>
<div class='hey this is not a question!!!'>asdasdsad</div>
<div class='hey this is not a question!!!'>asdasdsad</div>
<div class='hey this is not a question!!!'>asdasdsad</div>
<div class='hey this is not a question!!!'>asdasdsad</div>
<div class='hey this is not a question!!!'>asdasdsad</div>
<div class='hey this is not a question!!!'>asdasdsad</div>

<div class='question-number'>Question 2</div>
<div class ='text'>Enunciado 2</div>
<div class='text'> (A) Alternative</div>
<div class='text'> (B) Alternative</div>
<div class='text'> (C) Alternative</div>
<div class='text'> (D) Alternative</div>
<div class='text'> (E) Alternative</div>

<div class='question-number'>Question 3</div>
<div class ='text'>Enunciado 2</div>
<div class='text'> (A) Alternative</div>
<div class='text'> Hey, look, that's more text from alternative A in a different div! </div>
<div class='text'> (B) Alternative</div>
<div class='text'> (C) Alternative</div>
<div class='text'> (D) Alternative</div>
<div class='text'> (E) Alternative</div>
"""

filename = 'MARCOS.txt'
with open(filename,'r') as file:
    html = file.read()  


# Create BeautifulSoup object
soup = BeautifulSoup(html, 'html.parser')

# Initialize an empty dictionary to store the questions
questions = {}

# Find all the elements with the given CSS selector
question_elements = soup.select('.question-number')

for i, question_element in enumerate(question_elements):
    # Get the question number from the text
    question_number = question_element.get_text().split(' ')[1]

    # Initialize the enunciation as an empty string
    enunciation = ""

    # Initialize the current alternative as None
    current_alternative = None

    # Get the next sibling
    next_sibling = question_element.find_next_sibling()

    while next_sibling and (i+1 == len(question_elements) or next_sibling != question_elements[i+1]):
        # Check if the sibling matches the CSS selector
        if next_sibling in soup.select('.text'):
            # Get the alternative letter and text
            match = re.match(r'\s*\((\w)\)\s*(.*)', next_sibling.get_text())
            if match:
                current_alternative = match.group(1)
                alternative_text = match.group(2)

                # Store the alternative in the Question object
                if question_number not in questions:
                    questions[question_number] = Question(enunciation)
                questions[question_number].alternatives[current_alternative] = alternative_text
            elif current_alternative is not None:
                # If the current alternative is not None, append the text to the current alternative
                questions[question_number].alternatives[current_alternative] += ' ' + next_sibling.get_text().strip()
            else:
                # If the current alternative is None, append the text to the enunciation
                enunciation += ' ' + next_sibling.get_text().strip()

        # Get the next sibling
        next_sibling = next_sibling.find_next_sibling()

# Print the questions
for question_number, question in questions.items():
    print(f"Question {question_number}: {question.enunciation}")
    for alternative_letter, alternative_text in question.alternatives.items():
        print(f"  ({alternative_letter}) {alternative_text}")