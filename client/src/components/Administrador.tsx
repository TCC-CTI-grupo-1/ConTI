import Navbar from "./Navbar"
import { useState, useEffect } from "react";
import Button from "././Button"
import Input from "././Input";
import { handleDeleteAccount, handleGetAreasMap, handleLogout, handleSaveChanges } from "./../controllers/userController";
import { Select } from '@chakra-ui/react'
import { handlePostArea } from "./../controllers/userController";
import { showAlert } from "./../App";
import { handleGetQuestions } from "./../controllers/userController";
import { areaInterface, questionInterface, respostaInterface } from "../controllers/interfaces";
import QuestionBox from "./questions/QuestionBox";
import { handlePutQuestion, handleDeleteQuestion, handlePostQuestion } from "./../controllers/userController";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'


const Admistrator = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [nomeArea, setNomeArea] = useState<string>('');
    const [areaPai, setAreaPai] = useState<string | null>(null);
    const [areas, setAreas] = useState<{[id: number]: areaInterface}>([]);

    const {onOpen, onClose, isOpen} = useDisclosure();

    const respostasVario: respostaInterface[] = [
        {id: 0, question_id: 0, answer: '', is_correct: false, question_letter: '', total_answers: 0},
        {id: 0, question_id: 0, answer: '', is_correct: false, question_letter: '', total_answers: 0},
        {id: 0, question_id: 0, answer: '', is_correct: false, question_letter: '', total_answers: 0},
        {id: 0, question_id: 0, answer: '', is_correct: false, question_letter: '', total_answers: 0},
        {id: 0, question_id: 0, answer: '', is_correct: false, question_letter: '', total_answers: 0},
        {id: 0, question_id: 0, answer: '', is_correct: false, question_letter: '', total_answers: 0}
    ];

    const [novaQst, setNovaQst] = useState<questionInterface>({
        id: 0,
        question_text: '',
        answers: respostasVario,
        area_id: 0,
        additional_info: '',
        has_image: false,
        has_latex: false,
        difficulty: "",
        official_test_name: '',
        question_creator: '',
        question_number: 0,
        question_year: 0,
    });

    /*const [enunciadoQst, setEnunciadoQst] = useState<string>('');
    const [alternativaA, setAlternativaA] = useState<string>('');
    const [alternativaB, setAlternativaB] = useState<string>('');
    const [alternativaC, setAlternativaC] = useState<string>('');
    const [alternativaD, setAlternativaD] = useState<string>('');
    const [alternativaE, setAlternativaE] = useState<string | null>(null);
    const [alternativaCorreta, setAlternativaCorreta] = useState<string>('A');
    const [qstID, setQstID] = useState<number>(0);*/

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

    function getLastPageNumber(){
        let numberOfQuestionsPerPage = 6;
        return Math.ceil(questions.length / numberOfQuestionsPerPage);
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

        await new Promise((resolve) => setTimeout(resolve, 1500)); //Se for muito rapido de alguma maneira dá erro.
        setLoading(false);
    }

    useEffect(() => {
        handleThings();        
    }, []);
    //tem tanto código aqui que ninguém vai saber que eu sou gay -> bastazini(fernndo)
  return (<>
    {loading ? <h1>Carregando</h1> :
        <>
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
                            <Button onClick={() => {
                                let questionLimpa = {
                                    id: 0,
                                    question_text: '',
                                    answers: respostasVario,
                                    area_id: 0,
                                    additional_info: '',
                                    has_image: false,
                                    has_latex: false,
                                    difficulty: "",
                                    official_test_name: '',
                                    question_creator: '',
                                    question_number: 0,
                                    question_year: 0,
                                }
                                setNovaQst(questionLimpa);
                                onOpen();
                            }}>Adicionar questão</Button>
                            <div className="page">
                                <h3>Pagina: {pagina} / {getLastPageNumber()}</h3>
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
                                    return index >= 6 * (pagina - 1) && index < 6 * pagina &&
                                    (areas[question.area_id] === undefined ?  null :
                                    <><QuestionBox key={index} question={question} area={areas[question.area_id]}/>
                                        <div className="btn">
                                            <Button size={'xs'} onClick={() => {
                                                let editQst: questionInterface;
                                                editQst = question;
                                                console.log(editQst);
                                                setNovaQst(editQst);
                                                onOpen();
                                            }}>Editar</Button>
                                        </div>
                                    </>)
                                })}
                                
                            </div>}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
                size={'xl'}
            >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{novaQst.id === 0 ? "Adicionando questão": `Editando questão ${novaQst.id}`}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <div className="qst-edit">
                    <div className={!novaQst.id?"hidden":"text"}>
                        <textarea name="automatico" id="auto"
                        onChange={(e)=>{
                            const regex = /(\d+)\s*([\S\s]*)\s*\(A\)([\S\s]*)\s*\(B\)([\S\s]*)\s*\(C\)([\S\s]*)\s*\(D\)([\S\s]*)\s*\(E\)([\S\s]*)\s*/gm;
                            const matches = regex.exec(e.target.value);
                            for(const match in matches)
                            {
                                //ver oq fazer aqui
                            }
                        }}></textarea>
                    </div>
                    <div className="text">
                        <p>Enunciado</p>
                        <textarea name="enunciado" id="enunciado"
                        value={novaQst.question_text}
                        onChange={(e) => {
                            setNovaQst({...novaQst, question_text: e.target.value});
                            }
                        }
                        ></textarea>
                        <div>
                            <p>Informacoes adicionais:</p>
                            <textarea name="info" id="info"></textarea>
                        </div>
                        
                    </div>              
                    <div className="answers">
                        <p>Alternativas</p>
                        {novaQst.answers.map((answer, index) => {
                            return (<input type="text" placeholder={`Alternativa ${answer.question_letter}`} key={answer.id} 
                            value={answer.answer}
                            onChange={(e) => {
                                let newAnswers = [...novaQst.answers];
                                newAnswers[index].answer = e.target.value;
                                setNovaQst({...novaQst, answers: newAnswers});
                            }}
                            />)
                        })

                        }
                        {/*<input type="text" placeholder="Alternativa A" />
                        <input type="text" placeholder="Alternativa B" />
                        <input type="text" placeholder="Alternativa C" />
                        <input type="text" placeholder="Alternativa D" />
                        <input type="text" placeholder="Alternativa E" />*/}

                    </div>
                    <div className="answers">
                        <p>Opções</p>
                        
                        <div>
                            <label htmlFor="info">Nome da prova oficial: </label>
                            <input type="text" name="info" id="info" 
                            value={novaQst.official_test_name}
                            onChange={(e) => {
                                setNovaQst({...novaQst, official_test_name: e.target.value});
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor="info">Ano da prova: </label>
                            <input type="number" name="info" id="info" 
                            value={novaQst.question_year}
                            onChange={(e) => {
                                let ano = Number(e.target.value);
                                setNovaQst({...novaQst, question_year: ano});
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor="info">Criador do orgão criadpr: </label>
                            <input type="text" name="info" id="info" 
                            value={novaQst.question_creator}
                            onChange={(e) => {
                                setNovaQst({...novaQst, question_creator: e.target.value});
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor="info">Numero da questão: </label>
                            <input type="number" name="info" id="info" 
                            value={novaQst.question_number}
                            onChange={(e) => {
                                let num = Number(e.target.value);
                                setNovaQst({...novaQst, question_number: num});
                            }}
                            />
                        </div>

                    </div>

                    <div className="options">
                        <div>
                            <label htmlFor="correta">Alternativa correta: </label>
                            <select name="correta" id="correta">
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                {novaQst.answers[5] && <option value="E">E</option>}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="area">Area: </label>
                            <select name="area" id="area"
                            value={
                                areas[novaQst.area_id] ? areas[novaQst.area_id].name : 0
                            }>
                                {Object.values(areas).map((area, index) => {
                                    return <option key={index} value={area.id}>{area.name}</option>
                                })}
                            </select>
                        </div>

                        <div>

                            <label htmlFor="info">Dificuldade: </label>
                            <select name="info" id="info">
                                <option value="1">Fácil</option>
                                <option value="2">Médio</option>
                                <option value="3">Díficil</option>
                            </select>

                        </div>
                        <div>
                            <label htmlFor="info">Tem imagem? </label>
                            <input type="checkbox" name="info" id="info" 
                            value={novaQst.has_image ? 'checked' : ''}
                            onChange={(e) => {
                                setNovaQst({...novaQst, has_image: e.target.checked});
                            }}
                            />
                            
                        </div>
                        <div>
                            <label htmlFor="info">Tem latex? </label>
                            <input type="checkbox" name="info" id="info" 
                            value={novaQst.has_latex ? 'checked' : ''}
                            onChange={(e) => {
                                setNovaQst({...novaQst, has_latex: e.target.checked});
                            }}
                            />
                        </div>
                    </div>
                </div>
                
            </ModalBody>
            <ModalFooter>
                {
                    novaQst.id === 0 ?
                    <Button onClick={() => {
                        onClose();
                        showAlert("Cadastrando questão...", "warning");
                        handlePostQuestion(novaQst).then((resp) => {
                            if(resp){
                                showAlert("Questão cadastrada com sucesso!", "success");
                                setLoading(true);
                                handleGetQuestions().then((questions) => {
                                    setQuestions(questions);
                                    setLoading(false);
                                });
                            }
                            else{
                                showAlert("Erro ao cadastrar questão");
                            }
                        });
                    }}>Nova questão</Button>
                    :
                    <>
                        <Button colorScheme='blue' onClick={() => {

                            onClose();
                            if(novaQst.id === 0){
                                showAlert("Nenhuma questão selecionada para edução");
                                return;
                            }

                            showAlert("Editando questão...", "warning");
                            handlePutQuestion(novaQst).then((resp) => {   
                                if(resp){
                                    showAlert("Questão editada com sucesso!", "success");
                                    setLoading(true);
                                    handleGetQuestions().then((questions) => {
                                        setQuestions(questions);
                                        setLoading(false);
                                    });
                                }
                                else{
                                    showAlert("Erro ao editar questão");
                                    
                                }
                            }
                            );
                        }}>
                        Salvar alteracoes
                        </Button>
                        <Button colorScheme="red" onClick={() => {
                            onClose();

                            if(novaQst.id === 0){
                                showAlert("Nenhuma questão selecionada para deletar");
                                return;
                            }

                            showAlert("Deletando questão...", "warning");
                            handleDeleteQuestion(novaQst.id).then((resp) => {
                                if(resp){
                                    showAlert("Questão deletada com sucesso!", "success");
                                    setLoading(true);
                                    handleGetQuestions().then((questions) => {
                                        setQuestions(questions);
                                        setLoading(false);
                                    });
                                }
                                else{
                                    showAlert("Erro ao deletar questão");
                                }
                            });
                        }}>Deletar questão</Button>
                    </>
                }
                <Button variant='ghost' onClick={onClose}>Cancelar</Button>
            </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    }</>
  )
}

export default Admistrator;

