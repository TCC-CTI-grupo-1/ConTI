import Navbar from "../Navbar"

const Home = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <div id="home" className="flex-container full-screen-size">
            <Navbar screen="home"/>
            <div className="container">
                <div className="header">
                    <h1>Home</h1>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                    
                    {
                        isLoggedIn ? (
                            <div>
                                <h2>Tela do cara logado</h2>
                            </div>
                        ) : (
                            <div>
                                <h2>Tela não-logado</h2>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
  )
}

export default Home