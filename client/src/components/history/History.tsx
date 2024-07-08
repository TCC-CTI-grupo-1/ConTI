import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import DaySelector from './DaySelector'
import { useState } from 'react'
import date from 'date-and-time'
import { handleGetSimpleSimulados } from '../../controllers/userController'
import { simuladoSimpleInterface } from '../../controllers/interfaces'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'

const History = () => {

    const {onOpen, onClose, isOpen} = useDisclosure();

    const [activeDay, setActiveDay] = useState('01/01/2024');

    const [simuladosAndListas, setSimuladosAndListas] = useState<[simuladoSimpleInterface[], simuladoSimpleInterface[]]>([[], []]); //[simulados, listas]

    const [activeQuestionOverlay, setActiveQuestionOverlay] = useState<number>(11); //[simulados, listas

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        handleSimuladosAndListas();
    }, [activeDay])

    async function handleSimuladosAndListas()
    {
        let response = await getSimuladosAndListas(activeDay);
        setSimuladosAndListas(response);
        setLoading(false);
    }
    //[simulados, listas]
    async function getSimuladosAndListas(dayString: string): Promise<[simuladoSimpleInterface[], simuladoSimpleInterface[]]>{
        //Pega os simulados e listas feitos no dia
        let day = new Date(dayString);
        const responseSimulados = await handleGetSimpleSimulados(day);
        console.log(responseSimulados);
        const responseListas = await handleGetSimpleSimulados(day);
        console.log(responseListas);
        return [responseSimulados, responseListas];
    }

    function openOverlay(questionClicked: number){
        //Abre o overlay com a questão clicada
        onOpen();
        setActiveQuestionOverlay(questionClicked);
    }

    return (
        <>
            <div id="history" className="flex-container full-screen-size">
                    <Navbar screen="history"/>
                    <div className="container">
                        <div className="header">
                            <h1>Histórico</h1>
                        </div>
                        <div className="inversed-border"></div>
                        <div className="content">
                            <h3>Veja seus simulados anteriores e quais são os pontos com mais dificuldade.</h3>
                            <DaySelector handleChangeDay={setActiveDay} />
                            <div>
                                {
                                    loading ?
                                    <h1>Carregando...</h1>
                                    :
                                    <>
                                        <div id="simulados">
                                            <h2>Simulados</h2>
                                            <div>        
                                                {
                                                    simuladosAndListas[0].map((simulado, index) => {
                                                        return (
                                                            <div key={index} className="provaCard"
                                                            onClick={() => {
                                                                let number = (index + 1) * 10 + 1;
                                                                openOverlay(number);
                                                            }}>
                                                                <h3>[ {simulado.id} ] - {simulado.totalCorrect}/{simulado.totalQuestions}</h3>
                                                                <div className="progress">
                                                                    <div style={{width: `${(simulado.totalCorrect/simulado.totalQuestions)*100}%`}}></div>
                                                                </div>
                                                                <p>Tempo consumido: {simulado.time}min</p>
                                                                <div className="materias">
                                                                    {
                                                                        Object.keys(simulado.subjects).map((subject, index) => {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <p>{subject}</p>
                                                                                    <h4>{simulado.subjects[subject].totalCorrect}/{simulado.subjects[subject].totalQuestions}</h4>
                                                                                    <div className="progress">
                                                                                        <div style={{width: `${(simulado.subjects[subject].totalCorrect/simulado.subjects[subject].totalQuestions)*100}%`}}></div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                
                                            </div>
                                        </div>
                                        <div id="listas">
                                            <h2>Listas</h2>
                                            <div>
                                                {
                                                    simuladosAndListas[1].map((lista, index) => {
                                                        return (
                                                            <div key={index} className="provaCard"
                                                            onClick={() => {
                                                                let number = (index + 1) * 10 + 2;
                                                                openOverlay(number);
                                                            }}>
                                                                <h3>[ {lista.id} ] - {lista.totalCorrect}/{lista.totalQuestions}</h3>
                                                                <div className="progress">
                                                                    <div style={{width: `${(lista.totalCorrect/lista.totalQuestions)*100}%`}}></div>
                                                                </div>
                                                                <p>Tempo consumido: {lista.time}min</p>
                                                                <div className="materias">
                                                                    {
                                                                        Object.keys(lista.subjects).map((subject, index) => {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <p>{subject}</p>
                                                                                    <h4>{lista.subjects[subject].totalCorrect}/{lista.subjects[subject].totalQuestions}</h4>
                                                                                    <div className="progress">
                                                                                        <div style={{width: `${(lista.subjects[subject].totalCorrect/lista.subjects[subject].totalQuestions)*100}%`}}></div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
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
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {
                        <h1>{activeQuestionOverlay}</h1>
                    }
                    {
                        activeQuestionOverlay % 10 === 1 ?
                        <h2>Simulado: {simuladosAndListas[0][
                            (Math.floor(activeQuestionOverlay/10) - 1)
                        ].id}</h2>
                        :
                        <h2>Lista: {simuladosAndListas[1][
                            (Math.floor(activeQuestionOverlay/10) - 1)
                        ].id}</h2>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
      )
}
export default History