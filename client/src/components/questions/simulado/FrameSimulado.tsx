import Simulado from "./Simulado"
import { useState, useEffect } from "react"
import { questionInterface, simuladoInterface } from "../../../controllers/interfaces"
import { handleGetQuestion, handlePostSimulado } from "../../../controllers/userController"
import date from 'date-and-time'
import { useNavigate } from "react-router-dom"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Button,
    Spinner
  } from '@chakra-ui/react'

type questionMapInterface = questionInterface[];
type questionMapResultInterface = [number, (string | null)][];  

interface Props{
    questionsList: number[],
}

const SimuladoFrame = ({questionsList}:Props) => {
    const {onOpen, onClose, isOpen} = useDisclosure();

    const [questionsHashMap, setQuestionsHashMap] = useState<questionMapInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [completeSimulado, setCompleteSimulado] = useState<simuladoInterface | null>(null);

    //A unica utilidade disso é impedir que o usuario clique no botão de finalizar simulado mais de uma vez enquanto ele está sendo corrigido
    const [isSimuladoAwaitActive, setIsSimuladoAwaitActive] = useState(false);

    const navegate = useNavigate();

    function handleGetRespostas(questionsResult: questionMapResultInterface) {
        let respostas: questionMapResultInterface = [];
        if(questionsHashMap === null) return;
        questionsResult.forEach((value, index) => {
            if(questionsHashMap.at(index) !== undefined) {
                respostas.push(value);
            }
            else{
                console.log('Error');
            }
        });

        handleFinishSimulado(respostas);
    }

    async function handleFinishSimulado(respostas: questionMapResultInterface){
        onOpen();
        setIsSimuladoAwaitActive(true);
        const simulado = await handlePostSimulado(respostas);
        setCompleteSimulado(simulado);
        console.log(respostas);
    }

    useEffect(() => {
        const getQuestions = async () => {
            const questionsHashMap: questionMapInterface = [];
            for(let i = 0; i < questionsList.length; i++){
                const question = await handleGetQuestion(questionsList[i]);
                if(question !== null) {
                    questionsHashMap.push(question);
                }
            }
            setQuestionsHashMap(questionsHashMap);
            setLoading(false);
        }
        getQuestions();
    }, [questionsList]);

    function returnJSXOverlay(): JSX.Element{

        if (completeSimulado === null) {
            return (
            <div id="historyOverlay">
                <div id="loading">
                    <h2>Tudo pronto!</h2>
                    <p>Aguarde enquanto corrigimos sua prova...</p>
                    <Spinner size="xl" />
                </div>
            </div>
            )
        }
        else{
            return (
            <div id="historyOverlay">
                    <h2>Simulado #{completeSimulado.id}</h2>
                    <p>Tempo consumudo: {completeSimulado.time_spent} minutos</p>
                    <p>Feito dia: {date.format(completeSimulado.creation_date, 'DD/MM/YYYY')}</p>
                    <h3>{completeSimulado.total_correct_answers}/{completeSimulado.total_answers}</h3>
                    <div className="progress">
                        <div style={{width: (completeSimulado.total_correct_answers * 100 / completeSimulado.total_answers ) + '%'}}></div>
                    </div>
                    <div className="materias">
                        {
                            Object.keys(completeSimulado.subjects).map((subject, index) => {
                                return (
                                    <div key={index}>
                                        <p>{subject} [{completeSimulado.subjects[subject].total_correct_answers}/{completeSimulado.subjects[subject].total_answers}]</p>
                                        <div className="progress">
                                            <div style={{width: (completeSimulado.subjects[subject].total_correct_answers * 100 / completeSimulado.subjects[subject].total_answers ) + '%'}} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
            )
        }

    }

  
    return (
        loading ? <h2>Aguarde enquanto finalizamos o seu simulado... </h2> :
        <>
            {questionsHashMap === null ? <h1>Erro ao carregar simulado</h1> :
                <Simulado questionsHashMap={questionsHashMap} handleFinishSimulado={handleGetRespostas} 
                isSimuladoFinished={isSimuladoAwaitActive}     
                /> 
            }
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
                closeOnEsc={false}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{completeSimulado === null ? 'Corrigindo...' : 'Informações detalhadas'}</ModalHeader>
                <ModalBody>
                    {returnJSXOverlay()}
                </ModalBody> 
                    <ModalFooter>
                        {completeSimulado !== null && <>
                            <Button variant='ghost' mr={3} onClick={() => {
                                navegate('/');
                            }}>Voltar ao home</Button>
                            <Button colorScheme='blue' onClick={onClose}>
                            Ver prova
                            </Button>
                            </>
                        }

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
        
  )
}

export default SimuladoFrame