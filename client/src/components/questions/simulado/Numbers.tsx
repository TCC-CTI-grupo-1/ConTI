import { useEffect } from 'react'
import MenuIcon from '../../../assets/MenuIcon'

interface Props{
    questionsHashMap: number[];
    setActiveQuestion: (questionNumber: number) => void;
    defaultQuestion?: number;
    respostasCorretas?: boolean[] | null;
    onMenuIconClick: () => void;
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

const Numbers = ({questionsHashMap, setActiveQuestion, defaultQuestion = 0, 
    respostasCorretas = null, onMenuIconClick}: Props) => {

    const getQuestionsNumbers = (questionsHashMap: number[]) => {
        const questions: JSX.Element[] = [];

        questionsHashMap.forEach((question, index) => {
            questions.push(
                <span
                    key={question}
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

            <MenuIcon onClick={onMenuIconClick}/>

            <div>{getQuestionsNumbers(questionsHashMap)}</div>

        </div>
    )
}

export default Numbers