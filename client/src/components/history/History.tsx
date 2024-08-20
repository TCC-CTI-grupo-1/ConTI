import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import DaySelector from './DaySelector'
import { useState } from 'react'
import date from 'date-and-time'
import { handleGetAnswersByQuestionId, handleGetAnswersByQuestionsIds, handleGetAreaById, handleGetAreaIdByQuestionId, handleGetAreasByQuestionsIds, handleGetQuestion, handleGetQuestion_MockTestsByMockTestId, 
    handleGetMockTests, handleGetTopParentAreaById, handleGetTopParentAreasByIds } from '../../controllers/userController'
import { simuladoInterface } from '../../controllers/interfaces'
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [activeDay, setActiveDay] = useState<Date>(today);

    const [simuladosAndListas, setSimuladosAndListas] = useState<[simuladoInterface[] | null, simuladoInterface[] | null]>([null, null]); //[simulados, listas]

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

        if(response[0] === null && response[1] === null){
            showAlert("Nenhum simulado ou lista encontrado, você provavelmente não está logado", "error");
            return;
        }

        setSimuladosAndListas(response);

    }

    useEffect(() => {
        if(simuladosAndListas[0] !== null && simuladosAndListas[1] !== null)
        {
            console.log("SIMULADOS AND LISTAS");
            console.log(simuladosAndListas);
            setLoading(false);
        }
    }, [simuladosAndListas])

    //[simulados, listas]
    async function getSimuladosAndListas(date: Date): Promise<[simuladoInterface[] | null, simuladoInterface[] | null]>{
        //Pega os simulados e listas feitos no dia
        let day = new Date(date);

        let responseSimulados: simuladoInterface[] | null= await handleGetMockTests(day);
        if(responseSimulados.length === 0){
            responseSimulados = null;
        }
        else{
            responseSimulados.forEach(async (simulado) => {
                let questions = await handleGetQuestion_MockTestsByMockTestId(simulado.id);
                let subjects: {[key: string]: {totalCorrect: number, totalQuestions: number}} = {};
                let totalCorrect = 0;
                let totalQuestions = 0;
                questions.forEach(async (question) => {
                    let questionInfo = await handleGetQuestion(question.question_id);

                    if(questionInfo === null){
                        return;
                    }
                    let subject = await handleGetAreaById(questionInfo.area_id);
                    let subjectName = subject ? subject.name : null;
                    if(subjectName !== null){
                        subjects[subjectName] = { totalCorrect: 0, totalQuestions: 0 };
                    }
                    totalQuestions += 1;
                    if(correctAnswerText === correctAnswer.text){
                        totalCorrect += 1;
                    }
                });
                simulado.subjects = subjects;
                simulado.total_correct_answers = totalCorrect;
                simulado.total_answers = totalQuestions;
            });
        }
        let responseListas: simuladoInterface[] | null = await handleGetMockTests(day);
        if(responseListas.length === 0){
            responseListas = null;
        }

        console.log (responseSimulados);
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
        return simuladosAndListas[i] ? (simuladosAndListas[i][j] !== undefined ? simuladosAndListas[i][j].id : 0) : 0;
    }

    function returnJSXOverlay(): JSX.Element{

        //Retorna o JSX do overlay
        let i = activeQuestionOverlay % 10 === 1 ? 0 : 1;
        let j = Math.floor(activeQuestionOverlay/10) - 1;
        if (simuladosAndListas[i] && simuladosAndListas[i][j] !== undefined)
        {
            return (
                <div id="historyOverlay">
                    <h2>Simulado #{simuladosAndListas[i][j].id}</h2>
                    <p>Tempo consumudo: {simuladosAndListas[i][j].time_spent} minutos</p>

                    <h3>{simuladosAndListas[i][j].total_correct_answers}/{simuladosAndListas[i][j].total_answers}</h3>
                    <div className="progress">
                        <div style={{width: (simuladosAndListas[i][j].total_correct_answers * 100 / simuladosAndListas[i][j].total_correct_answers ) + '%'}}></div>
                    </div>
                    <div className="materias">
                        {
                            (simuladosAndListas[i][j].subjects) &&
                            Object.keys(simuladosAndListas[i][j].subjects).map((subject, index) => {
                                
                                return simuladosAndListas[i] && simuladosAndListas[i][j] ?(
                                    <div key={index}>
                                        <p>{subject} [{simuladosAndListas[i][j].subjects![subject].totalCorrect}/{simuladosAndListas[i][j].subjects![subject].totalQuestions}]</p>
                                        <div className="progress">
                                            <div style={{width: (simuladosAndListas[i][j].subjects![subject].totalCorrect * 100 / simuladosAndListas[i][j].subjects![subject].totalQuestions ) + '%'}} />
                                        </div>
                                    </div>
                                ) : (<></>)
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
                                                    simuladosAndListas[0] && simuladosAndListas[0].map((simulado, index) => {
                                                        return (
                                                            <div key={index} className="provaCard"
                                                            onClick={() => {
                                                                let number = (index + 1) * 10 + 1;
                                                                openOverlay(number);
                                                            }}>
                                                                <h3>[ {simulado.id} ] - {simulado.total_correct_answers}/{simulado.total_answers}</h3>
                                                                <div className="progress">
                                                                    <div style={{width: `${(simulado.total_correct_answers/simulado.total_answers)*100}%`}}></div>
                                                                </div>
                                                                <p>Tempo consumido: {simulado.time_spent}min</p>
                                                                <div className="materias">
                                                                    {
                                                                        (simulado.subjects) &&
                                                                        Object.keys(simulado.subjects).map((subject, index) => {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <p>{subject}</p>
                                                                                    <h4>{simulado.subjects![subject].totalCorrect}/{simulado.subjects![subject].totalQuestions}</h4>
                                                                                    <div className="progress">
                                                                                        <div style={{width: `${(simulado.subjects![subject].totalCorrect/simulado.subjects![subject].totalQuestions)*100}%`}}></div>
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
                                                    simuladosAndListas[1] && simuladosAndListas[1].map((lista, index) => {
                                                        return (
                                                            <div key={index} className="provaCard"
                                                            onClick={() => {
                                                                let number = (index + 1) * 10 + 2;
                                                                openOverlay(number);
                                                            }}>
                                                                <h3>[ {lista.id} ] - {lista.total_correct_answers}/{lista.total_answers}</h3>
                                                                <div className="progress">
                                                                    <div style={{width: `${(lista.total_correct_answers/lista.total_answers)*100}%`}}></div>
                                                                </div>
                                                                <p>Tempo consumido: {lista.time_spent}min</p>
                                                                <div className="materias">
                                                                    {
                                                                        (lista.subjects) &&
                                                                        Object.keys(lista.subjects).map((subject, index) => {
                                                                            return (
                                                                                <div key={index}>
                                                                                    <p>{subject}</p>
                                                                                    <h4>{lista.subjects![subject].totalCorrect}/{lista.subjects![subject].totalQuestions}</h4>
                                                                                    <div className="progress">
                                                                                        <div style={{width: `${(lista.subjects![subject].totalCorrect/lista.subjects![subject].totalQuestions)*100}%`}}></div>
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