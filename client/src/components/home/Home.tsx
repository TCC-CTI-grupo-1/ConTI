
import Navbar from "../Navbar"
import { Button } from "@chakra-ui/react"
import QstDetail from "../questions/simulado/QstDetail"
import { ProgressBar } from "../ProgressBar"
import DatabaseIcon from "../../assets/DatabaseIcon";
import NewTestIcon from "../../assets/NewTestIcon.tsx";
import Background from "../user/Background.tsx";
import { useState, useEffect } from "react";
import { questionInterface, respostaInterface } from "../../controllers/interfaces.ts";
import { handleGetQuestion } from "../../controllers/questionController.ts";
import { handleGetAnswersByQuestionId } from "../../controllers/answerController.ts";
import { useNavigate } from "react-router-dom";
import '../../home.scss';
import simulado from '../../../public/Simulado.png';
import profile from '../../../public/Perfil.png';
import database from '../../../public/banco.png';

const Home = () => {

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [question, setQuestion] = useState<questionInterface | null>(null);
  const [answer, setAnswer] = useState<respostaInterface[] | null>(null);
  const navigate = useNavigate();
  async function getQuestion(){
    //numero aleatorio de 800 a 1300:
    const random = Math.floor(Math.random() * (1300 - 800 + 1)) + 800;
    const question = await handleGetQuestion(random);
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
                      <h2>Olá, {localStorage.getItem('username')}.</h2>
                      <h3>O que você deseja fazer hoje?</h3>
                      <div className="btns">
                        <Button colorScheme="blue" onClick={() => navigate('/newtest')}><NewTestIcon  iconColor="white" backgroundTransparent/> Novo simulado</Button>
                        <Button onClick={() => navigate('/questions')}><DatabaseIcon /> Banco de questões</Button>
                      </div>
                      <div className="info">
                        <div className="acertos_simulado">
                          <a onClick={() => {
                            navigate('/profile');
                          }}><h3>Sua taxa de acerto nos simulados:</h3></a>
                          <ProgressBar filledPercentage={80} radius={100}/>
                          
                        </div>
                        <div className="areas_estudar">
                          <div>
                            <h3>Suas areas de maior dificuldade:</h3>
                            <Button onClick={() => navigate('/profile')}><DatabaseIcon /> Ver perfil</Button>
                          </div>
                          <span><h4>Fisica</h4><h3>54%</h3></span>
                          <span><h4>Fisica Geral</h4><h3>31%</h3></span>
                          <span><h4>Fisica num geral</h4><h3>3%</h3></span>
                        </div>
                      </div>

                      <h3 className="daily">Que tal fazer uma quesão diária?</h3>
                      
                      <div className="daily">
                        {question ? answer && <QstDetail question={question} answers={answer} /> : <h3>Questão não enconrada</h3>}

                      </div>


                                
                    </section>
                    
                  </> : <>
                      <div className="bolhas">
                          <div className="bolha1"> <h1>  </h1></div>
                          <div className="bolha2"> <h1> </h1></div>
                          
                      
                     
                          <div className="bolha3"> <h1>  </h1></div>
                          <div className="bolha4"> <h1>  </h1></div> 
                          <div className="quer"><h2>Quer estudar no CTI mas não sabe como se preparar?</h2></div>
                          <div className="conheca"><h1> Conheça o ConTI! </h1> </div>
                          <div className="bolha5"> <h1>  </h1></div>
                          <div className="bolha6"> <h1>  </h1></div>
                        </div>
                     
                    <div className="porque"><p>Por que estudar com o conti?</p></div>

                    <div className="motivos">
                        <div className="mot_simulados">
                            <h3> Simulados personalizados</h3>
                            <div className="mot_p01">
                              <p>Nosso sistema oferece simulados adaptados á cada dificuldade, proporcionando 
                              uma experiência de estudo progressivo e promovendo uma preparação eficaz.</p>
                            </div>
                            <img src={simulado} alt="Imagem da equipe" className="mot_img" />                            
                        </div>

                        <div className="mot_banco">
                          <h3> Banco de questões gratuito</h3>
                          <div className="mot_p02">
                            <p> Com um banco de questões que inclui perguntas pertencentes a vestibulinhos de 
                              anos anteriores, os alunos têm acesso a um material de qualidade para praticar 
                              e se familiarizar com o formato das provas.</p>

                              <img src={database} alt="Imagem da equipe" className="mot_img" />
                          </div>
                        </div>

                        {/*<div className="mot_acompanhamento">
                          <h3> Seja acompanhado por seus professores</h3>
                          <div className="mot_p01">
                            <p> Professores podem criar simulados, listas de exercícios e adicionar perguntas 
                            ao banco, proporcionando acompanhamento personalizado e enriquecendo a experiência 
                            de aprendizagem.</p>
                            <img src="./equipe.jpg" alt="Imagem da equipe" className="mot_img" /> 
                          </div>
                        </div>*/}

                        <div className="mot_resultados">
                          <h3> Acompanhamento de resultados</h3>
                            <div className="mot_p01">
                            <p> Nosso sistema disponibiliza gráficos detalhados de perfil, permitindo visualização 
                              de desempenhos em cada matéria e prova, facilitando a identificação de áreas que 
                              precisam de mais atenção.</p>
                              <img src={profile} alt="Imagem da equipe" className="mot_img" /> 
                            </div>
                        </div>
                   
                    </div>
                  </>}
                  
                </div>
            </div>
    </div>
  )
}

export default Home