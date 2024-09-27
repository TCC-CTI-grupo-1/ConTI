import Navbar from "../Navbar"
import Background from "../user/Background"
import { Button, Spinner } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
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
import { useState } from "react"

const NewTest = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const navigate = useNavigate();    
    const [loading, setLoading] = useState(false);

    async function handlegenerateNewSimulado(){
        setLoading(true);
        navigate('/test');
    }

    return (
        <>
        {
            loading ? <h1>Loading</h1> : <>
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
                                        <p>Teste suas habilidades na prática com um teste feito especialmente para você!</p>
                                    </div>
                                    <Button colorScheme="blue" size="lg" variant="solid" onClick={() => {
                                        onOpen();
                                    }
                                    }>
                                        Iniciar simulado
                                    </Button>
                                </div>
                                <div>
                                    <div>
                                        <h2>Fazer uma lista de exercícios</h2>
                                        <p>Pratique uma matéria de sua escolha, no seu tempo.</p>
                                    </div>
                                    <Button colorScheme="blue" size="lg" variant="solid" onClick={() => {
                                        //Voltar para a tela anterior
                                        alert('Em construção');
                                    }
                                    }>
                                        Iniciar lista de exercícios
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Deseja iniciar um simulado?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>- A partir do momento de início, você terá três horas para concluir a prova.</p>
                        <br></br>
                        <p>- É possível finalizá-la sem responder a todas as questões, 
                            entretanto, as não respondidas serão consideradas erradas.</p>
                        <br></br>
                        <p>- Os resultados desse simulado serão usados para criarmos ainda mais simulados personalizados, e para lhe apresentar suas dificuldades</p>
                        <br></br>
                        <p>Boa sorte!</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => {
                            handlegenerateNewSimulado();
                            onClose();
                            onOpen2();
                            
                        }}>Iniciar simulado</Button>
                        <Button onClick={onClose}>Ainda não</Button>
                    </ModalFooter>
                    </ModalContent>
                    </Modal>


                    <Modal onClose={onClose2} isOpen={isOpen2} isCentered
                    closeOnEsc={false}
                    closeOnOverlayClick={false}
                    >
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Iniciando simulado...</ModalHeader>
                    <ModalBody>
                        <div className="centered">
                            <h3>Aguarde enquanto preparamos seu simulado...</h3>
                            <br></br>
                            <Spinner size="xl" />
                        </div>
                        
                    </ModalBody>
                    <ModalFooter>
                        
                    </ModalFooter>
                    </ModalContent>
                    </Modal>
                </>
            }
        </>
    )
}

export default NewTest