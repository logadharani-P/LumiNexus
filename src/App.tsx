import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LumiProvider } from './context/LumiContext';
import AppRoutes from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <LumiProvider>
        <AppRoutes />
      </LumiProvider>
    </BrowserRouter>
  );
}

export default App;
