import QuestionDetail from "./QuestionDetail";
import { useState, useRef } from "react";
import Button from "../../Button";
import ArrowIcon from "../../../assets/ArrowIcon";
import { questionInterface } from "../../../controllers/interfaces";
import { useNavigate } from "react-router-dom";
import Numbers from "./Numbers";
import { handleQuestionNumberClick } from "./Numbers";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
  
type questionResultsInterface = [questionInterface, (string | null)][];

interface Props {
    questionsHashMap: questionResultsInterface;
    pontuacao: boolean[];
}

//Tudo aqui dentro é baseado no número da questão, e não no ID.

const Simulado = ({ questionsHashMap, pontuacao }: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

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
                        isCorrecao={questionMap[1]}
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
            <Numbers questionsHashMap={questionsHashMap.map((q)=> {return q[0].id})} 
            setActiveQuestion={setActiveQuestion}
            respostasCorretas={pontuacao}
            onMenuIconClick={onOpen}
            />
            <div id="allQuestionsMargin"></div>
            <div className="content">
                <div className="infoTop">
                    <h3>Pontuação final: {pontuacao.filter((p) => p).length} / {questionsHashMap.length}</h3>
                    <Button colorScheme="blue" variant="solid" onClick={() => {
                        //Voltar para a tela anterior
                        navegate('/history');

                    }}>
                        Voltar ao historico
                    </Button>
                </div>
                {returnQuestionDetail()}
                <div id="buttons">
                    <Button
                        colorScheme="blue"
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

        <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
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
                questionsHashMap.map((question, index) => {
                    return <h3 key={question[0].id} className={
                        (question[1]?.toUpperCase() === question[0].alternativaCorreta.toUpperCase() ?
                        'correct' : 'wrong') + ' ' +
                        (activeQuestion == index ? 'active' : '')
                    }
                    onClick={() => {
                        handleQuestionNumberClick(index, setActiveQuestion);
                        onClose();
                    }}
                    >{index + 1}</h3>;
                })
            }
        </div>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
            Fechar
            </Button>
        </ModalFooter>
        </ModalContent>
        </Modal>
        </>
    );
};

export default Simulado;
