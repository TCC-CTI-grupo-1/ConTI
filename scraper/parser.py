import re
from bs4 import BeautifulSoup

class Question:
    def __init__(self, enunciation, associated_text=None):
        self.enunciation = enunciation
        self.associated_text = associated_text
        self.alternatives = {}

# The name of the file
filename = "caderno-de-questoes-2022.html"

# Open the file and read the HTML
with open(filename, 'r', encoding='utf-8') as file:
    html = file.read()

# Create BeautifulSoup object
soup = BeautifulSoup(html, 'html.parser')

# Initialize an empty dictionary to store the questions
questions = {}

# Find all the elements with the given CSS selector
text_selector = '.t.m0.ha'
question_number_selector = '.t.m0.hd'
question_elements = soup.select(question_number_selector)

associated_text = None
start_question = None
end_question = None

for i, question_element in enumerate(question_elements):
    # Get the question number from the text
    match = re.search(r'\d+', question_element.get_text())
    if match:
        question_number = match.group()

    # Initialize the enunciation as an empty string
    enunciation = ""

    # Initialize the current alternative as None
    current_alternative = None

    # Get the next sibling
    next_sibling = question_element.find_next_sibling()

    # Create a Question object for the current question number
    questions[question_number] = Question(enunciation)

    while next_sibling and (i+1 == len(question_elements) or next_sibling != question_elements[i+1]):
        # Check if the sibling matches the CSS selector
        if next_sibling in soup.select(text_selector):
            # Check if the sibling is an associated text
            associated_text_match = re.search(r'Leia o texto para responder às questões de números (\d+) a (\d+)', next_sibling.get_text())
            if associated_text_match:
                start_question = int(associated_text_match.group(1))
                end_question = int(associated_text_match.group(2))
                # Initialize the associated text as an empty string
                associated_text = ""

                # Get the next sibling
                next_sibling = next_sibling.find_next_sibling()

                # Keep adding the text of the next siblings to the associated text until the next question number is found
                while next_sibling and not re.search(r'\d+', next_sibling.get_text()):
                    associated_text += ' ' + next_sibling.get_text().strip()
                    next_sibling = next_sibling.find_next_sibling()

            # If the current question is within the range of the associated text, add the associated text to the question
            if associated_text and start_question <= int(question_number) <= end_question:
                questions[question_number].associated_text = associated_text

            # Get the alternative letter and text
            match = re.match(r'\s*\((\w)\)\s*(.*)', next_sibling.get_text())
            if match:
                current_alternative = match.group(1)
                alternative_text = match.group(2)

                # Store the alternative in the Question object
                questions[question_number].alternatives[current_alternative] = alternative_text
            elif current_alternative is not None:
                # If the current alternative is not None, append the text to the current alternative
                # Stop appending if the text ends with a full stop
                if not questions[question_number].alternatives[current_alternative].endswith('.'):
                    questions[question_number].alternatives[current_alternative] += ' ' + next_sibling.get_text().strip()
            else:
                # If the current alternative is None, append the text to the enunciation
                enunciation += ' ' + next_sibling.get_text().strip()

        # Get the next sibling
        next_sibling = next_sibling.find_next_sibling()

    # Store the enunciation in the Question object
    questions[question_number].enunciation = enunciation.strip()

# Print the questions
for question_number, question in questions.items():
    print(f"Question {question_number}: {question.enunciation}")
    print(f"Associated Text: {question.associated_text}")
    for alternative_letter, alternative_text in question.alternatives.items():
        print(f"  ({alternative_letter}) {alternative_text}")