import QuestionDetail from "./QuestionDetail";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@chakra-ui/react";
import ArrowIcon from "../../../assets/ArrowIcon";
import { questionInterface } from "../../../controllers/interfaces";

interface Props {
    questionsHashMap: Map<number, questionInterface>;
    isSimulado?: boolean;
}

const Simulado = ({ questionsHashMap, isSimulado }: Props) => {
    const [activeQuestion, setActiveQuestion] = useState(0);

    const getQuestionsNumbers = (questionsHashMap: Map<number, questionInterface>) => {
        const questions: JSX.Element[] = [];

        questionsHashMap.forEach((question, index) => {
            questions.push(
                <span
                    key={index}
                    id={`question-${index + 1}`}
                    onClick={() => {
                        handleQuestionNumberClick(index + 1);
                    }}
                >
                    <h3>{index + 1}</h3>
                </span>
            );
        });

        return questions;
    };

    function handleQuestionNumberClick(questionNumber: number) {
        setActiveQuestion(questionNumber - 1);
        const questions = document.querySelectorAll("#allQuestions span");
        questions.forEach((question) => {
            question.classList.remove("active");
            if (question.querySelector("h3")?.textContent == questionNumber.toString()) {
                question.classList.add("active");
            }
        });
    }

    function markQuestionAsSelected(questionNumber: number, selected: boolean) {
        const questionSpan = document.getElementById(`question-${questionNumber}`);
        if (questionSpan) {
            if (selected) {
                questionSpan.classList.add("selected");
            } else {
                questionSpan.classList.remove("selected");
            }
        }
    }

    const returnQuestionDetail = () => {
        let cont = 0;
        const questionsDetail: JSX.Element[] = [];

        questionsHashMap.forEach((questionMap, index) => {
            cont++;
            questionsDetail.push(
                <div
                    key={cont}
                    style={{ display: activeQuestion === index ? "block" : "none" }}
                >
                    <QuestionDetail 
                        isSimulado 
                        question={questionMap} 
                        isAwnserSelected={(value: boolean) => {
                            markQuestionAsSelected(index + 1, value);
                        }}
                    />
                </div>
            );
        });

        return questionsDetail;
    };

    return (
        <div id="simulado">
            <div id="allQuestions">
                <ArrowIcon direction="top" />

                <div>{getQuestionsNumbers(questionsHashMap)}</div>

                <ArrowIcon direction="bottom" />
            </div>
            <div id="allQuestionsMargin"></div>
            <div className="content">
                <div className="infoTop">
                    <h3>Tempo decorrido: 43:22 | 100:00</h3>
                </div>
                {returnQuestionDetail()}
                <div id="buttons">
                    <Button
                        colorScheme="blue"
                        size="lg"
                        variant="outline"
                        onClick={() => {
                            if (activeQuestion > 0) {
                                handleQuestionNumberClick(activeQuestion);
                            }
                        }}
                    >
                        <ArrowIcon direction="left" colorScheme="primary" />
                        &nbsp;Anterior
                    </Button>
                    <Button
                        colorScheme="blue"
                        size="lg"
                        variant="outline"
                        onClick={() => {
                            if (activeQuestion < questionsHashMap.size - 1) {
                                handleQuestionNumberClick(activeQuestion + 2);
                            }
                        }}
                    >
                        Próxima&nbsp;
                        <ArrowIcon direction="right" colorScheme="primary" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Simulado;
