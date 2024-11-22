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
import LoadingScreen from "../LoadingScreen"
import { generateNewSimulado } from "../../controllers/mockTestController"
import { handlePostSimulado } from "../../controllers/mockTestController"
import { showAlert } from "../../App"
import AreaTree from "../AreaTree"
import { generateNewLista } from "../../controllers/mockTestController"

const NewTest = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
    const navigate = useNavigate();    
    const [loading, setLoading] = useState(false);

    const [materiasLista, setMateriasLista] = useState<number[]>([]);

    async function handlegenerateNewSimulado(){
        setLoading(true);
        const questions_simulado = await generateNewSimulado();
        if(questions_simulado === null || questions_simulado.length == 0){
            showAlert("Erro ao carregar o seu simulado.");
            showAlert("Por favor tente novamente.");
            setLoading(false);
            onClose2();
            return;
        }
        const simulado = await handlePostSimulado(questions_simulado, "automatico", 50);
        if(simulado === null){
            showAlert("Erro ao carregar o seu simulado.");
            showAlert("Por favor tente novamente.");
            setLoading(false);
            onClose2();
            return;
        }
        localStorage.setItem('questoes_simulado_'+simulado.id, JSON.stringify(questions_simulado));
        localStorage.setItem('simulado_'+simulado.id, JSON.stringify(simulado));
        showAlert("Simulado carregado com sucesso!", "success");
        navigate('/test/'+simulado.id);
    }

    async function handleGenerateNewLista(materias: number[]) {
        setLoading(true);
        const questions_simulado = await generateNewLista(materias);
        if(questions_simulado === null || questions_simulado.length == 0){
            showAlert("Erro ao carregar o seu simulado.");
            showAlert("Por favor tente novamente.");
            setLoading(false);
            onClose2();
            return;
        }
        const simulado = await handlePostSimulado(questions_simulado, "automatico", 50);
        if(simulado === null){
            showAlert("Erro ao carregar o seu simulado.");
            showAlert("Por favor tente novamente.");
            setLoading(false);
            onClose2();
            return;
        }
        localStorage.setItem('questoes_simulado_'+simulado.id, JSON.stringify(questions_simulado));
        localStorage.setItem('simulado_'+simulado.id, JSON.stringify(simulado));
        showAlert("Simulado carregado com sucesso!", "success");
        navigate('/test/'+simulado.id);
    }

    return (
        <>
        {
            loading ? <LoadingScreen /> : <>
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
                                        onOpen3();
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

                    <Modal onClose={onClose3} isOpen={isOpen3} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Deseja iniciar uma lista de exercicios?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Listas de exercicios são personalizadas conforme você deseja, por favor selecione as opções da sua lista de exercicios abaixo:</p>
                        <AreaTree onActiveAreasChange={(materia) => {
                            setMateriasLista(materia);
                        }}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => {
                            handleGenerateNewLista(materiasLista);
                            onClose();
                            onOpen2();
                            
                        }}>Iniciar lista de exercicios</Button>
                        <Button onClick={onClose3}>Ainda não</Button>
                    </ModalFooter>
                    </ModalContent>
                    </Modal>
                </>
            }
        </>
    )
}

export default NewTest