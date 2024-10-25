import { useState } from "react";
import Input from "../../Input";
import Options from "./Options";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import { handleLogin } from "../../../controllers/userController";
import { showAlert } from "../../../App";

interface Props {
  changeLoginPage: () => void;
}

const Login = ({ changeLoginPage }: Props) => {
  //Change URL
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  //Fetch options
  const [loading, setLoading] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  //A ideia e que, se for true, todos os inputs recebem as "caixinhas vermelhas" em volta,
  //E não só de e-mail e senha, pedindo para que o usuario preencha os outros valores
  const [isInputsValid, setIsInputsValid] = useState(false);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleLoginButtonClick() {
    //showAlert("Clicou", "success");
    if (email.length == 0 || password.length == 0) {
      setIsInputsValid(true);
      showAlert("Preencha todos os campos", "warning");
      return;
    } else {
      setLoading(true);
      const [loginSuccess, loginData] = await handleLogin(
        email,
        password,
        remember
      );
      setLoading(false);

      console.log(loginSuccess);
      if (loginSuccess) {
        showAlert("Login bem sucedido!", "success");
        console.log("L");
        localStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem('userId', loginData.user.id.toString());
        localStorage.setItem('username', loginData.user.name.toString());
        navigate("/");
        //refresh the page
        window.location.reload();
      } else {
        console.log("E");
        showAlert(loginData, "error");
      }
    }
  }

  //Ver se pode ficar na window

  return (
    <>
    <div
      id="inputArea"
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          handleLoginButtonClick();
        }
      }}
    >
      <Logo type={"login"} />

      <a
      onClick={() => {navigate("/")}}
      >Voltar ao home</a>

      <div id="inputs">
        {/*<button
          id="igorLogin"
          style={{ color: "red" }}
          onClick={async () => {
            await handleLogin("igor.z@unesp.br", "eq13B459", remember);
            navigate("/");
          }}
        >
          IGOR
        </button>*/}
        <Input
          name="email"
          label="Email"
          onChange={handleEmailChange}
          valid={isInputsValid ? email.length > 0 : undefined}
        />
        <Input
          name="password"
          label="Senha"
          onChange={handlePasswordChange}
          type="password"
          valid={isInputsValid ? password.length > 0 : undefined}
        />
      </div>

      <Options
        type={"login"}
        onClick={handleLoginButtonClick}
        changeScreen={changeLoginPage}
        loading={loading}
        onRemember={setRemember}
        forgorPasswordClick={onOpen}
      />
    </div>
    
      <Modal onClose={onClose} isOpen={isOpen} isCentered
      closeOnOverlayClick={false}
      >
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Esqueceu sua senha?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <h3>Digite seu e-mail abaixo</h3>
                        <p>Enviaremos um código para seu e-mail para a redefinição de senha</p>

                        <Input
                            name="email"
                            label="Email"
                            onChange={(e) => {
                              setForgotEmail(e.target.value);
                            }}
                            value={forgotEmail}
                            valid={undefined}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => {
                            onClose();

                        }}>Enviar código</Button>
                        <Button onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                    </ModalContent>
                    </Modal>

    </>
  );
};

/*<div className="center full-screen-size">
            <Background signin={!isLogin}/>
            
        </div>
*/

/*

{/*Botões do login /}

*/
export default Login;

<script src="https://apis.google.com/js/platform.js" async defer></script>