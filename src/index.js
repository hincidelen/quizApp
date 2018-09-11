import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import RecordList from './RecordList';
import registerServiceWorker from './registerServiceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
            <Route exact path="/" component={Main} deneme="dsadad" />
            <Route path="/recordList" component={RecordList}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
