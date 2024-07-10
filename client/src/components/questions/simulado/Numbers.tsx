import React from 'react'
import ArrowIcon from '../../../assets/ArrowIcon'
import { questionInterface } from '../../../controllers/interfaces'

type questionMapInterface = questionInterface[];
type questionMapResultInterface = (string | null)[]; 


interface Props{
    questionsHashMap: questionMapInterface;
    setActiveQuestion: (questionNumber: number) => void;
}

export function handleQuestionNumberClick(questionNumber: number, setActiveQuestion: (questionNumber: number) => void) {
    setActiveQuestion(questionNumber);
    const questions = document.querySelectorAll("#allQuestions span");
    questions.forEach((question) => {
        question.classList.remove("active");
        if (question.querySelector("h3")?.textContent == (questionNumber+1).toString()) {
            question.classList.add("active");
        }
    });
}

const Numbers = ({questionsHashMap, setActiveQuestion}: Props) => {

    const getQuestionsNumbers = (questionsHashMap: questionMapInterface) => {
        const questions: JSX.Element[] = [];

        questionsHashMap.forEach((question, index) => {
            questions.push(
                <span
                    key={index}
                    id={`question-${index}`}
                    onClick={() => {
                        handleQuestionNumberClick(index, setActiveQuestion);
                    }}
                >
                    <h3>{index+1}</h3>
                </span>
            );
        });

        return questions;
    };


    

    return (
        <div id="allQuestions">
            <ArrowIcon direction="top" />

            <div>{getQuestionsNumbers(questionsHashMap)}</div>

            <ArrowIcon direction="bottom" />
        </div>
    )
}

export default Numbers