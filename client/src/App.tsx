import { createRoot } from 'react-dom/client';
import AlertBox from './components/AlertBox';
import User from './components/user/login/User';
import Home from './components/home/Home';
import Profile from './components/user/profile/Profile';
import History from './components/history/History';
import SimuladoVer from './components/questions/simulado/VerSimulado';
import QuestionDatabase from './components/questions/QuestionDatabase';
import AllTests from './components/questions/AllTests';
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

    return (
        <div className='app'>
        <div id='alert-box-container'></div>
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <User /> } />
            <Route path='/profile' element={ <Profile /> } />
            <Route path='/history' element={ <History /> } />
            <Route path='/alltests' element={ <AllTests /> } />   
            <Route path='/questions' element={<QuestionDatabase />} />
            <Route path='/questions/:id' element={<QuestionDatabase />} />
            <Route path='/test' element={<SimuladoFrame questionsList={[1,2,3,4,5]}/>} />
            <Route path='/simulado/:id' element={<SimuladoVer />} />
        </Routes>
        </div>
    );
}

export default App;
export { showAlert };