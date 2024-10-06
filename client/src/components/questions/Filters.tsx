import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import LocalButton from "../Button";
import { showAlert } from "../../App";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questionInterface, areaInterface, respostaInterface } from "../../controllers/interfaces";
import { questionFilters as options } from "../../controllers/interfaces";
import { handleGetFilteredQuestions} from "../../controllers/questionController";
import {handleGetAreasMap } from "../../controllers/areasController";
import { handleGetAnswersByQuestionsIds } from "../../controllers/answerController";
import QuestionBox from "./QuestionBox";
import AreaTree from "../AreaTree";

const Filters = () => {
  const navegate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const anos:number[] = [];
  const dificuldade:string[] = [];

  const [options, setOptions] = useState<options>({
    ano: anos,
    dificuldade: dificuldade,
    disciplina: [],
    alreadyAnswered: false,
    myMockTests: false,
    //mySimulations: false,
  });

  function handleSelectChange(
    e: any,
    option: "ano" | "dificuldade" | "disciplina"
  ) {
    let newOptions = options;
    console.log("Alterando n sei oq é isso");
    console.log(e);
    newOptions[option] = e;
    if(e.length === 0){
      switch(option){
        case "ano":
          newOptions[option] = anos;
          break;
        case "dificuldade":
          newOptions[option] = dificuldade;
          break;
        case "disciplina":
          newOptions[option] = [];
          break;
      }
    }

    if(option == "ano"){
      //converter 'e' de ['2024', '2023'] para [2024, 2023]
      newOptions[option] = e.map((element: string) => {
        return parseInt(element);
      });
    }

    
    console.log(newOptions);
    setOptions(newOptions);
  }

  const [filteredQuestions, setFilteredQuestions] = useState<{
    question: questionInterface;
    answers: respostaInterface[];
  }[]>([]);

  async function handleGetFilteredQuestionsLocal(){
    setLoading(true);
    console.log(options);
    
    let newFilteredQuestions:{
      question: questionInterface;
      answers: respostaInterface[];
    }[] = []

    let questions = await handleGetFilteredQuestions(options);

    console.log("Questões: ");
    console.log(questions);

    let questionIds: number[] = [];

    questions.forEach((question) => {
      questionIds.push(question.id);
    });
  
    let answers = await handleGetAnswersByQuestionsIds(questionIds);

    console.log("Respostas: ");
    console.log(answers);

    if(questions === null || answers === null){
      showAlert("Erro ao carregar questões");
      return;
    }

    questions.forEach((question) => {
      let respostas = answers.filter((a) => a.question_id === question.id);
      newFilteredQuestions.push({question, answers: respostas});
    });

    setFilteredQuestions(newFilteredQuestions);
    setLoading(false);
  }
  
  const [loading, setLoading] = useState(true);

  async function handleAreasMap(){
    const areasMap = await handleGetAreasMap();

    if(Object.keys(areasMap).length === 0){
        showAlert("Erro ao carregar areas");
        return;
    }

    setAreas(areasMap);
    setLoading(false);
  }

  useEffect(() => {
    handleAreasMap();
    handleGetFilteredQuestionsLocal();
  }, []);

  const [areas, setAreas] = useState<{[id: number]: areaInterface}>({});

  return (
    <>
    <div id="questions">
      <div className="filters box">
        <h3 onClick={() => {
          console.log(areas);
        }}>Filtros</h3>
        <div className="options">
            <div>
            <Menu closeOnSelect={false}>
              {({ isOpen }) => (
              <>
              <MenuButton
              as={Button}
              colorScheme={isOpen ? "blue" : "gray"}
              rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              >
              Ano
              </MenuButton>
              <MenuList minWidth="240px">
              <MenuOptionGroup
                title="Ano"
                type="checkbox"
                onChange={(e) => {
                console.log(e);
                handleSelectChange(e, "ano");
                }}
                value={options.ano.map(String)} // Ensure the selected values are reflected
              >
                {
                //map from 2008 - 2024
                Array.from({length: 17}, (_, i) => 2008 + i).map((element) => {
                return (
                <MenuItemOption key={element} value={element.toString()}>{element}</MenuItemOption>
                );
                })
                }
              </MenuOptionGroup>
              </MenuList>
              </>
              )}
            </Menu>
            </div>

            <div>
            <Menu closeOnSelect={false}>
              {({ isOpen }) => (
              <>
                <MenuButton
                as={Button}
                colorScheme={isOpen ? "blue" : "gray"}
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                >
                Dificuldade
                </MenuButton>
                <MenuList minWidth="240px">
                <MenuOptionGroup
                  title="Dificuldade"
                  type="checkbox"
                  onChange={(e) => {
                  handleSelectChange(e, "dificuldade");
                  }}
                  value={options.dificuldade} // Ensure the selected values are reflected
                >
                  <MenuItemOption value="facil">Fácil</MenuItemOption>
                  <MenuItemOption value="medio">Médio</MenuItemOption>
                  <MenuItemOption value="dificil">Difícil</MenuItemOption>
                </MenuOptionGroup>
                </MenuList>
              </>
              )}
            </Menu>
            </div>

          <div>
            <Button
            onClick={onOpen}><span>Selecionar disciplina</span></Button>
          </div>
        </div>
        <div className="more-options">

          {/*
          <p>Excluir questões:</p>
          <Checkbox
            onChange={(e) => {
              setOptions({ ...options, alreadyAnswered: e.target.checked });
            }}
          >
            De meus simulados
          </Checkbox>*/
          }
          <Checkbox
            onChange={(e) => {
              setOptions({ ...options, alreadyAnswered: e.target.checked });
            }}
          >
            Já respondidas
          </Checkbox>
          

          <LocalButton
            colorScheme="red"
            variant={"outline"}
            onClick={() => {
              setOptions({
                ano: anos,
                dificuldade: dificuldade,
                disciplina: [],
                alreadyAnswered: false,
                myMockTests: false,
                //mySimulations: false,
              });
              showAlert("Filtros limpos", "success");
            }}
          >
            Limpar filtros
          </LocalButton>
        </div>
        <div className="buttons">


          <LocalButton colorScheme="blue" variant={"solid"}
          onClick={
            handleGetFilteredQuestionsLocal
          }>
            Aplicar filtros
          </LocalButton>


          <p>ou</p>
          <LocalButton
            colorScheme="gray"
            variant={"outline"}
            onClick={() => {
              navegate("/alltests");
            }}
          >
            Ver todas as provas
          </LocalButton>
        </div>
      </div>
      <div className="results">
        <div className="header box">
          <h3>Resultados</h3>
          <p>
            {filteredQuestions.length === 0
              ? "Nenhuma questão encontrada com os filtros selecionados"
              : filteredQuestions.length + " questões encontradas"}
          </p>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Ordenar por:
            </MenuButton>
            <MenuList>
              <MenuItem>Ordem alfabética</MenuItem>
              <MenuItem>Difículdade</MenuItem>
              <MenuItem>Não sei acentuar</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="content">
          {loading ? (
            <h2>Carregando...</h2>
          ) : (
            filteredQuestions.map((object, index) => {
              return areas[object.question.area_id] ? (<QuestionBox
                key={index}
                question={object.question}
                area={areas[object.question.area_id]}
                answers={object.answers}
                />) : <p>Area da questão {object.question.id} não encontrada</p>;
            })
          )}  
        </div>
      </div>
    </div>

    <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selecione uma ou mais areas para o filtro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <AreaTree onActiveAreasChange={(areas) => {
             console.log(areas);
             setOptions({...options, disciplina: areas});
            }}/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Filters;
