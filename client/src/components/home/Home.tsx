import Navbar from "../Navbar"

const Home = () => {
  return (
    <div id="home" className="flex-container full-screen-size">
            <Navbar screen="home"/>
            <div className="container">
                <div className="header">
                    <h1>Home</h1>
                </div>
                <div className="inversed-border"></div>
                <div className="content">
                    <h1>Home</h1>
                </div>
            </div>
        </div>
  )
}

export default Home