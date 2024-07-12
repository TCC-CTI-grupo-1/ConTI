import Navbar from "../Navbar"
import Background from "../user/Background"
import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const NewTest = () => {

    const navigate = useNavigate();    

    return (
        <div id="newtest" className="flex-container full-screen-size">
                <Navbar screen="newtest"/>
                <Background variant='white'/>
                <div className="container">
                    <div className="header">
                        <h1>Novo simulado</h1>
                    </div>
                    <div className="inversed-border"></div>
                    <div className="content">
                        <div>
                            <div>
                                <h2>Fazer um simulado</h2>
                                <p>Teste suas habilidades na pratica com um teste feito especialmente para você!</p>
                            </div>
                            <Button colorScheme="blue" size="lg" variant="solid" onClick={() => {
                                navigate('/test');
                            }
                            }>
                                Iniciar simulado
                            </Button>
                        </div>
                        <div>
                            <div>
                                <h2>Fazer uma lista de exercicios</h2>
                                <p>Pratique uma materia de sua escolha, no seu tempo.</p>
                            </div>
                            <Button colorScheme="blue" size="lg" variant="solid" onClick={() => {
                                //Voltar para a tela anterior
                                alert('Em construção');
                            }
                            }>
                                Iniciar lista de exercicios
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
    )
}

export default NewTest