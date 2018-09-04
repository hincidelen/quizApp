import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function Welcome(props) {
    return <h1>Welcome {props.name} . </h1>
}
const element = <Welcome name="sarah"/>
ReactDOM.render(

    <App />,
    document.getElementById('root')
);
registerServiceWorker();
