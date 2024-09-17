import Navbar from '../Navbar'

const AboutUs = () => {
  return (
    <div id="home" className="flex-container full-screen-size">
            <Navbar screen="aboutUs"/>
            <div className="container">
                <div className="header">
                    <h1>Sobre nós</h1>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                    <h1>Sobre nós</h1>
                    <h1>*Informações sobre a equipe*</h1>
                </div>
            </div>
        </div>
  )
}

export default AboutUs