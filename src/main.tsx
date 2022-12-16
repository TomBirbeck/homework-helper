import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/components/App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
  <Auth0Provider
    // domain = {process.env.REACT_APP_DOMAIN || ''}
    domain = 'dev-lx7674qo.us.auth0.com'
    // clientId= {process.env.REACT_APP_CLIENT_ID || ''}
    clientId='rDPBbAIGhSW2tW0EWMvzTUlbIWck8KvT'
    redirectUri={window.location.origin}
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>
  </BrowserRouter>
)
