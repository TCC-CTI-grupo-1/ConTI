
import Navbar from "../Navbar"
import { Button } from "@chakra-ui/react"
import QstDetail from "../questions/simulado/QstDetail"
import { ProgressBar } from "../ProgressBar"
import DatabaseIcon from "../../assets/DatabaseIcon";
import NewTestIcon from "../../assets/NewTestIcon.tsx";
//TEM QUE TER A DIVISÃO DO LOGADO E NÃO LOGADO
const Home = () => {

    const question =  {
        "id": 981,
        "question_text": "Colabora com o efeito de humor da tira a ideia de que Calvin, o menino,",
        "question_year": 2022,
        "total_answers": 0,
        "total_correct_answers": 0,
        "difficulty": "facil",
        "additional_info": "É UM ABSURDO PESSOAS DE SEIS ANOS NÃO PODEREM VOTAR! AQUI ESTOU EU, UM CIDADÃO SEM PODER ESCOLHER SEU GOVERNO! VOCÊ ESTÁ PREOCUPADO COM OS RUMOS DO NOSSO PAÍS? NÃO. SÓ QUERIA UM PEDAÇO MAIOR DO BOLO. (Bill W aterson, “O melhor de Calvin”. https://cultura.estadao.com.br , 24.08.2021)",
        "area_id": 2,
        "question_creator": "VUNESP",
        "official_test_name": "CTI",
        "question_number": 1,
        "has_image": false,
        "has_latex": false
      }

      const answer=
        [
            {
              "id": 1737,
              "question_id": 981,
              "answer": "confunde o seu amigo com os absurdos da vida.",
              "is_correct": false,
              "question_letter": "A",
              "total_answers": 0
            },
            {
              "id": 1743,
              "question_id": 981,
              "answer": "tem uma preocupação legítima com a vida social.",
              "is_correct": false,
              "question_letter": "B",
              "total_answers": 0
            },
            {
              "id": 1749,
              "question_id": 981,
              "answer": "pensa em política para ajudar os seus semelhantes.",
              "is_correct": false,
              "question_letter": "C",
              "total_answers": 0
            },
            {
              "id": 1755,
              "question_id": 981,
              "answer": "quer ter direito de votar para ter benefício próprio.",
              "is_correct": true,
              "question_letter": "D",
              "total_answers": 0
            }
          ]
  return (
    <div id="home" className="flex-container full-screen-size">
            <Navbar screen="home"/>
            <div className="container">
                <div className="header">
                    <h1>Olá, __</h1>
                </div>
                <div className="content">
                    {//daily_c_graphic é a div que inclui questão diaria
                    // e taxa de acertos na mesma linha
                    }
                    <div className="question_graphic">
                <div className="dly_question">
                    <h3>Deseja fazer uma questão diária? </h3>
                    <QstDetail question={question} answers={answer} 
                       type="small" 
                    />
                </div> 
                 <div className="taxa_acerto">
                 <p> Taxa de acerto nos simulados</p>

                 <div className="graph">
                    <ProgressBar color="blue" radius={90} filledPercentage={52} animation></ProgressBar>
                    </div> 
                    </div>
                    </div>

                    <div className="simuladobanco">
                        <div className="simulado">
                        <p>Teste suas habilidades com um simulado</p>
                        <Button colorScheme="blue" width={315} height={50} variant="solid" onClick={() =>
                            {
                            //Voltar para a tela anterior
                                  alert('Em construção');
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
                                  alert('Em construção');
                            }
                            }>Acessar Banco <DatabaseIcon onIconClick={() => {}}/>
                            </Button>
                        </div>   
                    </div>

                    <div className="simulado_anterior">
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
                    </div>
                 
                </div>
            </div>
        </div>
  )
}


export default Home