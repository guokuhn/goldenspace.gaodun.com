import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { StoreContext, rootStore } from './stores'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={rootStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContext.Provider>
  </React.StrictMode>,
)

