import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  Checkbox,
} from "@chakra-ui/react";
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

  const [options, setOptions] = useState<options>({
    ano: ["2024", "2023", "2022"],
    dificuldade: ["easy", "medium", "hard", "take-the-l"],
    disciplina: ["math", "port", "naturais", "humanas"],
    alreadyAnswered: false,
    mySimulations: false,
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
                      <MenuItemOption value="take-the-l">
                        Faz o L
                      </MenuItemOption>
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
                    Disciplina
                  </MenuButton>
                  <MenuList minWidth="240px">
                    <MenuOptionGroup
                      title="Disciplina"
                      type="checkbox"
                      onChange={(e) => {
                        handleSelectChange(e, "disciplina");
                      }}
                    >
                      <MenuItemOption value="math">Matemática</MenuItemOption>
                      <MenuItemOption value="port">Português</MenuItemOption>
                      <MenuItemOption value="naturais">
                        Ciências Naturais
                      </MenuItemOption>
                      <MenuItemOption value="humanas">
                        Ciências Humanas
                      </MenuItemOption>
                    </MenuOptionGroup>
                  </MenuList>
                </>
              )}
            </Menu>
          </div>
        </div>
        <div className="more-options">
          <p>Excluir questões:</p>
          <Checkbox
            onChange={(e) => {
              setOptions({ ...options, alreadyAnswered: e.target.checked });
            }}
          >
            De meus simulados
          </Checkbox>
          <Checkbox
            onChange={(e) => {
              setOptions({ ...options, mySimulations: e.target.checked });
            }}
          >
            Já respondidas
          </Checkbox>
          <Button
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
          </Button>
        </div>
        <div className="buttons">


          <Button colorScheme="blue" variant={"solid"} size={"lg"}
          onClick={
            handleGetFilteredQuestions
          }>
            Aplicar filtros
          </Button>


          <p>ou</p>
          <Button
            colorScheme="gray"
            variant={"outline"}
            size={"lg"}
            onClick={() => {
              navegate("/alltests");
            }}
          >
            Ver todas as provas
          </Button>
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
  );
};

export default Filters;
