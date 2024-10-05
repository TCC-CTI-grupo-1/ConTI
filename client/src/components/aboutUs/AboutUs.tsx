import Navbar from '../Navbar'
import Background from '../user/Background'
import '../../about.scss';

const AboutUs = () => {
  return (
    <div id="home" className="flex-container full-screen-size">
            <Navbar screen="aboutUs"/>
            <div className="container">
                <Background variant='white'/>
                <div className="header">
                    <h1>Sobre nós</h1>
                    <h3>Conheça mais sobre o projeto e seus desenvolvedores</h3>
                </div>
                <div className="inversed-border"></div>
                <div className="content aboutUs">

                    <div className="desenvolvedores">
                      <div className='dev_img'>
                      <h1>Desenvolvedores</h1>
                      </div>
                      
                       <div className="dev-container">
                              <img src="../public/equipe.jpg" alt="Imagem da equipe" className="rounded-image" />
                              <h3>Somos uma equipe de estudantes apaixonados por tecnologia e educação.
                                 Criamos o ConTI com o objetivo de utilizar nossas habilidades para facilitar o acesso ao 
                                ensino de qualidade. Acreditamos que, ao unir tecnologia e educação, podemos causar 
                                um impacto positivo na vida de muitos jovens. Cada um de nós traz diferentes 
                                conhecimentos e experiências, mas todos compartilhamos a mesma visão de tornar 
                                a educação acessível e democrática para todos.</h3>
                        </div>
                        <h4 >&nbsp;&nbsp;&nbsp;&nbsp;Janaína, Aléxia, Mariana, Igor, Mateus, Gabriel e Fernando</h4>
                    
                        </div>

                    <br></br>
                    <h1>O Projeto</h1>

                    <div className='projeto'>
                      <h3>O ConTI nasce do desenvolvimento de um trabalho de conclusão de curso de informática. 
                      Sua ideia central é democratizar o conhecimento, tornando o acesso ao cursinho preparatório 
                      para o vestibulinho do Colégio Técnico Industrial Prof. Isaac Portal Roldan acessível a todos,
                       independente de condições socioeconômicas. Valorizamos a instituição e acreditamos na 
                       importância de oferecer oportunidades educacionais para todos os interessados.</h3>
                    </div>

                    <br></br>

                    <div className='visao'>
                      <h2>Visão</h2>
                      <h3>Reconhecimento nacional como plataforma estudantil para preparação de vestibulares em
                      geral e o vestibulinho do Colégio Técnico Industrial Prof Isaac Portal Roldán.</h3>
                    </div>

                    <br></br> 

                    <div className='missao'>
                      <h2>Missão</h2>
                      <h3>Proporcionar o acesso a uma plataforma de estudos para auxiliar os estudos do aluno que
                      deseja ingressar no Colégio Técnico Industrial Prof Isaac Portal Roldán.</h3>
                    </div>        
                </div>
            </div>
        </div>
  )
}

export default AboutUs