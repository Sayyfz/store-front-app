import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.scss';
import './styles/App.scss';
import AppContainer from './AppContainer';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Router>
            <AppContainer>
                <App />
            </AppContainer>
        </Router>
    </Provider>,
);
