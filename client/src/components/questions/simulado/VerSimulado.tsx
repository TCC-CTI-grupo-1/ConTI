import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { handleGetSimulado } from '../../../controllers/userController';
import { showAlert } from '../../../App';
import { questionInterface, simuladoInterface } from '../../../controllers/interfaces';
import Simulado from './Respostas';
import { handleGetQuestion } from '../../../controllers/userController';

const SimuladoVer = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [simulado, setSimulado] = useState<simuladoInterface | null>(null);
    const [questionsHashMap, setQuestionsHashMap] = useState<[number, questionInterface, string | null][] | null>(null);
    

    async function handleGetUsuarioSimulado(){
        if(id){
            let idSimulado = parseInt(id);
            const simulado = await handleGetSimulado(idSimulado);
            
            setSimulado(simulado);
            
            //console.log(simulado);

            const questionsHashMap = await getQuestionsHashMap(simulado);
            setQuestionsHashMap(questionsHashMap);

            setLoading(false);
            
        }
        else{
            showAlert('Ocorreu um erro. Favor recarregar a pagina.', 'error');
        }
    }

    useEffect(() => {
        handleGetUsuarioSimulado();
    }, []);

    async function getQuestionsHashMap(simulado: simuladoInterface | null): Promise<[number, questionInterface, string | null][]> {
        const questionsHashMap: [number, questionInterface, string | null][] = [];
        
        if(simulado){
            let cont = 1;
            simulado.questions.forEach(async (q, index) => {
                const question = await handleGetQuestion(index);
                questionsHashMap.push([cont, question, q]);
                cont++;
            });
        }
        return questionsHashMap;
    }

    return (
        <>
        {
            loading ? <h1>Loading...</h1> : 
            simulado ? 
            <>
                <Simulado questionsHashMap={questionsHashMap!}/>      
            </> 
            
            : <h1>Simulado não encontrado</h1>
        }
        </>
    )
}

export default SimuladoVer