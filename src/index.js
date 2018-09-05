import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(

    <Main />,
    document.getElementById('root')
);
registerServiceWorker();
