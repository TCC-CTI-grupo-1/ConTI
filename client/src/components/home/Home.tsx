
import Navbar from "../Navbar"
import { Button } from "@chakra-ui/react"

//TEM QUE TER A DIVISÃO DO LOGADO E NÃO LOGADO
const Home = () => {
  return (
    <div id="home" className="flex-container full-screen-size">
            <Navbar screen="home"/>
            <div className="container">
             
                <div className="header">
                    <h1>Olá, __</h1>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                    {//daily_c_graphic é a div que inclui questão diaria
                    // e taxa de acertos na mesma linha
                    }
                    <div className="daily_c_graphic">
                <div className="dly_question">
                    <h2>Título da Caixa que deve ser a questão diaria</h2>
                    <p> colocar aqui a logica e back da questao</p>
                    <button className="b_testejana">Responder questão diaria</button>
                </div>
                 <div className="taxa_acerto">
                    <p> Taxa de acerto nos simulados</p> 
                    </div> 
                    </div> 
                    <div className="simuladobanco">
                        <div className="simulado">
                        <p>teste suas habilidades com um simulado rapido</p>
                        <Button colorScheme="blue" size="lg" variant="solid" onClick={() =>
                            {
                            //Voltar para a tela anterior
                                  alert('Em construção');
                            }
                            }>Iniciar simulado
                        </Button>
                        </div>
                        <div className="acessar_questoes"> 
                            <p> Veja nosso banco de questões completo</p>
                            <Button name="btn_banco" colorScheme="gray" size="lg" variant="solid" onClick={() =>
                            {
                            //Voltar para a tela anterior
                                  alert('Em construção');
                            }
                            }>Acessar banco
                        </Button>
                        </div>   
                    </div>
                 
                </div>
            </div>
        </div>
  )
}


export default Home