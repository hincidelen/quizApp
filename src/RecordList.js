import React, {Component} from 'react';
import { connect } from 'react-redux';
//import { browserHistory } from 'react-router';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom'
import _ from 'lodash';
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import * as userRecordActions from "./store/actions/userRecordActions";
import Alert from "react-bootstrap/es/Alert";
import Dialog from 'react-bootstrap'
import ConfirmModal from "./ConfirmModal";
import Question from "./Question";
import ChoiceList from "./ChoiceList";
/*
const recordList = () => {
    return (
        <div >
            <h1 >About Me</h1>
        </div>
    );
}
export default recordList;*/

class RecordList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:"",
            ordered:[],
            link:"",
            key:-1,
            confirmModal:false,
            confirmed:{},
        };
    }
    componentDidMount() {
    }
    deleteUser(userKey, d_key){
        this.setState({
            confirmModal:true,
            confirmed:{type:"deleteUser", userKey:userKey, d_key:d_key},
        })
    }
     resetUsers(userKey){
         this.setState({
             confirmModal:true,
             confirmed:{type:"resetUsers", userKey:userKey},
         })
    }
    confirm(confirmed){
        if(confirmed){
            if(this.state.confirmed.type=="resetUsers")
                this.props.resetUsers({key:this.state.confirmed.userKey})
            else if(this.state.confirmed.type=="deleteUser")
                this.props.deleteUser({key:this.state.confirmed.userKey, deleteKey:this.state.confirmed.d_key})
        }
        this.setState({
            confirmed:{},
            confirmModal:false
        })
    }
    not(){}
    render() {
        var list=this.props.users.list||[];
        var size = 10;
        var ordered = (_.orderBy(list, ['record', 'key'], ['desc', 'asc']));
        let name = (this.props.location.search).slice(1);
        let link =  "/main?".concat(name);
        let index=_.find(this.props.users.list, { 'userName': name})||{};
        let userKey=index.key;
        return (
            <div style={{ height: 10, justifyContent: 'center'}}>
                <ConfirmModal type={this.state.confirmed} confirmAction={this.confirm.bind(this)} confirmState={this.state.confirmModal}  />
                <Button > <Link to={link}><h5>back</h5></Link></Button>
                <center>
                    <h2>Record List </h2>
                    {ordered.slice(0,size).map((d, idx) => {
                        return (
                            <ul  key={idx}>
                                <Button bsStyle="default">{d.record} - {d.userName} -{d.key} -</Button>
                                <Button bsStyle="secondary"
                                        onClick={() => this.deleteUser(userKey,d.key)} disabled={userKey || !d.key}>delete</Button>
                            </ul>)
                    })}
                    <Button bsStyle="danger" onClick={() => this.resetUsers(userKey)} disabled={userKey}>ResetUsers</Button>
                </center>
            </div>
        );
    }
}
const mapDispatchToProps = {
    resetUsers: (obj) => userRecordActions.resetUsers(obj),
    deleteUser: (obj) => userRecordActions.deleteUser(obj),
};

const mapStateToProps = (state) => ({
    users: state.users || {},
});

export default connect(mapStateToProps,mapDispatchToProps)(RecordList);