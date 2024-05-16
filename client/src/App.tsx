import { createRoot } from 'react-dom/client';
import AlertBox from './components/AlertBox';
import User from './components/user/login/User';
import Profile from './components/user/profile/Profile';

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


  return (
    <>
      <div id="alert-box-container" className="alert-box-container"></div>
      <Profile />
      <div className="bottom-popup">
        
      </div>
    </>
  );
}

export default App;
export { showAlert };