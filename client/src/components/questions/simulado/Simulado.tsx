import QstDetailSimulado from "./QstDetailSimulado";
import { useState, useRef } from "react";
import { Button } from "@chakra-ui/react";
import ArrowIcon from "../../../assets/ArrowIcon";
import { questionInterface } from "../../../controllers/interfaces";
import { useNavigate } from "react-router-dom";
import Numbers from "./Numbers";
import { handleQuestionNumberClick } from "./Numbers";
import { respostaInterface } from "../../../controllers/interfaces";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
  
type questionMapInterface = {
    question: questionInterface;
    answers: respostaInterface[];
}[];

type questionMapResultInterface = [number, (number | null)][]; 

interface Props {
    questionsHashMap: questionMapInterface;
    handleFinishSimulado: (respostas: questionMapResultInterface) => void;
    isSimuladoFinished?: boolean;
    mockTestId: number;
}

//Tudo aqui dentro é baseado no número da questão, e não no ID.

const Simulado = ({ questionsHashMap, handleFinishSimulado, isSimuladoFinished=false }: Props) => {

    console.log("SIMULADO!!!");
    console.log(questionsHashMap);


    const [activeQuestion, setActiveQuestion] = useState(0);

    //Mapa que vai guardar as respostas do usuário (ou as respostas para vizualização)
    const [resultsHashMap, setResultsHashMap] = useState<questionMapResultInterface>([]);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement | null>(null);

    const nQuestoesRestantes = () => {
        let cont = 0;
        for(let i = 0; i < questionsHashMap.length; i++)
        {
            if(resultsHashMap[i] == undefined || resultsHashMap[i][1] == null)
            {
                cont++;
            }
        }
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
                    style={{ display: activeQuestion === index ? "flex" : "none" }}
                >
                    <QstDetailSimulado 
                        question={questionMap.question}
                        answers={questionMap.answers} 
                        isAnswersSelected={(value: string | null) => {
                            const newResultsHashMap = resultsHashMap;
                            newResultsHashMap[index] = [questionMap.question.id, Number(value)];
                            if(value != null)
                            {
                                markQuestionAsSelected(index, true);
                            }
                            else{
                                markQuestionAsSelected(index, false);
                            }

                            setResultsHashMap(newResultsHashMap);
                        }}
                        qNumber={cont}
                    />
                </div>
            );
        });

        return questionsDetail;
    };



    const navegate = useNavigate();

    return (
        <>
        <div id="simulado">
            <Numbers questionsHashMap={questionsHashMap.map((q) => {return q.question.id})} setActiveQuestion={setActiveQuestion} 
            onMenuIconClick={onOpen2}
            />
            <div id="allQuestionsMargin"></div>
            <div className="content">
                <div className="infoTop">
                    <h3>43:22</h3>
                    {isSimuladoFinished &&
                    <Button colorScheme="blue" size="lg" variant="solid" onClick={() => {
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

                    
        <Modal
        isCentered
        onClose={onClose2}
        isOpen={isOpen2}
        motionPreset='slideInBottom'
        >
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Todas as questões</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <p>Clique em uma questão para ir até ela</p>    
        <div className="allQuestionsModal">
            
            {
                questionsHashMap.map((_, index) => {
                    return (<h3 key={index} className={`questionNumber ${resultsHashMap[index] == undefined || resultsHashMap[index][1] == null ? 'notAnswered' : ''} 
                    ${activeQuestion === index ? 'active' : ''}`}
                    
                    onClick={() => {
                        onClose2();
                        handleQuestionNumberClick(index, setActiveQuestion);
                        
                    }}
                    >{index + 1}</h3>
                    );
                })
            }
        </div>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme={nQuestoesRestantes() > 0 ? 'black' : 'blue'} size="lg" variant="outline"
            onClick={()=>{
                    onClose2();
                    onOpen();
                }}>
                    Finalizar Simulado
            </Button>

        </ModalFooter>
        </ModalContent>
        </Modal>        

        </>

    );
};

export default Simulado;
