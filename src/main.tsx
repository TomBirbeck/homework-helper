import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/components/App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { Auth0Provider } from "@auth0/auth0-react";
const appDomain: string = (import.meta.env.VITE_DOMAIN as string)
const client: string = (import.meta.env.VITE_CLIENTID as string)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
  <Auth0Provider
    domain = {appDomain}
    clientId= {client}
    redirectUri={window.location.origin}
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>
  </BrowserRouter>
)
