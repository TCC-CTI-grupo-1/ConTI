import { createRoot } from 'react-dom/client';
import AlertBox from './components/AlertBox';
import User from './components/user/login/User';
import Home from './components/home/Home';
import Profile from './components/user/profile/Profile';
import History from './components/history/History';
import SimuladoVer from './components/questions/simulado/VerSimulado';
import QuestionDatabase from './components/questions/QuestionDatabase';
import AllTests from './components/questions/AllTests';
import NewTest from './components/newtest/NewTest';
import Admnistrador from './components/Administrador';
import { handleGetUser } from './controllers/userController';
import { useEffect, useState } from 'react';
import AboutUs from './components/aboutUs/AboutUs';


//Middlewares
import Middleware from './middlewares/Middleware';


import { Routes, Route } from "react-router-dom"
import SimuladoFrame from './components/questions/simulado/FrameSimulado';

const showAlert = (message: string, 
    type?: 'error' | 'success' | 'warning' | 'info',
    description?: string) => {
  const alertBoxContainer = document.getElementById('alert-box-container');
  if (alertBoxContainer) {
    //if(type==='error' || type==='warning') return;
    const alertBox = document.createElement('div');
    alertBoxContainer.appendChild(alertBox);
    createRoot(alertBox).render(<AlertBox message={message} type={type} description={description} />);
    setTimeout(() => {
      alertBox.remove();
    }, 5000);
  }
};

function App() {


    const debugging = true;

    if(!debugging) console.log = function(){}
    

    const middleware = new Middleware();

    const [loading, setLoading] = useState(true);

    async function checkUser(){
        const user = await handleGetUser();
        localStorage.setItem('isLoggedIn', 'false');
        if(user)
        {
            localStorage.setItem('isLoggedIn', 'true');
        }
        setLoading(false);
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <div className='app'>
          <div id='alert-box-container'></div>
          { loading && false ? <div><h1>Carregando o literal fucking app</h1> {/* Re-inverter para true e descobrir pq o onload não funciona */}
          <p>Demorando muito? tente novamente:</p>
          <button onClick={checkUser}>TENTAR</button>
          </div> :
              <Routes>
                  <Route path='/' element={ <Home /> } />
                  <Route path='/newtest' element={middleware.routeToDisplay(['isLoggedIn'], <NewTest />)} />
                  <Route path='/login' element={ <User /> } />

                  <Route path='/aboutUs' element={<AboutUs />} />
                  <Route path='/profile' element={middleware.routeToDisplay(['isLoggedIn'], <Profile />)} />
                  <Route path='/history' element={middleware.routeToDisplay(['isLoggedIn'], <History />) } />

                  <Route path='/alltests' element={ <AllTests /> } />   
                  <Route path='/questions' element={<QuestionDatabase />} />
                  <Route path='/questions/:id' element={<QuestionDatabase />} />
                  <Route path='/test' element={<SimuladoFrame />} />
                  <Route path='/simulado/:id' element={<SimuladoVer />} />
                  <Route path='/adm' element={<Admnistrador />} />
                  <Route path='/aboutUs' element={<AboutUs />} />
                </Routes>
          }
        </div>
    );
}

export default App;
export { showAlert };