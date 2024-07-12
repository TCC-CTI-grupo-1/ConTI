import React, { useEffect, useState } from 'react'
import ArrowIcon from '../../../assets/ArrowIcon'
import { questionInterface } from '../../../controllers/interfaces'

type questionMapInterface = number[];


interface Props{
    questionsHashMap: questionMapInterface;
    setActiveQuestion: (questionNumber: number) => void;
    defaultQuestion?: number;
    respostasCorretas?: boolean[] | null;
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

const Numbers = ({questionsHashMap, setActiveQuestion, defaultQuestion = 0, respostasCorretas = null}: Props) => {

    const getQuestionsNumbers = (questionsHashMap: questionMapInterface) => {
        const questions: JSX.Element[] = [];

        questionsHashMap.forEach((question, index) => {
            questions.push(
                <span
                    key={index}
                    id={`question-${index}`}
                    className={`${respostasCorretas ? respostasCorretas[index] ? "correct" : "incorrect" : ""}`}
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


    useEffect(() => {
        handleQuestionNumberClick(defaultQuestion, setActiveQuestion);
    }, []);

    return (
        <div id="allQuestions">
            <ArrowIcon direction="top" />

            <div>{getQuestionsNumbers(questionsHashMap)}</div>

            <ArrowIcon direction="bottom" />
        </div>
    )
}

export default Numbers