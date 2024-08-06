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
  useDisclosure
} from "@chakra-ui/react";
import LocalButton from "../Button";
import { showAlert } from "../../App";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Question from "./QuestionBox";
import { useNavigate } from "react-router-dom";
import { questionInterface } from "../../controllers/interfaces";
import { questionFilters as options } from "../../controllers/interfaces";
import { handleGetQuestions } from "../../controllers/userController";

const Filters = () => {
  const navegate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [options, setOptions] = useState<options>({
    ano: [2024, 2023, 2022],
    dificuldade: ["easy", "medium", "hard", "take-the-l"],
    disciplina: ["math", "port", "naturais", "humanas"],
    alreadyAnswered: false,
    //mySimulations: false,
  });

  function handleSelectChange(
    e: any,
    option: "ano" | "dificuldade" | "disciplina"
  ) {
    let newOptions = options;
    newOptions[option] = e;
    console.log(newOptions);
    setOptions(newOptions);
  }

  const [filteredQuestions, setFilteredQuestions] = useState<
    questionInterface[]
  >([]);

  function handleGetFilteredQuestions(){
    setLoading(true);
    console.log(options);
    handleGetQuestions(options).then((questions) => {
      setFilteredQuestions(questions);
      setLoading(false);
    });
  }
  
  const [loading, setLoading] = useState(false);

  return (
    <>
    <div id="questions">
      <div className="filters box">
        <h3>Filtros</h3>
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
                        //console.log(e);
                        handleSelectChange(e, "ano");
                      }}
                    >
                      <MenuItemOption value="2024">2024</MenuItemOption>
                      <MenuItemOption value="2023">2023</MenuItemOption>
                      <MenuItemOption value="2022">2022</MenuItemOption>
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
                    >
                      <MenuItemOption value="easy">Fácil</MenuItemOption>
                      <MenuItemOption value="medium">Médio</MenuItemOption>
                      <MenuItemOption value="hard">Difícil</MenuItemOption>
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
              showAlert("Faz o L");
              showAlert(
                "Isso aqui eventualmente vai limpar os filtros",
                "warning"
              );
            }}
          >
            Limpar filtros
          </LocalButton>
        </div>
        <div className="buttons">


          <LocalButton colorScheme="blue" variant={"solid"}
          onClick={
            handleGetFilteredQuestions
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
            filteredQuestions.map((question, index) => {
              return <Question key={index} question={question} />;
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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>TESTEETETSTEE</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Filters;
