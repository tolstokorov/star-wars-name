import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import store from './store';

ReactDOM.render(
    <StrictMode>
        <Provider store={ store } >
            <App startInputValue={ 4 }/>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);

