import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { AppNavigator } from './components/navigator/AppNavigator'; 
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';               
import 'primeicons/primeicons.css';         
import 'primeflex/primeflex.css';                        

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <AppNavigator />
    </PrimeReactProvider>
  </React.StrictMode>
);

reportWebVitals();
