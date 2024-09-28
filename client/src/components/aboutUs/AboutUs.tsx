import Navbar from '../Navbar'

const AboutUs = () => {
  return (
    <div id="home" className="flex-container full-screen-size">
            <Navbar screen="aboutUs"/>
            <div className="container">
                <div className="header">
                    <h1>Sobre nós</h1>
                    <p>Conheça mais sobre o projeto e seus desenvolvedores</p>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                    <h1>O Projeto</h1>
                    <p>O ConTI nasce do desenvolvimento de um trabalho de conclusão de curso de informática. Sua ideia central é democratizar o conhecimento, tornando o acesso ao cursinho preparatório para o vestibulinho do Colégio Técnico Industrial Prof. Isaac Portal Roldan acessível a todos, sem distinção de condições financeiras. Valorizamos a instituição e acreditamos na importância de oferecer oportunidades educacionais para todos os interessados.</p>
                    <h1>Visão</h1>
                    <p>Reconhecimento nacional como plataforma estudantil para preparação de vestibulares em geral e o vestibulinho do Colégio Técnico Industrial Prof Isaac Portal Roldán.</p>
                    <h1>Missão</h1>
                    <p>Proporcionar o acesso a uma plataforma de estudos para auxiliar os estudos do aluno que deseja ingressar no Colégio Técnico Industrial Prof Isaac Portal Roldán.</p>
                    <h1>Desenvolvedores</h1>
                    <img src="../public/equipe.jpg" alt="Imagem da equipe"></img>
                    <p>Somos uma equipe de estudantes apaixonados por tecnologia e educação. Criamos o ConTI com o objetivo de utilizar nossas habilidades para facilitar o acesso ao ensino de qualidade. Acreditamos que, ao unir tecnologia e educação, podemos causar um impacto positivo na vida de muitos jovens. Cada um de nós traz diferentes conhecimentos e experiências, mas todos compartilhamos a mesma visão de tornar a educação acessível e democrática para todos.</p>
                </div>
            </div>
        </div>
  )
}

export default AboutUs