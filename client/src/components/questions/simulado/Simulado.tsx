import QuestionDetail from "./QuestionDetail";
import { useState, useRef } from "react";
import { Button } from "@chakra-ui/react";
import ArrowIcon from "../../../assets/ArrowIcon";
import { questionInterface } from "../../../controllers/interfaces";
import { useNavigate } from "react-router-dom";
import Numbers from "./Numbers";
import { handleQuestionNumberClick } from "./Numbers";

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
  
type questionMapInterface = questionInterface[];
type questionMapResultInterface = [number, (string | null)][]; 

interface Props {
    questionsHashMap: questionMapInterface;
    handleFinishSimulado: (respostas: questionMapResultInterface) => void;
    isSimuladoFinished?: boolean;
}

//Tudo aqui dentro é baseado no número da questão, e não no ID.

const Simulado = ({ questionsHashMap, handleFinishSimulado, isSimuladoFinished=false }: Props) => {

    console.log("SIMULADO!!!");
    console.log(questionsHashMap);


    const [activeQuestion, setActiveQuestion] = useState(0);

    //Mapa que vai guardar as respostas do usuário (ou as respostas para vizualização)
    const [resultsHashMap, setResultsHashMap] = useState<questionMapResultInterface>([]);

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
                            const newResultsHashMap = resultsHashMap;
                            newResultsHashMap[index] = [questionMap.id, value];
                            if(value != null)
                            {
                                markQuestionAsSelected(index, true);
                            }
                            else{
                                markQuestionAsSelected(index, false);
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
            <Numbers questionsHashMap={questionsHashMap.map((q) => {return q.id})} setActiveQuestion={setActiveQuestion} />
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
