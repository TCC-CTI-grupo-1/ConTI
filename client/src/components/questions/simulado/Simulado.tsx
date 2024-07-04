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
    const [page, setPage] = useState(1);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const n_questoes = 10;

    const getQuestionsNumbers = (questionsHashMap: Map<number, questionInterface>) => {
        const questions = [];

        (1 + (page - 1) * n_questoes) > 1
            ? questions.push(<ArrowIcon direction="top" onClick={() => { setPage(page - 1); }} />)
            : questions.push(<ArrowIcon direction="top" disabled />);

        for (let i = 1 + (page - 1) * n_questoes; i <= n_questoes + (page - 1) * n_questoes; i++) {
            questionsHashMap.get(i - 1) != null
                ? questions.push(
                    <span onClick={() => { handleQuestionNumberClick(i); }}>
                        <h3>{i}</h3>
                    </span>
                )
                : null;
        }

        questionsHashMap.size > 9 + (page - 1) * n_questoes
            ? questions.push(<ArrowIcon direction="bottom" onClick={() => { setPage(page + 1); }} />)
            : null;

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
        let cont = 0;
        const questionsDetail: JSX.Element[] = [];

        questionsHashMap.forEach((questionMap, index) => {
            cont++;
            questionsDetail.push(
                <div
                    key={cont}
                    style={{ display: activeQuestion === index ? "block" : "none" }}
                >
                    <QuestionDetail isSimulado question={questionMap} />
                </div>
            );
        });

        return questionsDetail;
    };

    useEffect(() => {
        handleQuestionNumberClick(activeQuestion + 1);
    }, [page]);

    return (
        <div id="simulado">
            <div id="allQuestions">
                <div>{getQuestionsNumbers(questionsHashMap)}</div>
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
