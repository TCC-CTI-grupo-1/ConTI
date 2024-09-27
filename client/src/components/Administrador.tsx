import Navbar from "./Navbar"
import { useState, useEffect } from "react";
import Button from "././Button"
import Input from "././Input";
import { handleGetAreasMap } from "./../controllers/areasController";
import { Select } from '@chakra-ui/react'
import { handlePostArea } from "./../controllers/areasController";
import { showAlert } from "./../App";
import { handleGetQuestions } from "./../controllers/questionController";
import { areaInterface, questionInterface, respostaInterface } from "../controllers/interfaces";
import QuestionBox from "./questions/QuestionBox";
import { handlePutQuestion, handleDeleteQuestion, handlePostQuestion } from "./../controllers/questionController";
import { handleGetAnswersByQuestionsIds } from "../controllers/answerController";
import QstDetailRespostas from "./questions/simulado/QstDetailResposas";
import { useRef } from "react";
type questionMapInterface = {
    question: questionInterface;
    answers: respostaInterface[];
}[];
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
import QuestionDetail from "./questions/simulado/QuestionDetail";


const Admistrator = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [nomeArea, setNomeArea] = useState<string>('');
    const [areaPai, setAreaPai] = useState<string | null>(null);
    const [areas, setAreas] = useState<{[id: number]: areaInterface}>([]);

    const {onOpen, onClose, isOpen} = useDisclosure();

    let novaQstLimpa = {
        id: 0,
        question_text: '',
        area_id: 1,
        additional_info: '',
        has_image: false,
        has_latex: false,
        difficulty: "facil",
        official_test_name: '',
        question_creator: '',
        question_number: 0,
        question_year: 0,
        total_answers: 0,
        total_correct_answers: 0,
    }
    const emptyAnswerTemplate = {
        id: 0,
        question_id: 0,
        answer: '',
        is_correct: false,
        question_letter: '',
        total_answers: 0,
    }
    let novaAltLimpa: respostaInterface[] = [];
    for (let i = 0; i < 5; i++) {
        novaAltLimpa.push({ ...emptyAnswerTemplate, id: i });
    }

    const [novaQst, setNovaQst] = useState<[questionInterface, respostaInterface[]]>([novaQstLimpa, novaAltLimpa]);
    const [img, setImg] = useState<File | null>(null);



    
    /*const [enunciadoQst, setEnunciadoQst] = useState<string>('');
    const [alternativaA, setAlternativaA] = useState<string>('');
    const [alternativaB, setAlternativaB] = useState<string>('');
    const [alternativaC, setAlternativaC] = useState<string>('');
    const [alternativaD, setAlternativaD] = useState<string>('');
    const [alternativaE, setAlternativaE] = useState<string | null>(null);
    const [alternativaCorreta, setAlternativaCorreta] = useState<string>('A');
    const [qstID, setQstID] = useState<number>(0);*/

    const [questionsMap, setQuestionsMap] = useState<questionMapInterface>([]);
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
        return Math.ceil(questionsMap.length / numberOfQuestionsPerPage);
    }

    async function handleThings(){
        const areasMap = await handleGetAreasMap();

        if(Object.keys(areasMap).length === 0){
            showAlert("Erro ao carregar areas");
            return;
        }

        setAreas(areasMap);
        console.log(areasMap);

        const getQuestions = async () => {
            let questions: questionInterface[] = await handleGetQuestions();
            
            return questions;
        }

        getQuestions().then((questions) => {
            handleGetAnswersByQuestionsIds(questions.map((question) => question.id)).then((answers) => {
                questions.sort((a, b) => a.id - b.id);
                const questionsHashMap: questionMapInterface = questions.map((question, ) => {
                    let newAnswers = answers.filter((answer) => answer.question_id === question.id)
                    let newOrderedAnswers = newAnswers.sort((a, b) => a.question_letter.localeCompare(b.question_letter));
                    return {
                        question: question,
                        answers: newOrderedAnswers              
                    }
                });
                setQuestionsMap(questionsHashMap);
            });
        });

        //deixa questions em ordem crescente de ID
        



        await new Promise((resolve) => setTimeout(resolve, 1500)); //Se for muito rapido de alguma maneira dá erro.
        setLoading(false);
    }

    useEffect(() => {
        handleThings();        
    }, []);    


    const [tela, setTela] = useState<number>(0);
    const options = useRef<HTMLDivElement>(null); // Add type annotation to options ref

    let elements:HTMLAnchorElement[] = [];

    //Talvez mover isso para um componente próprio
    useEffect(() => {
        elements?.forEach((element, index) => {
            element.addEventListener('click', () => {
                handleChangeTela(index);
            });
        });
        console.log('useEffect');
        elements = Array.from(options.current?.querySelectorAll('a') ?? []);
        console.log(elements);
    }, [options]);

    function handleChangeTela(tela: number) {
        setTela(tela);
        elements?.forEach((element, index) => {
            element.classList.remove('active');
                if (index === tela) {
                    element.classList.add('active');
                }
        });
    }

    //organiza as questões por ano e n° de prova, ex: [2021] => [qst1, qst2], [2022] => [qst3, qst4]
    //E as questões dentro dos anos são sorteadas pelo n° da questão na prova oficial.

    // const organaziedQuestions = () => {
    //     let organized: {[year: number]: questionInterface[]} = {};
    //     questionsMap.forEach((question) => {
    //         if(organized[question.question.question_year] === undefined){
    //             organized[question.question.question_year] = [question.question];
    //         }else{
    //             organized[question.question.question_year].push(question.question);
    //         }
    //     });

    //     for (const year in organized) {
    //         organized[year].sort((a, b) => a.question_number - b.question_number);
    //     }

    //     return organized;
    // }

    const [ano, setAno] = useState<number>(2008);
    const [questao, setQuestao] = useState<number>(1);

  return (<>
    {loading ? <h1>Carregando</h1> :
    <>
        <div id="profile" className="flex-container full-screen-size">
            <>
        <Navbar screen="profile"/>
            <div className="container">
                <div className="header">
                    <h1>Area do administrador</h1>
                    <div className="options" ref={options}>
                        <a  className="active">CRUD Questões</a>
                        <a>Adicionar área</a>
                        
                        {/*<div className='selected-line'></div>*/}
                    </div>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                    
                {tela == 0 &&   <>
                    <div className="box qstRevisar">
                        
                        <h2>Revisador de questões:</h2>
                        
                        <div className="op1">
                            <p>Ano: </p>
                            <input type="number" value={ano} onChange={(e) => {
                                if(isNaN(Number(e.target.value))) return;
                                setAno(parseInt(e.target.value));
                            }} />
                        </div>

                        <div className="op1">
                            <p>Questão n°</p>
                            <input type="number" value={questao} onChange={(e) => {
                                if(isNaN(Number(e.target.value))) return;
                                setQuestao(parseInt(e.target.value));
                            }} />
                        </div>
                        
                        <div className="btns">
                            <Button onClick={() => {
                                if(questao === 1){
                                    if(ano === 2008){
                                        return;
                                    }
                                    setAno(ano-1);
                                    setQuestao(1);
                                    return;
                                }
                                setQuestao(questao-1);
                            }}>Anterior</Button>
                            <Button onClick={() => {
                                setQuestao(questao+1);
                            }}>Próxima</Button>
                        </div>
                        

                        {
                            (() => {
                                let localqst: {
                                    question: questionInterface;
                                    answers: respostaInterface[];
                                } | undefined = questionsMap.find((question) => question.question.question_year === ano && question.question.question_number === questao);
                                if(localqst === undefined){
                                    return <h2>Questão não encontrada</h2>;
                                }
                                return <QstDetailRespostas question={localqst.question} answers={localqst.answers}
                                selectedAnswer={1}/>
                            })()
                        }

                        <Button onClick={() => {
                            let editQst: questionInterface;
                            let editAnswers: respostaInterface[];
                            let localqst: {
                                question: questionInterface;
                                answers: respostaInterface[];
                            } | undefined = questionsMap.find((question) => question.question.question_year === ano && question.question.question_number === questao);
                            if(localqst === undefined){
                                return;
                            }
                            editQst = localqst.question;
                            editAnswers = localqst.answers;
                            setNovaQst([editQst, editAnswers]);
                            onOpen();
                        }}>Editar</Button>


                    </div>
                    <div className="box admin">
                                <Button onClick={() => {
                                    setNovaQst([novaQstLimpa, novaAltLimpa]);
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
                                    }} size="xs">Próxima</Button>
                                </div>

                                {!loading && <div className="adm-box">
                                    {questionsMap.map((question, index) => {
                                        return index >= 6 * (pagina - 1) && index < 6 * pagina &&
                                        (areas[question.question.area_id] === undefined ?  null :
                                        <><QuestionBox key={index} question={question.question} area={areas[question.question.area_id]} answers={question.answers}/>
                                            <div className="btn">
                                                <Button size={'xs'} onClick={() => {
                                                    let editQst: questionInterface;
                                                    editQst = question.question;
                                                    let editAnswers: respostaInterface[] = question.answers;
                                                    console.log(editQst);
                                                    setNovaQst([editQst, editAnswers]);
                                                    onOpen();
                                                }}>Editar</Button>
                                            </div>
                                        </>)
                                    })}
                                    
                                </div>}
                            </div></>}
                    {tela == 1 &&  <div id="Admistrator" className="flex-container">
                            <div className="box">

                                {!loading && <div id="config">
                                    <div>
                                        <h2>Adicionar area</h2>
                                        
                                    </div>
                                    
                                    <div>
                                        <Input name={"Nova Area"} label={"Nova area"} onChange={(e) => {
                                            setNomeArea(e.target.value);
                                        }}></Input>
                                        <Select placeholder='Selecione a área Pai'
                                        onChange={(e) => {
                                            if(e.target.value === 'none'){
                                                setAreaPai(null);
                                            }
                                            setAreaPai(e.target.value);
                                        }}>
                                            <option value='none'>Nenhuma</option>
                                            {
                                                Object.values(areas).map((area, index) => {
                                                    return <option key={index} value={area.id}
                                                    onClick={() => {
                                                        let newQst = {...novaQst[0]};
                                                        newQst.area_id = area.id;
                                                        setNovaQst([newQst, novaQst[1]]);

                                                    }}>{area.name}</option>
                                                })
                                            }
                                        </Select>
                                        <Button onClick={handlePostNovaArea}>Salvar</Button>
                                    </div>
                                </div>}
                    </div>
                </div>}

                </div>
            </div>
        </>
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
            <ModalHeader>{novaQst[0].id === 0 ? "Adicionando questão": `Editando questão ${novaQst[0].id}`}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <div className="qst-edit">
                    <div className={!novaQst[0].id?"hidden":"text"}>
                        <textarea name="automatico" id="auto"
                        onChange={(/*e*/)=>{
                            //const regex = /(\d+)\s*([\S\s]*)\s*\(A\)([\S\s]*)\s*\(B\)([\S\s]*)\s*\(C\)([\S\s]*)\s*\(D\)([\S\s]*)\s*\(E\)([\S\s]*)\s*/gm;
                            //const matches = regex.exec(e.target.value);
                        }}></textarea>
                    </div>
                    <div className="text">
                        <p>Enunciado</p>
                        <textarea name="enunciado" id="enunciado"
                        value={novaQst[0].question_text}
                        onChange={(e) => {
                            let newQst = {...novaQst[0]};
                            newQst.question_text = e.target.value;
                            setNovaQst([newQst, novaQst[1]]);
                            }
                        }
                        ></textarea>
                        <div>
                            <p>Informacoes adicionais:</p>
                            <textarea name="info" id="info"
                            onChange={(e) => {
                                let newQst = {...novaQst[0]};
                                newQst.additional_info = e.target.value;
                                setNovaQst([newQst, novaQst[1]]);
                            }}></textarea>
                        </div>
                        
                    </div>              
                    <div className="answers">
                        <p
                        onClick={() => {
                            console.log(novaQst[1]);
                        }}>Alternativas</p>
                        {novaQst[1].map((answer, index) => {
                            return (<><p>{answer.question_letter + ": "}</p><input type="text" placeholder={`Alternativa ${answer.question_letter}`} key={answer.id} 
                            value={answer.answer}
                            onChange={(e) => {
                                let newAnswers = [...novaQst[1]];
                                newAnswers[index].answer = e.target.value;
                                setNovaQst([novaQst[0], newAnswers]);
                            }}
                            /></>)
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
                            value={novaQst[0].official_test_name}
                            onChange={(e) => {
                                let newQst = {...novaQst[0]};
                                newQst.official_test_name = e.target.value;
                                setNovaQst([newQst, novaQst[1]]);
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor="info">Ano da prova: </label>
                            <input type="number" name="info" id="info" 
                            value={novaQst[0].question_year}
                            onChange={(e) => {
                                let ano = Number(e.target.value);
                                let newQst = {...novaQst[0]};
                                newQst.question_year = ano;
                                setNovaQst([newQst, novaQst[1]]);
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor="info">Criador do orgão criador: </label>
                            <input type="text" name="info" id="info" 
                            value={novaQst[0].question_creator}
                            onChange={(e) => {
                                let newQst = {...novaQst[0]};
                                newQst.question_creator = e.target.value;
                                setNovaQst([newQst, novaQst[1]]);
                            }}
                            />
                        </div>
                        <div>
                            <label htmlFor="info">Número da questão: </label>
                            <input type="number" name="info" id="info" 
                            value={novaQst[0].question_number}
                            onChange={(e) => {
                                let num = Number(e.target.value);
                                let newQst = {...novaQst[0]};
                                newQst.question_number = num;
                                setNovaQst([newQst, novaQst[1]]);
                            }}
                            />
                        </div>

                    </div>

                    <div className="options">
                        <div>
                            <label htmlFor="correta">Alternativa correta: </label>
                            <select name="correta" id="correta"
                            value={
                                novaQst[1].find((answer) => answer.is_correct)?.question_letter
                            }
                            >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="area">Área: </label>
                            <select name="area" id="area"
                            value={
                                areas[novaQst[0].area_id] ? areas[novaQst[0].area_id].name : 0
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
                            value={novaQst[0].has_image ? 'checked' : ''}
                            onChange={(e) => {
                                let newQst = {...novaQst[0]};
                                newQst.has_image = e.target.checked;
                                setNovaQst([newQst, novaQst[1]]);
                            }}
                            />
                            
                        </div>
                        <div>
                            <label htmlFor="info">Tem <em>latex?</em> </label>
                            <input type="checkbox" name="info" id="info" 
                            value={novaQst[0].has_latex ? 'checked' : ''}
                            onChange={(e) => {
                                let newQst = {...novaQst[0]};
                                newQst.has_latex = e.target.checked;
                                setNovaQst([newQst, novaQst[1]]);
                            }}
                            />
                        </div>
                    </div>

                    <div>
                        
                        <input type="file" name="image" onChange={
                            (e) => {
                                if(e.target.files){
                                    setImg(e.target.files[0]);
                                }
                            }
                        }/>

                    </div>
                </div>
                
            </ModalBody>
            <ModalFooter>
                {
                    novaQst[0].id === 0 ?
                    <Button onClick={() => {
                        onClose();
                        showAlert("Cadastrando questão...", "warning");
                        handlePostQuestion(novaQst[0]).then((resp) => {
                            if(resp){
                                showAlert("Questão cadastrada com sucesso! Por favor, atualize a página [f5]", "success");
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
                            if(novaQst[0].id === 0){
                                showAlert("Nenhuma questão selecionada para edição");
                                return;
                            }

                            showAlert("Editando questão...", "warning");
                            showAlert(img !== null ? "existem imagens" : "não existem imagens", "warning");
                            handlePutQuestion(novaQst[0], novaQst[1], img).then((resp) => {   
                                if(resp){
                                    showAlert("Questão editada com sucesso! Por favor, atualize a página [f5]", "success");
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

                            if(novaQst[0].id === 0){
                                showAlert("Nenhuma questão selecionada para deletar");
                                return;
                            }

                            showAlert("Deletando questão...", "warning");
                            handleDeleteQuestion(novaQst[0].id).then((resp) => {
                                if(resp){
                                    showAlert("Questão deletada com sucesso! Por favor, atualize a página [f5]", "success");
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

