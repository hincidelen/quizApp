import React, { Component } from 'react';

import Question from "./Question";
import ChoiceList from "./ChoiceList";
import Score from "./Score";
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

import { connect } from 'react-redux';
import * as recordActions from './store/actions/recordActions';
import * as userRecordActions from './store/actions/userRecordActions';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom'
import _ from 'lodash';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {results: [{}]},
            choice:null,
            choices:null,
            isClicked:true,
            score:0,
            record:0,
            key:-1,
            userName:"",
            user:null,
            list:[],
            questionNo:0,
        };
    }

    reset(){
        this.setState({
            score:0
        })
        this.fetchData();
    }

    componentDidMount() {
        let link = (this.props.location.search).slice(1);
        let ss=link.split("&")||[];
        let name=ss[0].slice(5);
        let isadmin=(ss[1].slice(8)==='true');
        console.log(name," ",isadmin,)
        if(name==""){
            console.log("dur")
            this.props.history.push('/quizApp');
        }
        else{
            this.setName(name,isadmin);
            this.fetchData().then(() => {
            });
        }
    }
     fetchData() {
        if(this.state.isClicked){
            return fetch('https://opentdb.com/api.php?amount=1')//('http://127.0.0.1:3002/quiz')//https://opentdb.com/api.php?amount=1
                .then(response => response.json())
                .then(newData => {
                    console.log(newData,newData.results.length);
                    var questionNo = Math.floor(Math.random() * newData.results.length);
                    this.setState({ data: newData, questionNo:questionNo});
                    let incorrects = this.state.data.results[questionNo].incorrect_answers||[];
                    let correct = this.state.data.results[questionNo].correct_answer||"";
                    let choices= [...incorrects, correct];
                    let sh=this.shuffle(choices);
                    this.setState({ choice:null,choices:sh,isClicked:false});
                });
        }
    }

    chooseAnswer(dataFromChild) {
        if(!this.state.isClicked){
            this.setState({ choice: dataFromChild, isClicked:true });
            if(dataFromChild===this.state.data.results[this.state.questionNo].correct_answer)
                this.correct();
            else
                this.incorrect();
        }//this.props.load();
    }

    correct() {
        let record=this.props.users.list[this.state.key]||{}
        if(this.state.score+1>record.record){
            /*this.setState({
                record:this.state.score+1
            })*/
            this.props.updateUserRecord({key:this.state.key,record:this.state.score+1});
        }
        this.setState({
            score:this.state.score+1
        })
    }

    incorrect(){
        this.setState({
            score:0,
        })
    }

    shuffle(arr) {
            var i,
                j,
                temp;
            for (i = arr.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        return arr;
    };
    setName(name,isadmin){
        if(name!=""){
            let index=_.find(this.props.users.list, { 'userName': name});

            console.log("iii",index,name,this.state.list);
            if(!index){//newuser

                let newUser = {userName:name, record:0, isadmin:isadmin};
                let item=this.props.createNewUser(newUser);
                index=newUser;
            }
            var key = this.props.users.list.indexOf(index);
            this.setState({
                list:this.props.users.list,
                key:key,
                userName:index.userName,
                record:index.record
            });
        }
    }
    render() {
        let {data} = this.state;
        let results=data.results;
        let link = 'recordList?'.concat(this.state.userName)
        return (
            <div style={{ height: 10 }}>

                <p>{this.state.userName} : {this.state.key}</p>
                <Modal.Header style={{justifyContent: 'space-evenly'}}>

                        <Score userKey={this.state.key} point={this.state.score} next={this.fetchData.bind(this)}/>
                    </Modal.Header>
                <Modal.Body style={{justifyContent: 'space-evenly'}}>
                        <Question  type= {results[this.state.questionNo].type } question= {results[this.state.questionNo].question }/>
                        <ChoiceList  isClicked={this.state.isClicked} choices={this.state.choices}
                                     chooseAnswer={this.chooseAnswer.bind(this)} answer= {results[this.state.questionNo].correct_answer } />
                    </Modal.Body>
                <Modal.Footer  style={{justifyContent: 'center'}}>
                        <Button bsStyle="secondary" onClick={() => this.reset()}>Reset</Button>
                        <Button bsStyle="secondary" onClick={() => this.fetchData()}>Next</Button>
                </Modal.Footer>
                <Link to= {link}><h5>Record List</h5></Link>
                <Link to= "/quizApp"><h5>Log out</h5></Link>
            </div>
        );
    }
}

const mapDispatchToProps = {
    update_record: (obj) => recordActions.updateRecord(obj),
    resetRecord: (obj) => recordActions.resetRecord(obj),
    updateUserRecord: (obj) => userRecordActions.updateUserRecord(obj),
    createNewUser: (obj) => userRecordActions.createNewUser(obj),
    resetUsers: (obj) => userRecordActions.resetUsers(obj),

};

const mapStateToProps = (state) => ({
    score: state.score || {},
    record: state.record || {},
    users: state.users || {},
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);









