import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CheckListApp from './checkListApp/App';
//import NodeJSApp from './nodeJSApp/App';
import Login from './quizApp/Login';
import Main from './quizApp/Main';
import Menu from './Menu';
import RecordList from './quizApp/RecordList';
import registerServiceWorker from './registerServiceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./quizApp/store/index";
import {BrowserRouter, Link, Route} from 'react-router-dom'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>

                <Route exact path="/" component={Menu} />
                <Route exact path="/quizApp/" component={Login} />
                    <Route path="/quizApp/main" component={Main} />
                    <Route path="/quizApp/recordList" component={RecordList}/>
                <Route path="/checkListApp" component={CheckListApp}/>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
