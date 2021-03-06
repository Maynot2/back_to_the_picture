import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import Albums from "./components/Albums/Index";
import About from "./components/About/About.Component"

const redirectUrl =`${process.env.NODE_ENV === "production" ? "https://backtothepicture.me" : "http://localhost:3000"}`

ReactDOM.render(
  <React.StrictMode>
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={redirectUrl}
  >
    <BrowserRouter >
      <Switch>
            <Route exact path="/">
              <App />
            </Route>
            
            <Route path="/album/:id" render={(props) => {
              return <Albums id={props.match.params.id}/>;
              }
            } > 
            </Route>
            <Route path="/about">
              <About />
            </Route >
        </Switch>
    </BrowserRouter>
  </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
