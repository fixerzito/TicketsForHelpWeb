import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { AppNavigator } from './components/navigator/AppNavigator';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';                  
import 'primeicons/primeicons.css';                                  
import 'primeflex/primeflex.css';                                   

const App: React.FC = () => {
  return (
    <PrimeReactProvider>
      <AppNavigator />
    </PrimeReactProvider>
  );
}

export default App;
