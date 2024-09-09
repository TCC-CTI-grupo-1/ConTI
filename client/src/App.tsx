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
import { useState } from 'react';

//Middlewares
import Middleware from './middlewares/Middleware';


import { Routes, Route } from "react-router-dom"
import SimuladoFrame from './components/questions/simulado/FrameSimulado';


const showAlert = (message: string, 
    type?: 'error' | 'success' | 'warning' | 'info',
    description?: string) => {
  const alertBoxContainer = document.getElementById('alert-box-container');
  if (alertBoxContainer) {
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

    if(!debugging)
    {
        console.log = function(){}
    }

    const middleware = new Middleware();

    const [loading, setLoading] = useState(true);

    async function checkUser(){
        const user = await handleGetUser();
        localStorage.setItem('isLoggedIn', 'false');
        if(user)
        {
            localStorage.setItem('isLoggedIn', 'true');
            middleware.setIsUserLogged(true);
        }
        setLoading(false);
    }

    return (
        <div className='app' onLoad={checkUser}>
          <div id='alert-box-container'></div>
          { loading && false ? <div><h1>Carregando o literal fucking app</h1> {/* Re-inverter para true e descobrir pq o onload não funciona */}
          <p>Demorando muito? tente novamente:</p>
          <button onClick={checkUser}>TENTAR</button>
          </div> :
            <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='/newtest' element={ <NewTest /> } />
              <Route path='/login' element={ <User /> } />

              <Route path='/profile' element={middleware.routeToDisplay(['isLoggedIn'], <Profile />)} />
              <Route path='/history' element={middleware.routeToDisplay(['isLoggedIn'], <History />) } />

              <Route path='/alltests' element={ <AllTests /> } />   
              <Route path='/questions' element={<QuestionDatabase />} />
              <Route path='/questions/:id' element={<QuestionDatabase />} />
              <Route path='/test' element={<SimuladoFrame />} />
              <Route path='/simulado/:id' element={<SimuladoVer />} />
              <Route path='/adm' element={<Admnistrador />} />
            </Routes>
          }
        </div>
    );
}

export default App;
export { showAlert };