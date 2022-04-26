import React from 'react';
import GlobalProvider from './modules';
import MainPage from './pages';
import { GlobalStyles } from './styles/global';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <GlobalStyles />
        <MainPage />
      </GlobalProvider>
    </div>
  );
}

export default App;
