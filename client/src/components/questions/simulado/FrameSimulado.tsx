import Simulado from "./Simulado"
import {  useEffect, useState } from "react"
import { questionInterface } from "../../../controllers/interfaces"
import { handlePostSimulado, generateNewSimulado } from "../../../controllers/mockTestController";
import { respostaInterface } from "../../../controllers/interfaces";
import { handleGetAnswersByQuestionsIds } from "../../../controllers/answerController";
import { simuladoInterface } from "../../../controllers/interfaces";
import { showAlert } from "../../../App";
import { useNavigate } from "react-router-dom";
// import date from 'date-and-time'
// import { useNavigate } from "react-router-dom"

// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     useDisclosure,
//     Button,
//     Spinner
//   } from '@chakra-ui/react'

type questionMapInterface = {
    question: questionInterface;
    answers: respostaInterface[];
}[];
// type questionMapResultInterface = [number, (string | null)][];  

const SimuladoFrame = () => {

    const[loading, setLoading] = useState(true);
    const[questionsHashMap, setQuestionsHashMap] = useState<questionMapInterface>([]);
    const [simulado, setSimulado] = useState<simuladoInterface | null>(null);

    const navegate = useNavigate();

    useEffect(() => {
        let newQuestionMapInterface: questionMapInterface = []; 
        const getQuestions = async () => {
            
                let questions = await generateNewSimulado();
                
                const answers = await handleGetAnswersByQuestionsIds(questions.map(q => q.id));

                questions.forEach(question => {
                    let qstAnswer: respostaInterface[] | undefined = answers.filter(ans => ans.question_id === question.id);
                    //Organiza as alternativas na ordem "A" "B" "C" "D" "E", por answer.question_letter;
                    qstAnswer.sort((a, b) => a.question_letter.charCodeAt(0) - b.question_letter.charCodeAt(0));
                    newQuestionMapInterface.push({question: question, answers: qstAnswer});

                }); 
                setQuestionsHashMap(newQuestionMapInterface);
        }
        getQuestions();
        
        const postSimulado = async () => {
            let questionsarray: questionInterface[] = questionsHashMap.map(q => q.question);
            const simulado = await handlePostSimulado(questionsarray, "automatico", 50);
            if (simulado !== null) {
                setSimulado(simulado);
                setLoading(false);
            }
            else{
                showAlert("Erro ao Iniciar simulado", "error");
                showAlert("Por favor, tente novamente", "error");
            }
        }
        postSimulado();
    }, []);

    const finishSimulado = () => {
        navegate('/');
        showAlert("Simulado finalizado com sucesso!", "success");
    }
    // function returnJSXOverlay(): JSX.Element{

    //     if (isSimuladoFinished === null) {
    //         return (
    //         <div id="historyOverlay">
    //             <div id="loading">
    //                 <h2>Tudo pronto!</h2>
    //                 <p>Aguarde enquanto corrigimos sua prova...</p>
    //                 <Spinner size="xl" />
    //             </div>
    //         </div>
    //         )
    //     }
    //     else{
    //         return (
    //         <div id="historyOverlay">
    //                 <h2>Simulado #{simulado.id}</h2>
    //                 <p>Tempo consumudo: {simulado.time_spent} minutos</p>
    //                 <p>Feito dia: {date.format(simulado.creation_date, 'DD/MM/YYYY')}</p>
    //                 <h3>{simulado.total_correct_answers}/{simulado.total_answers}</h3>
    //                 <div className="progress">
    //                     <div style={{width: (simulado.total_correct_answers * 100 / simulado.total_answers ) + '%'}}></div>
    //                 </div>
    //                 <div className="materias">
    //                     {
    //                         Object.keys(simulado.subjects).map((subject, index) => {
    //                             return (
    //                                 <div key={index}>
    //                                     <p>{subject} [{simulado.subjects[subject].total_correct_answers}/{simulado.subjects[subject].total_answers}]</p>
    //                                     <div className="progress">
    //                                         <div style={{width: (simulado.subjects[subject].total_correct_answers * 100 / simulado.subjects[subject].total_answers ) + '%'}} />
    //                                     </div>
    //                                 </div>
    //                             )
    //                         })
    //                     }
    //                 </div>
    //         </div>
    //         )
    //     }

    // }

  
    return (
        loading ? <h2>Aguarde enquanto finalizamos o seu simulado... </h2> :
        <>
            {questionsHashMap === null ? <h1>Erro ao carregar simulado</h1> :
                <Simulado questionsHashMap={questionsHashMap} handleFinishSimulado={finishSimulado} 
                mockTestId={simulado!.id}     
                /> 
            }
            </>
            //<Modal
            //     isCentered
            //     onClose={onClose}
            //     isOpen={isOpen}
            //     motionPreset='slideInBottom'
            //     closeOnEsc={false}
            //     closeOnOverlayClick={false}
            // >
            //     <ModalOverlay />
            //     <ModalContent>
            //     <ModalHeader>{simulado === null ? 'Corrigindo...' : 'Informações detalhadas'}</ModalHeader>
            //     <ModalBody>
            //         {returnJSXOverlay()}
            //     </ModalBody> 
            //         <ModalFooter>
            //             {simulado !== null && <>
            //                 <Button variant='ghost' mr={3} onClick={() => {
            //                     navegate('/');
            //                 }}>Voltar ao home</Button>
            //                 <Button colorScheme='blue' onClick={onClose}>
            //                 Ver prova
            //                 </Button>
            //                 </>
            //             }

            //         </ModalFooter>
            //     </ModalContent>
            //</Modal>
        
  )
}

export default SimuladoFrame