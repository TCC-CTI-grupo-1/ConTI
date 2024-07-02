import QuestionDetail from "./QuestionDetail"
import { useEffect, useMemo, useState } from "react"
import { generateQuestionsHashMap } from "../../../controllers/userController"
import { Button } from "@chakra-ui/react"
import ArrowIcon from "../../../assets/ArrowIcon"

interface Props{
    questionsList: number[],
    isSimulado?: boolean,
}



const Simulado = ({questionsList, isSimulado}:Props) => {
    //FUnção que retortna uma lista de nodes <p> com o numero da questão (1, 2, 3, ...)
    const [page, setPage] = useState(1);
    const getQuestionsNumbers = (questionsList: number[]) => {
        const questions = [];

        (1+(page-1)*10) > 1 ? questions.push(<ArrowIcon direction="top"
        onClick={()=>{setPage(page-1)}}/>) : null;

        for(let i = (1+(page-1)*10); i <= (10+(page-1)*10); i++){
            questionsList[i - 1] != null ? questions.push(<span onClick={() => {
                handleQuestionNumberClick(i);
            }}>
                <h3>{i}</h3>
                </span>
            ) : null;
        }
        questionsList.length > (9+(page-1)*10) ? questions.push(<ArrowIcon direction="bottom"
        onClick={()=>{
            setPage(page+1);
        }}/>) : null;
        return questions;
    }

   
    function handleQuestionNumberClick(questionNumber: number){
        setActiveQuestion(questionNumber - 1);
        const questions = document.querySelectorAll('#allQuestions span');
        questions.forEach((question) => {
            question.classList.remove('active');
            if(question.querySelector('h3')?.textContent == questionNumber.toString()){
                question.classList.add('active');
            }
        });
    }

    const questionsHashMap = useMemo(() => generateQuestionsHashMap(questionsList), [questionsList]);

    useEffect(() => {
        handleQuestionNumberClick(activeQuestion + 1);
    }, [page]);

    
    const [activeQuestion, setActiveQuestion] = useState(0);

    return (
        <div id="simulado">
            <div id="allQuestions">
                {
                    getQuestionsNumbers(questionsList)
                }
            </div>
            <div id="allQuestionsMargin"></div>
            <QuestionDetail question={questionsHashMap.get(questionsList[activeQuestion])}/>
            <div id="buttons">
                <Button onClick={() => {
                    if(activeQuestion > 0){
                        handleQuestionNumberClick(activeQuestion);
                    }
                }}>Anterior</Button>
                <Button onClick={() => {
                    if(activeQuestion < questionsList.length - 1){
                        handleQuestionNumberClick(activeQuestion + 2);
                    }
                }}>Próxima</Button>
            </div>
        </div>
    )
}

export default Simulado