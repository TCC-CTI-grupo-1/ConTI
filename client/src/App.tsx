import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AlertBox from './components/AlertBox';
import InputArea from './components/user/InputArea';


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

  // const [backendData, setBackendData] = useState([{ }]);
  // useEffect(() => {
  //   fetch('/signup')
  //     .then((response: any) => response.json()).then(data => {
  //       setBackendData(data);
  //     }
  //   )
  // }, []);

  return (
    <>
      <div id="alert-box-container" className="alert-box-container"></div>
      <InputArea />
    </>
  );
}

export default App;
export { showAlert };