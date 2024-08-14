import Navbar from "./Navbar"
import { useState, useEffect } from "react";
import Button from "././Button"
import Input from "././Input";
import { handleDeleteAccount, handleGetAreasMap, handleLogout, handleSaveChanges } from "./../controllers/userController";
import { Select } from '@chakra-ui/react'
import { handlePostArea } from "./../controllers/userController";
import { showAlert } from "./../App";
import { handleGetQuestions } from "./../controllers/userController";
import { areaInterface, questionInterface } from "../controllers/interfaces";
import QuestionBox from "./questions/QuestionBox";
import { handlePutQuestion, handleDeleteQuestion } from "./../controllers/userController";

const Admistrator = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [nomeArea, setNomeArea] = useState<string>('');
    const [areaPai, setAreaPai] = useState<string | null>(null);
    const [areas, setAreas] = useState<{[id: number]: areaInterface}>([]);


    const [enunciadoQst, setEnunciadoQst] = useState<string>('');
    const [alternativaA, setAlternativaA] = useState<string>('');
    const [alternativaB, setAlternativaB] = useState<string>('');
    const [alternativaC, setAlternativaC] = useState<string>('');
    const [alternativaD, setAlternativaD] = useState<string>('');
    const [alternativaE, setAlternativaE] = useState<string>('');
    const [alternativaCorreta, setAlternativaCorreta] = useState<string>('A');
    const [qstID, setQstID] = useState<number>(0);

    const [questions, setQuestions] = useState<questionInterface[]>([]);
    const [pagina, setPagina] = useState<number>(1);

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
        const areasMap = await handleGetAreasMap();

        if(Object.keys(areasMap).length === 0){
            showAlert("Erro ao carregar areas");
            return;
        }

        setAreas(areasMap);
        console.log(areasMap);


        const questions = await handleGetQuestions();
        //deixa questions em ordem crescente de ID
        questions.sort((a, b) => a.id - b.id);

        setQuestions(questions);
        console.log(questions);

        setLoading(false);
    }

    useEffect(() => {
        handleThings();        
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
                                        Object.values(areas).map((area, index) => {
                                            return <option key={index} value={area.id}>{area.name}</option>
                                        })
                                    }
                                </Select>
                                <Button onClick={handlePostNovaArea}>Salvar</Button>
                            </div>
                        </div>}

                    </div>
                    <div className="box admin">
                        <div>
                            <h3>Pagina: {pagina}</h3>
                            <Button onClick={() => {
                                setPagina(pagina-1);
                            }} size="xs">Anterior</Button>
                            <input type="number" value={pagina} onChange={(e) => {
                                if(isNaN(Number(e.target.value))) return;

                                setPagina(parseInt(e.target.value));
                            }} />
                            <Button onClick={() => {
                                setPagina(pagina+1);
                            }} size="xs">Proxima</Button>
                        </div>
                        {!loading && <div className="adm-box">
                            {questions.map((question, index) => {
                                return index > 7 * (pagina - 1) && index < 7 * pagina &&
                                (areas[question.area_id] === undefined ?  null :
                                <><QuestionBox key={index} question={question} area={areas[question.area_id]}/>
                                    <div className="btn">
                                        <Button size={'xs'} onClick={() => {
                                            setEnunciadoQst(question.question_text);
                                            setAlternativaA(question.awnsers[0]);
                                            setAlternativaB(question.awnsers[1]);
                                            setAlternativaC(question.awnsers[2]);
                                            setAlternativaD(question.awnsers[3]);
                                            setAlternativaE(question.awnsers[4]);
                                            setAlternativaCorreta(question.correct_answer);
                                            setQstID(question.id);
                                        }}>Editar</Button>
                                    </div>
                                </>)
                            })}
                            
                        </div>}
                        <div className="inputs">
                            <h3>Editando questão {qstID}</h3>
                                <p>Enunciado:</p>
                                <textarea name={'Enunciado'} placeholder="Enunciado" onChange={(e) => {
                                    setEnunciadoQst(e.target.value);
                                }}
                                value={enunciadoQst}></textarea>
                                <Input name={'Alternativa A'} label="Alternativa A" onChange={(e) => {
                                    setAlternativaA(e.target.value);
                                }}
                                value={alternativaA}></Input>
                                <Input name={'Alternativa B'} label="Alternativa B" onChange={(e) => {
                                    setAlternativaB(e.target.value);
                                }}
                                value={alternativaB}></Input>
                                <Input name={'Alternativa C'} label="Alternativa C" onChange={(e) => {
                                    setAlternativaC(e.target.value);
                                }}
                                value={alternativaC}></Input>
                                <Input name={'Alternativa D'} label="Alternativa D" onChange={(e) => {
                                    setAlternativaD(e.target.value);
                                }}
                                value={alternativaD}></Input>
                                <Input name={'Alternativa E'} label="Alternativa E" onChange={(e) => {
                                    setAlternativaE(e.target.value);
                                }}
                                value={alternativaE}></Input>
                                <br></br>
                                <p>Alternativa correta:</p>
                                <Select placeholder='Selecione a alternativa correta' onChange={(e) => {
                                    setAlternativaCorreta(e.target.value);
                                }}
                                value={alternativaCorreta}>
                                    <option value='A'>A</option>
                                    <option value='B'>B</option>
                                    <option value='C'>C</option>
                                    <option value='D'>D</option>
                                    <option value='E'>E</option>
                                </Select>
                                <Button onClick={() => {
                                    let qst = questions.find(qst => qst.id === qstID);
                                    if(qst === undefined){
                                        showAlert("Erro ao encontrar questão");
                                        return;
                                    }
                                    let question: questionInterface = {
                                        question_text: enunciadoQst,
                                        awnsers: [alternativaA, alternativaB, alternativaC, alternativaD, alternativaE],
                                        correct_answer: alternativaCorreta,
                                        id: qstID,
                                        area_id: qst.area_id,
                                        additional_info: qst.additional_info,
                                        has_image: qst.has_image,
                                        has_latex: qst.has_latex,
                                        difficulty: qst.difficulty,
                                        official_test_name: qst.official_test_name,
                                        question_creator: qst.question_creator,
                                        question_number: qst.question_number,
                                        question_year: qst.question_year,
                                    };

                                    handlePutQuestion(question).then((resp) => {
                                        if(resp){
                                            showAlert("Questão editada com sucesso!", "success");
                                        }
                                        else{
                                            showAlert("Erro ao editar questão");
                                        }
                                    }
                                    );
                                }}>Salvar alterações</Button>
                                <Button onClick={() => {
                                    handleDeleteQuestion(qstID).then((resp) => {
                                        if(resp){
                                            showAlert("Questão deletada com sucesso!", "success");
                                        }
                                        else{
                                            showAlert("Erro ao deletar questão");
                                        }
                                    });
                                }}>Deletar</Button>


                            </div>
                    </div>
                </div>
            </div>
        </div>
    }</>
  )
}

export default Admistrator;