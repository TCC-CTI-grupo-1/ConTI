import Navbar from "./Navbar"
import { useState, useEffect } from "react";
import Button from "././Button"
import Input from "././Input";
import { handleDeleteAccount, handleLogout, handleSaveChanges } from "./../controllers/userController";
import { Select } from '@chakra-ui/react'
import { handleGetAreas } from "./../controllers/userController";
import { handlePostArea } from "./../controllers/userController";
import { showAlert } from "./../App";
import { handleGetQuestions } from "./../controllers/userController";
import { areaInterface, questionInterface } from "../controllers/interfaces";
import QuestionBox from "./questions/QuestionBox";
import { handleGetAreaById } from "./../controllers/userController";

const Admistrator = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [nomeArea, setNomeArea] = useState<string>('');
    const [areaPai, setAreaPai] = useState<string | null>(null);
    const [areas, setAreas] = useState<string[] | null>([]);
    const [areaPorID, setAreaPorID] = useState<areaInterface | null>(null);


    const [questions, setQuestions] = useState<questionInterface[]>([]);

    async function handlePostNovaArea(){
        showAlert("Cadastrando area...", "warning");
        let resp: boolean = await handlePostArea(nomeArea, areaPai)
        if(resp){
            showAlert("Area cadastrada com sucesso!", "success");
        }else{
            showAlert("Erro cadastrando area");
        }

    }

    async function handleThings(){
        const areas = await handleGetAreas();

        let listaNomeAreas: string[] = areas.map((area) => area.name);
        setAreas(listaNomeAreas);

        const questions = await handleGetQuestions();
        //Pege só as 100 primeiras quesõs
        setQuestions(questions.slice(0, 50));


        const area = await handleGetAreaById(1);

        setAreaPorID(area);

        setLoading(false);
    }

    useEffect(() => {
        handleThings();        
    }, []);

    useEffect(() => {
        console.log('Cometa SUICIODIO');
        console.log(areaPorID);
    }, [areaPorID]);

  return (<>
    {loading ? <h1>Carregando</h1> :
    <div id="Admistrator" className="flex-container full-screen-size">
            <Navbar screen="adm"/>
            <div className="container">
                <div className="header">
                    <h3>Area de admin</h3>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                    <h1>Admistrator</h1>
                    <div className="box">

                        {!loading && <div id="config">
                            <div>
                                <h2>Adicionar area</h2>
                                
                            </div>
                            
                            <div>
                                <Input name={"Nova Area"} label={"Nova area"} onChange={(e) => {
                                    setNomeArea(e.target.value);
                                }}></Input>
                                <Select placeholder='Selecione a area Pai'
                                onChange={(e) => {
                                    if(e.target.value === 'none'){
                                        setAreaPai(null);
                                    }
                                    setAreaPai(e.target.value);
                                }}>
                                    <option value='none'>Nenhuma</option>
                                    {
                                        areas?.map((area, index) => {
                                            return <option key={index} value={area}>{area}</option>
                                        })
                                    }
                                </Select>
                                <Button onClick={handlePostNovaArea}>Salvar</Button>
                            </div>
                        </div>}

                    </div>
                    <div className="box">
                        {areaPorID ? <h1>{areaPorID.name}</h1> : <h1>Area não encontrada</h1>}
                        {!loading && <div>
                            {questions.map((question, index) => {
                                return <QuestionBox key={index} question={question}/>

                            })}
                            
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    }</>
  )
}

export default Admistrator;