import { createRoot } from 'react-dom/client';
import AlertBox from './components/AlertBox';
import QuestionDatabase from './components/questions/QuestionDatabase';

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

    return (
        <div className='app'>
          <QuestionDatabase />
        </div>
    );
}

export default App;
export { showAlert };