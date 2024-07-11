import QuestionDetail from "./QuestionDetail";
import { useState, useRef } from "react";
import { Button } from "@chakra-ui/react";
import ArrowIcon from "../../../assets/ArrowIcon";
import { questionInterface } from "../../../controllers/interfaces";
import { useNavigate } from "react-router-dom";
import Numbers from "./Numbers";
import { handleQuestionNumberClick } from "./Numbers";

  
type questionResultsInterface = [questionInterface, (string | null)][];

interface Props {
    questionsHashMap: questionResultsInterface;
}

//Tudo aqui dentro é baseado no número da questão, e não no ID.

const Simulado = ({ questionsHashMap }: Props) => {


    const [activeQuestion, setActiveQuestion] = useState(0);

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
                        question={questionMap[0]} 
                    />
                </div>
            );
        });

        return questionsDetail;
    };


    const navegate = useNavigate();

    return (
        <div id="simulado">
            <Numbers questionsHashMap={questionsHashMap.map((q)=> {return q[0]})} setActiveQuestion={setActiveQuestion} />
            <div id="allQuestionsMargin"></div>
            <div className="content">
                <div className="infoTop">
                    <h3>Tempo decorrido: 43:22 | 100:00</h3>
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
                                handleQuestionNumberClick(activeQuestion - 1, setActiveQuestion);
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
                                handleQuestionNumberClick(activeQuestion + 1, setActiveQuestion);
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
