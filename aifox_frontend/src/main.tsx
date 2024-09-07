import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import reduxStore from './store/index.ts';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter><App /></BrowserRouter>
    </Provider>
  </StrictMode >,
)
