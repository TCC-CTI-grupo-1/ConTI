
import Navbar from "../Navbar"
import { Button } from "@chakra-ui/react"
import QstDetail from "../questions/simulado/QstDetail"
import { ProgressBar } from "../ProgressBar"
import DatabaseIcon from "../../assets/DatabaseIcon";
import NewTestIcon from "../../assets/NewTestIcon.tsx";
import Background from "../user/Background.tsx";
import { useState, useEffect } from "react";
import { questionInterface, respostaInterface } from "../../controllers/interfaces.ts";
import { handleGetQuestions } from "../../controllers/questionController.ts";
import { handleGetAnswersByQuestionId } from "../../controllers/answerController.ts";
import { useNavigate } from "react-router-dom";
import simuladoImg from '../../../public/Simulado.png';
import perfilImg from '../../../public/Perfil.png';
import bancoImg from '../../../public/banco.png';
import '../../home.scss';

//TEM QUE TER A DIVISÃO DO LOGADO E NÃO LOGADO
const Home = () => {

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [question, setQuestion] = useState<questionInterface | null>(null);
  const [answer, setAnswer] = useState<respostaInterface[] | null>(null);
  const navegate = useNavigate();
  async function getQuestion(){
    const questions = await handleGetQuestions()
    const randomNumber = Math.floor(Math.random() * questions.length);
    const question = questions[randomNumber];
    if (question !== null) {
      const answer = await handleGetAnswersByQuestionId(question.id);
      setQuestion(question);
      setAnswer(answer);
    }
  }

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div id="home" className="flex-container full-screen-size">
            <Navbar screen="home"/>
            <div className="container">
                <Background variant="white" />
                <div className="header">
                    <h1>Home</h1>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                  {isLoggedIn ? <>
                    <section className="home">
                    <h3>O que deseja fazer hoje?</h3>
                        <div className="question_graphic">
                            <div className="dly_question">
                                <h3>Deseja fazer uma questão diária? </h3>
                                {question !== null && answer !== null &&
                                <QstDetail question={question} answers={answer} 
                                    type="small" />
                                }
                                    
                            </div> 
                            <div className="taxa_acerto">
                            <p> Taxa de acerto nos simulados</p>
                                <div className="graph">
                                    <ProgressBar color="blue" radius={150} filledPercentage={52} animation></ProgressBar>
                                </div> 
                            </div>
                        </div>

                        <div>
                            <div className="simuladobanco">
                                    <div className="simulado">
                                    <p>Teste suas habilidades com um simulado</p>
                                    <Button colorScheme="blue" width={315} height={50} variant="solid" onClick={() =>
                                        {
                                            navegate('/newtest');
                                        }
                                        }>Iniciar simulado <NewTestIcon iconColor="white" onIconClick={() => {}}/>
                                    </Button>    
                                    </div>

                                    <div className="ou">
                                        <p> ou </p>
                                    </div>

                                    <div className="acessar_questoes"> 
                                        <p> Veja nosso banco de questões completo</p>
                                        <Button name="btn_banco" colorScheme="gray" width={315} height={50} variant="solid" onClick={() =>
                                        {
                                            navegate('/questions');
                                        }
                                        }>Acessar Banco <DatabaseIcon onIconClick={() => {}}/>
                                        </Button>
                                    </div>   
                            </div>

                            {/*<div className="simulado_anterior">
                                <div className="sim_anteriores"><p>Simulados anteriores</p> </div>
                                    <div className="caixa_sim"> 
                                        <div className="acertos_sim">
                                            37/50 <NewTestIcon onIconClick={() => {}}/>
                                        </div>

                                        <div className="time">
                                            tempo: 1h 27min
                                        </div>
                                        <div className="vermais"> ver mais</div>
                                        
                                    </div>
                            </div>*/}
                        </div>
                                
                    </section>
                    
                  </> : <>
                      {/*<div className="bolhas">
                          <div className="bolha1"> <h1>  </h1></div>
                          <div className="bolha2"> <h1>  </h1></div>
                          <div className="bolha3"> <h1>  </h1></div>
                          <div className="bolha4"> <h1>  </h1></div>
                          <div className="bolha5"> <h1>  </h1></div>
                          <div className="bolha6"> <h1>  </h1></div>
                        </div>*/}

                    <div className="porque"><p>Por que estudar com o conti?</p></div>

                    <div className="motivos">
                        <div>
                            
                            <div className="mot_p01">
                              <h3> Simulados personalizados</h3>
                              <p>Nosso sistema oferece simulados adaptados á cada dificuldade, proporcionando 
                              uma experiência de estudo progressivo e promovendo uma preparação eficaz.</p>
                            </div>
                            <img src={simuladoImg} alt="Imagem da equipe" className="mot_img" />                            
                        </div>

                        <div className="pop">
                          
                          <div className="mot_p02">
                            <h3> Banco de questões gratuito</h3>
                            <p> Com um banco de questões que inclui perguntas pertencentes a vestibulinhos de 
                              anos anteriores, os alunos têm acesso a um material de qualidade para praticar 
                              e se familiarizar com o formato das provas.
                              </p>   
                          </div>
                          <img src={bancoImg} alt="Imagem da equipe" className="mot_img" />
                        </div>

                        <div>
                          
                          <div className="mot_p01">
                            <h3> Seja acompanhado por seus professores</h3>
                            <p> Professores podem criar simulados, listas de exercícios e adicionar perguntas 
                            ao banco, proporcionando acompanhamento personalizado e enriquecendo a experiência 
                            de aprendizagem.
                            </p>
                          </div>
                          <img src={perfilImg} alt="Imagem da equipe" className="mot_img" /> 
                        </div>
                    </div>

                    <div className="equipe">

                    </div>
                  </>}
                  
                </div>
            </div>
    </div>
  )
}

export default Home