import Simulado from "./Simulado"
import { useState, useEffect } from "react"
import { questionInterface } from "../../../controllers/interfaces"
import { handleGetQuestion, handlePostSimulado } from "../../../controllers/userController"

interface Props{
    questionsList: number[],
}

const SimuladoFrame = ({questionsList}:Props) => {
    const [questionsHashMap, setQuestionsHashMap] = useState(new Map<number, questionInterface>());
    const [loading, setLoading] = useState(true);
    
    function handleFinishSimulado(questionsResult: Map<number, string | null>) {
        let respostas: Map<number, string | null> = new Map();
        questionsResult.forEach((value, key) => {
            if(questionsHashMap.get(key) !== undefined) {
                respostas.set(questionsHashMap.get(key)!.id, value)
            }
            else{
                console.log('Error');
            }
        });

        handlePostSimulado(respostas);
    }

    useEffect(() => {
        const getQuestions = async () => {
            const questionsHashMap = new Map<number, questionInterface>();
            for(let i = 0; i < questionsList.length; i++){
                const question = await handleGetQuestion(questionsList[i]);
                questionsHashMap.set(i, question);
            }
            setQuestionsHashMap(questionsHashMap);
            setLoading(false);
        }
        getQuestions();
    }, [questionsList]);

  
  
    return (
        loading ? <h1>Loading...</h1> :
        <Simulado questionsHashMap={questionsHashMap} handleFinishSimulado={handleFinishSimulado} /> 
  )
}

export default SimuladoFrame