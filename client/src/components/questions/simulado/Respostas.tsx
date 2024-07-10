import QuestionDetail from "./QuestionDetail";
import { useEffect, useMemo, useState, useRef } from "react";
import { Button } from "@chakra-ui/react";
import ArrowIcon from "../../../assets/ArrowIcon";
import { questionInterface } from "../../../controllers/interfaces";
import { useNavigate } from "react-router-dom";

  
interface Props {
    //Numero da questão, a questão e a resposta do usuário
    questionsHashMap: [number, questionInterface, string | null][];
}

//Tudo aqui dentro é baseado no número da questão, e não no ID.

const Simulado = ({ questionsHashMap }: Props) => {
    const [activeQuestion, setActiveQuestion] = useState(0);

    //Mapa que vai guardar as respostas do usuário (ou as respostas para vizualização)
    
    const getQuestionsNumbers = (questionsHashMap: [numero: number, questionInterface, string | null][]) => {
        const questions: JSX.Element[] = [];

        questionsHashMap.forEach((question) => {
            questions.push(
                <span
                    key={question[0]}
                    id={`question-${question[0]}`}
                    onClick={() => {
                        handleQuestionNumberClick(question[0]);
                    }}
                >
                    <h3>{question[0]}</h3>
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

    const returnQuestionDetail = () => {
        let cont = 1;
        const questionsDetail: JSX.Element[] = [];

        questionsHashMap.forEach((questionMap, index) => {
            cont++;
            questionsDetail.push(
                <div
                    key={cont}
                    style={{ display: activeQuestion === index ? "block" : "none" }}
                >
                    <QuestionDetail 
                        question={questionMap[1]} 
                    />
                </div>
            );
        });

        return questionsDetail;
    };

    const navegate = useNavigate();

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
                    <Button colorScheme="blue" size="lg" variant="solid" onClick={() => {
                        navegate('/');
                    }}>
                        Voltar ao home
                    </Button>
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
                            if (activeQuestion < questionsHashMap.length - 1) {
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
