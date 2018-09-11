import React, { Component } from 'react';

import Question from "./Question";
import ChoiceList from "./ChoiceList";
import Score from "./Score";
import Login from "./Login";
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

import { connect } from 'react-redux';
import * as scoreActions from './store/actions/scoreActions';
import * as recordActions from './store/actions/recordActions';
import * as userRecordActions from './store/actions/userRecordActions';
import recordList from './RecordList';
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
            key:0,
            userName:"",
            user:null,
            list:[]
        };
    }

    reset(){
        //this.props.resetScore();
        //this.props.resetRecord();
        this.setState({
            score:0
        })
        //this.props.updateUserRecord({key:this.state.key,record:-1});
        this.fetchData();
    }

    componentDidMount() {
    /*this.setState({
        userName:""
    });*/
        this.fetchData().then(() => {
        });
    }

     fetchData() {
        if(this.state.isClicked){
            return fetch('https://opentdb.com/api.php?amount=1')
                .then(response => response.json())
                .then(newData => {
                    this.setState({ data: newData});
                    let choices= [...this.state.data.results[0].incorrect_answers, this.state.data.results[0].correct_answer];
                    let sh=this.shuffle(choices);
                    this.setState({ choice:null,choices:sh,isClicked:false});
                    console.log(this.state.data.results[0].correct_answer)
                });
        }
    }

    chooseAnswer(dataFromChild) {
        if(!this.state.isClicked){
            this.setState({ choice: dataFromChild, isClicked:true });
            if(dataFromChild===this.state.data.results[0].correct_answer)
                this.correct();
            else
                this.incorrect();
        }//this.props.load();
    }

    // let record=this.state.record;
correct() {
        if(this.state.score+1>this.props.users.list[this.state.key].record){
            /*this.setState({
                record:this.state.score+1
            })*/
            this.props.updateUserRecord({key:this.state.key,record:this.state.score+1});
        }
    this.setState({
        score:this.state.score+1
    })


/*

        let {score, record} = this.props;
        this.props.increaseScore();
        if(score.point+1>record.record) {
            this.props.update_record(score.point + 1);
        }*/
        //console.log(this.props.userList);

    }

    incorrect(){
        //this.props.dispatch({type:"decrease"});
        //this.props.resetScore();
        this.setState({
            score:0,
        })
        //this.props.updateUserRecord({key:this.state.key,record:this.state.record});
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

    setName(name){
        //console.log(this.props.users.list)
        if(name!=""){
            let index=_.find(this.props.users.list, { 'userName': name});
            console.log("iii",index,name,this.state.list);
            if(!index){//newuser

                let newUser = {userName:name, record:0, key:this.props.users.list.length};
                let item=this.props.createNewUser(newUser);
                index=newUser;
            }
            this.setState({
                list:this.props.users.list,
                key:index.key,
                userName:index.userName,
                record:index.record
            });
        }
    }

    render() {
        let {data} = this.state;
        //let record = this.props.users.list[this.state.key].record||0
        return (
            <div style={{ height: 10 }}>
                <Login userName={this.state.userName} setName={this.setName.bind(this)} />
                <p>{this.state.userName} : {this.state.key}</p>
                <Modal.Header style={{justifyContent: 'space-evenly'}}>

                        <Score userKey={this.state.key} point={this.state.score} next={this.componentDidMount.bind(this)}/>
                    </Modal.Header>
                <Modal.Body style={{justifyContent: 'space-evenly'}}>
                        <Question  type= {data.results[0].type } question= {data.results[0].question }/>

                        <ChoiceList  isClicked={this.state.isClicked} choices={this.state.choices} chooseAnswer={this.chooseAnswer.bind(this)} answer= {data.results[0].correct_answer } />
                    </Modal.Body>
                <Modal.Footer  style={{justifyContent: 'center'}}>
                        <Button bsStyle="secondary" onClick={() => this.reset()}>Reset</Button>
                        <Button bsStyle="secondary" onClick={() => this.fetchData()}>Next</Button>

                </Modal.Footer>
                <Link to="/recordList"><h5>Record List</h5></Link>
            </div>
        );
    }
}

const mapDispatchToProps = {
    increaseScore: (obj) => scoreActions.increaseScore(obj),
    resetScore: (obj) => scoreActions.resetScore(obj),
    update_record: (obj) => recordActions.updateRecord(obj),
    resetRecord: (obj) => recordActions.resetRecord(obj),
    updateUserRecord: (obj) => userRecordActions.updateUserRecord(obj),
    createNewUser: (obj) => userRecordActions.createNewUser(obj),

};

const mapStateToProps = (state) => ({
    score: state.score || {},
    record: state.record || {},
    users: state.users || {},
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);