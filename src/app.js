import React from 'react';
import ReactDOM from 'react-dom';
import './styleSheets/bootstrap.min.css'
import './styleSheets/style.scss'
import { Provider } from 'react-redux'
import store from './store/configStore'
import App from './index'


const MainApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(<MainApp />, document.getElementById('root'));
