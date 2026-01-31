# ConTI

## Descrição
O ConTI é uma aplicação web que visa democratizar o acesso ao ensino ao facilitar a entrada de alunos no vestibulinho do Colégio Técnico Industrial de Bauru, um colégio público de excelência da Unesp. Por meio de um algoritmo que personaliza os simulados para os alunos e uma interface intuitiva, o ConTI ajuda na preparação de alunos que queiram ingressar no colégio.

## Índice
- [Instalação](#instalação)
- [Uso](#uso)
- [Licença](#licença)

## Instalação
**1. Instalando o Node.js**

  Primeiro, abra o site https://nodejs.org/en e clique no botão Download Node.js (LTS).
  Após o download dê execute o .msi baixado.
  Clique em “Aceitar os termos” e “próximo”
  Clique para instalar as ferramentas necessárias (checkbox), isso irá abrir um executável do PowerShell, apenas deixe-o instalando as ferramentas por um tempo e feche após novas mensagens pararem de aparecer. (atenção que em determinada parte da instalação demora um pouco, porém, não feche ainda. Leia as mensagens, o programa te avisa quando isso irá acontecer).
  Para ver se a instalação foi um sucesso, abra um prompt de comando e digite node -v
  Caso ele retorne “node não é reconhecido como um programa interno ou externo…” alguma parte do processo falhou, caso isso ocorra, você pode seguir esse guia: [LINK NÃO EXISTE]

**2. Instalando o Git.**

Para fazer um clone do projeto localmente na sua máquina, é necessário ter o git baixado, o software GitHub Desktop pode ajudar caso você não deseje executar todos os processos pelo terminal.
Para baixar o Git abra o link: https://git-scm.com/downloads/win e baixe o executável de 32 ou 64 bits, dependendo da sua máquina. Siga todas as instruções do instalador e caso ele peça um editor de texto padrão para o git, selecione o Visual Studio Code, pois é mais fácil trabalhar usando ele do que o Vim (caso você já seja experiente ou deseje usar o Vim não há problema).
Caso deseje baixar o GitHub Desktop também basta executar o instalador e abrir o software.
**3. Clonando o repositório**
	Após ter baixado o git, o que resta é clonar o software e executá-lo. Para clonar, abra seu prompt de comando, na pasta que você deseja clonar (mkdir “nome_da_pasta” e depois cd “nome_da_pasta” caso deseje criar uma pelo terminal), execute a série de comandos:
 
  ``git init``
  
  ``git remote add origin https://github.com/TCC-CTI-grupo-1/ConTI.git``
  
  ``git pull origin master``
  
  Ou, então, você pode clonar o repositório com o comando git clone, como mostrado no [tutorial](https://www.alura.com.br/artigos/clonando-repositorio-git-github).
  Assim, você terá instalado todas as dependências do projeto, tanto para o frontend, quanto para o backend. 

## Uso
Após ter clonado o repositório com sucesso, você verá duas principais pastas: /server e /client. (os demais arquivos que não estão dentro de nenhuma pasta são arquivos que foram usados para obter as questões, mas não tem uso prático agora).
Em ambas as pastas, há um arquivo que deverá ser criado o arquivo .env usando o arquivo .env.example já existente, e preencher com as informações que você irá utilizar.

(No frontend, o .env apenas diz em qual pasta o seu servidor estará dentro (VITE_BASENAME), como você vai executar em localhost, o basename é a própria pasta root: ‘/’, e outra informação que ele utiliza é qual o ip do seu backend, como estaremos em localhost também, o ip será http://localhost:3000.)

(No backend, preencha com as informações do seu banco de dados a ser utilizado e do seu servidor Redis (usado para o armazenamento da sessão, ler mais na seção 4.1.2.), no console do backend também de o comando npx prisma generate).
	Em ambas as pastas, o seguinte passo a passo deverá ser feito:
  
  ``cd client ou cd server``
  
  ``npm i``
  
  ``npm run dev``
  
  (Cada um em seu próprio terminal no VScode, abra dois)
  O cliente será executado em http://localhost:5173 e o backend em http://localhost:3000.

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](https://github.com/TCC-CTI-grupo-1/ConTI/blob/master/LICENSE) para mais detalhes.
