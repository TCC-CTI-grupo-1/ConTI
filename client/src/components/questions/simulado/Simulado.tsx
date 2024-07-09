import QuestionDetail from "./QuestionDetail";
import { useEffect, useMemo, useState, useRef } from "react";
import { Button } from "@chakra-ui/react";
import ArrowIcon from "../../../assets/ArrowIcon";
import { questionInterface } from "../../../controllers/interfaces";
import { useNavigate } from "react-router-dom";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
  
interface Props {
    questionsHashMap: Map<number, questionInterface>;
    handleFinishSimulado: (respostas: Map<number, string | null>) => void;
    isSimuladoFinished?: boolean;
}

const Simulado = ({ questionsHashMap, handleFinishSimulado, isSimuladoFinished=false }: Props) => {
    const [activeQuestion, setActiveQuestion] = useState(0);

    const [resultsHashMap, setResultsHashMap] = useState<Map<number, string | null>>(new Map());
    //Mapa que vai guardar as respostas do usuário

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


    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<HTMLButtonElement | null>(null);

    const nQuestoesRestantes = () => {
        let cont = 0;
        resultsHashMap.forEach((value, index) => {
            if(value == null)
            {
                cont++;
            }
        });
        return cont;
    }

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
                        isAwnserSelected={(value: string | null) => {
                            setResultsHashMap(new Map(resultsHashMap.set(index + 1, value)));
                            if(value != null)
                            {
                                markQuestionAsSelected(index + 1, true);
                            }
                            else{
                                markQuestionAsSelected(index + 1, false);
                            }
                        }}
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
                    <h3>Tempo decorrido: 43:22 | 100:00</h3>
                    {!isSimuladoFinished ? <Button colorScheme="black" size="lg" variant="outline"
                    onClick={()=>{
                        onOpen();
                    }}>
                        Finalizar Simulado
                    </Button>
                    : <Button colorScheme="blue" size="lg" variant="solid" onClick={() => {
                        navegate('/');
                    }}>
                        Voltar ao home
                    </Button>
                    }
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
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                    <AlertDialogHeader>Finalizar simulado?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                       {nQuestoesRestantes() > 0 ? <>Ainda restam { nQuestoesRestantes() } questões sem resposta. Deseja mesmo finalizar o simulado?</> :
                          <>Deseja finalizar o simulado?</>}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                        Não
                        </Button>
                        <Button colorScheme={nQuestoesRestantes() > 0 ? 'red' : 'green'} ml={3}
                        onClick={()=>{
                            onClose();
                            if(!isSimuladoFinished)
                            {
                                handleFinishSimulado(resultsHashMap);
                            }   
                        }}    
                        >
                        Sim
                        </Button>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
        </div>


        

    );
};

export default Simulado;
