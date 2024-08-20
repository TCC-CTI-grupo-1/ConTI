import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import DaySelector from './DaySelector'
import { useState } from 'react'
import date from 'date-and-time'
import { handleGetAnswersByQuestionsIds, handleGetAreaById, handleGetAreasByQuestionsIds, handleGetQuestion, handleGetQuestions_MockTestByMockTestId, handleGetSimpleMockTests, handleGetTopParentAreaById, handleGetTopParentAreasByIds } from '../../controllers/userController'
import { simuladoSimpleInterface } from '../../controllers/interfaces'
import { useNavigate } from 'react-router-dom'


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
    Spinner
  } from '@chakra-ui/react'
import { showAlert } from '../../App'

const History = () => {

    const {onOpen, onClose, isOpen} = useDisclosure();

    const [activeDay, setActiveDay] = useState<Date>(new Date());

    const [simuladosAndListas, setSimuladosAndListas] = useState<[simuladoSimpleInterface[], simuladoSimpleInterface[]] | null>(null); //[simulados, listas]

    const [activeQuestionOverlay, setActiveQuestionOverlay] = useState<number>(11); //[simulados, listas

    const [loading, setLoading] = useState(true);

    const navegate = useNavigate();

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
    async function getSimuladosAndListas(date: Date): Promise<[simuladoSimpleInterface[], simuladoSimpleInterface[]]>{
        //Pega os simulados e listas feitos no dia
        let day = new Date(date);

        let responseSimulados: simuladoSimpleInterface[] = await handleGetSimpleMockTests(day);
        let responseListas: simuladoSimpleInterface[] = await handleGetSimpleMockTests(day);
        for (let i = 0; i < responseSimulados.length; ++i) {
            const responseQuestoesSimulado = await handleGetQuestions_MockTestByMockTestId(responseSimulados[i].id);

            responseQuestoesSimulado.forEach((questao_simulado) => {
                let responseRespostas = handleGetAnswersByQuestionsIds([questao_simulado.question_id]);
                responseRespostas.then((respostas) => {
                    let correct = respostas.filter((resposta) => resposta.is_correct);
                    let subject = handleGetAreaById(questao_simulado.question_id);
                    subject.then((subject) => {
                        if (subject == null) {
                            return;
                        }
                        if (responseSimulados[i].subjects[subject.name] === undefined) {
                            responseSimulados[i].subjects[subject.name] = {//
                                totalQuestions: 0,
                                totalCorrect: 0
                            }
                        }
                        responseSimulados[i].subjects[subject.name].totalQuestions += 1;
                        responseSimulados[i].subjects[subject.name].totalCorrect += correct.length;
                    })
                })
            });
            responseSimulados[i].subjects = {};
        }
        return [responseSimulados, responseListas];
    }

    function openOverlay(questionClicked: number){
        //Abre o overlay com a questão clicada
        onOpen();
        setActiveQuestionOverlay(questionClicked);
    }

    function retrurnActiveQuestionId(): number{
        //Retorna o id da questão clicada
        let i = activeQuestionOverlay % 10 === 1 ? 0 : 1;
        let j = Math.floor(activeQuestionOverlay/10) - 1;
        return simuladosAndListas ? simuladosAndListas[i][j].id : 0;
    }

    function returnJSXOverlay(): JSX.Element{

        //Retorna o JSX do overlay
        let i = activeQuestionOverlay % 10 === 1 ? 0 : 1;
        let j = Math.floor(activeQuestionOverlay/10) - 1;
        if (simuladosAndListas)
        {
            return (
                <div id="historyOverlay">
                    <h2>Simulado #{simuladosAndListas[i][j].id}</h2>
                    <p>Tempo consumudo: {simuladosAndListas[i][j].time} minutos</p>
                    <p>Feito dia: {date.format(simuladosAndListas[i][j].date, 'DD/MM/YYYY')}</p>
                    <h3>{simuladosAndListas[i][j].totalCorrect}/{simuladosAndListas[i][j].totalQuestions}</h3>
                    <div className="progress">
                        <div style={{width: (simuladosAndListas[i][j].totalCorrect * 100 / simuladosAndListas[i][j].totalQuestions ) + '%'}}></div>
                    </div>
                    <div className="materias">
                        {
                            Object.keys(simuladosAndListas[i][j].subjects).map((subject, index) => {
                                return (
                                    <div key={index}>
                                        <p>{subject} [{simuladosAndListas[i][j].subjects[subject].totalCorrect}/{simuladosAndListas[i][j].subjects[subject].totalQuestions}]</p>
                                        <div className="progress">
                                            <div style={{width: (simuladosAndListas[i][j].subjects[subject].totalCorrect * 100 / simuladosAndListas[i][j].subjects[subject].totalQuestions ) + '%'}} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                    <h1>Ops! Ocorreu um erro.</h1>
                    <p>Favor recarregar a pagina.</p>
                </div>
            )
        }

    }

    function showDate(){
        let date = new Date(activeDay);
        console.log(date.toISOString());
    }

    return (
        <>
            <div id="history" className="flex-container full-screen-size">
                    <Navbar screen="history"/>
                    <div className="container">
                        <div className="header">
                            <h1 onClick={showDate}>Histórico</h1>
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
                                                    simuladosAndListas && simuladosAndListas[0].map((simulado, index) => {
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
                                                    simuladosAndListas && simuladosAndListas[1].map((lista, index) => {
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
                <ModalHeader>Informações detalhadas</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {returnJSXOverlay()}
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>Fechar</Button>
                    <Button colorScheme='blue' onClick={() => {
                        navegate(`/simulado/${retrurnActiveQuestionId()}`);
                    }}>
                    Ver prova
                    </Button>

                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
      )
    }
export default History