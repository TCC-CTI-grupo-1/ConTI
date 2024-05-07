import { createRoot } from 'react-dom/client';
import AlertBox from './components/AlertBox';
import User from './components/user/User';


const showAlert = (message: string) => {
  const alertBoxContainer = document.getElementById('alert-box-container');
  if (alertBoxContainer) {
    const alertBox = document.createElement('div');
    alertBoxContainer.appendChild(alertBox);
    createRoot(alertBox).render(<AlertBox message={message} />);
    setTimeout(() => {
      alertBox.remove();
    }, 5000);
  }
};

function App() {


  return (
    <>
      <div id="alert-box-container" className="alert-box-container"></div>
      <User />
    </>
  );
}

export default App;
export { showAlert };