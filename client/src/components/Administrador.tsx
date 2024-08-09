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
import { questionInterface } from "../controllers/interfaces";
import QuestionBox from "./questions/QuestionBox";

const Admistrator = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [nomeArea, setNomeArea] = useState<string>('');
    const [areaPai, setAreaPai] = useState<string | null>(null);
    const [areas, setAreas] = useState<string[] | null>([]);

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

    useEffect(() => {
        handleGetAreas().then((areas) => {
            let listaNomeAreas: string[] = areas.map((area) => area.name);
            setAreas(listaNomeAreas);
            //console.log(listaNomeAreas);
            handleGetQuestions().then((questions) => {
                setQuestions(questions);
                console.log(questions);
                setLoading(false);
            });
        });        
    }, []);

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