
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
import simulado from '../../../public/Simulado.png';
import '../../home.scss';
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
                      <div className="content" id="homeNotLogged">
                        
                        <div className="header">
                          <h2>Quer estudar para o CTI mas não sabe por onde começar?</h2>
                          <p>Use o ConTI! uma solução criada para ajudar os ajudos do CTI a estudar para o vestibulinho usando <strong>simulados personalizados</strong> baseados em suas difficuldades.</p>
                          <div className="elementos-absolutos">
                            <div className="bolha1"></div>
                            <div className="bolha2"></div>
                            <div className="bolha3"></div>
                            <div className="bolha4"></div>
                            <div className="bolha5"></div>
                          </div>
                        </div>

                        <div className="options">
                          <div>
                            <img src={simulado}></img>
                            <div>
                              <h3>Teste nossos simulados personalizados! basta fazer o login.</h3>
                              <Button
                              colorScheme="blue"
                              size={'lg'}
                              onClick={() => navigate('/login')}
                              >Faça o login!</Button>
                              <p>É de graça, não guardamos nenhuma informação pessoas sua alem do seu e-mail, seus simulados anteriores ficarão armazenados em sua conta.</p>
                            </div>
                          </div>

                          <div>
                            <img src={database}></img>
                            <div>
                              <h3>Veja nosso banco de questões!</h3>
                              <Button
                              colorScheme="blue"
                              size={'lg'}
                              onClick={() => navigate('/questions')}
                              >Ver o banco de questões!</Button>
                              <p>Não é necessario login, use os filtros como desejar e tente resolver as questões.</p>
                            </div>
                          </div>

                          <div>
                            <img src={simulado}></img>
                            <div>
                              <h3>Perfil completo com sua taxa de acerto em cada matéria!</h3>
                              <Button
                              colorScheme="blue"
                              size={'lg'}
                              onClick={() => navigate('/login')}
                              >Faça o login!</Button>
                              <p>Graças a essas informações, conseguimos criar um simulado mais voltado para suas dificuldades.</p>
                            </div>
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