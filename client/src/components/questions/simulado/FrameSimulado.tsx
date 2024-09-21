import Simulado from "./Simulado"
import { useState, useEffect } from "react"
import { questionInterface, respostaInterface, simuladoInterface } from "../../../controllers/interfaces"
import { handlePostSimulado, generateNewSimulado} from "../../../controllers/mockTestController"
import { handleGetAnswersByQuestionsIds } from "../../../controllers/answerController"
//import date from 'date-and-time'
import { useNavigate } from "react-router-dom"

// import {
//     Spinner
//   } from '@chakra-ui/react'
import { showAlert } from "../../../App"

type questionMapInterface = {
    question: questionInterface;
    answers: respostaInterface[];
}[];
type questionMapResultInterface = [number, (number | null)][];  

const SimuladoFrame = () => {
    const [questionsHashMap, setQuestionsHashMap] = useState<questionMapInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [simulado, setSimulado] = useState<simuladoInterface>({} as simuladoInterface);

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

        handleFinishSimulado(/*respostas*/);
    }

    

    async function handleFinishSimulado(/*respostas: questionMapResultInterface*/){
        setIsSimuladoAwaitActive(true);

        navegate('/history');
        showAlert("Simulado finalizado com sucesso!", "success");
        //const simulado = await handlePostSimulado(respostas, "automatico", 50);
        //setSimulado(simulado);
        
    }

    useEffect(() => {
        const getQuestions = async () => {
                let questions: questionInterface[] = await generateNewSimulado();
                
                return questions;
        }



        const postSimulado = async (questions: questionInterface[]) => {
            const simulado = await handlePostSimulado(questions, "automatico", 50);
            if (simulado !== null) {
                setSimulado(simulado);
                console.log("JORGEJORGEJORGE");
                setLoading(false);
            }
        }


        getQuestions().then((questions) => {
            handleGetAnswersByQuestionsIds(questions.map((question) => question.id)).then((answers) => {
                const questionsHashMap: questionMapInterface = questions.map((question, ) => {
                    let newAnswers = answers.filter((answer) => answer.question_id === question.id)
                    let newOrderedAnswers = newAnswers.sort((a, b) => a.question_letter.localeCompare(b.question_letter));
                    return {
                        question: question,
                        answers: newOrderedAnswers              
                    }
                });
                setQuestionsHashMap(questionsHashMap);
                postSimulado(questions);
            });
        });


        
    }, []);

    // function returnJSXOverlay(): JSX.Element{

    //     if (isSimuladoAwaitActive === null) {
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

  
    //Esse código não tem erro
    
    return (
        loading ? <h2>Aguarde enquanto preparamos o seu simulado... </h2> :
        <>
            {questionsHashMap === null ? <h1>Erro ao carregar simulado</h1> :
                <Simulado questionsHashMap={questionsHashMap} handleFinishSimulado={handleGetRespostas} 
                isSimuladoFinished={isSimuladoAwaitActive}   mockTestId={simulado.id}  
                /> 
            }
        </>
        
  )
}

export default SimuladoFrame