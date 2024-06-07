import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './components/GlobalStyles';
import { ProviderMusic } from './store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="816407556209-fv7dc8krd41j9ilnhqs6jk2vogp8fk6r.apps.googleusercontent.com">
            <GlobalStyle>
                <ProviderMusic>
                    <App />
                </ProviderMusic>
            </GlobalStyle>
        </GoogleOAuthProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
