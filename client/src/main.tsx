import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './home.scss'
import './about.scss'
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter basename={import.meta.env.VITE_BASENAME}>
        <ChakraProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ChakraProvider>
    </BrowserRouter>,
)
