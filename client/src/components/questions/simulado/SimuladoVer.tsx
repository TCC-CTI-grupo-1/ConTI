import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { handleGetSimulado } from '../../../controllers/userController';
import { showAlert } from '../../../App';
import { simuladoInterface } from '../../../controllers/interfaces';

const SimuladoVer = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [simulado, setSimulado] = useState<simuladoInterface | null>(null);

    async function handleGetUsuarioSimulado(){
        if(id){
            let idSimulado = parseInt(id);
            const simulado = await handleGetSimulado(idSimulado);
            
            setSimulado(simulado);
            setLoading(false);
            //console.log(simulado);
            
        }
        else{
            showAlert('Ocorreu um erro. Favor recarregar a pagina.', 'error');
        }
    }

    useEffect(() => {
        handleGetUsuarioSimulado();
    }, []);

    return (
        <>
        {
            loading ? <h1>Loading...</h1> : 
            simulado ? 
            <>
                <div>Simulado</div>
                <div>{simulado.id}</div>
                
            </> 
            
            : <h1>Simulado não encontrado</h1>
        }
        </>
    )
}

export default SimuladoVer