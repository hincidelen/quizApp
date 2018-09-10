import React, { Component } from 'react';
import Question from "./Question";
import ChoiceList from "./ChoiceList";
import Score from "./Score";
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import * as scoreActions from './store/actions/scoreActions';
import * as recordActions from './store/actions/recordActions';
import recordReducer from "./store/reducers/recordReducer";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {results: [{}]},
            choice:null,
            choices:null,
            isClicked:true,
            score:0,
            record:0
        };
    }

    reset(){
        this.props.resetScore();
        this.props.resetRecord();
        /*this.setState({
            score:0,
            record:0
        })*/
        this.fetchData();
    }

    componentDidMount() {
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
            if(dataFromChild==this.state.data.results[0].correct_answer)
                this.correct();
            else
                this.incorrect();
        }
    }

    correct() {
        // let record=this.state.record;

        let {score, record} = this.props;
        this.props.increaseScore();
        if(score.point+1>record.record)
            this.props.update_record(score.point+1);

    }

    incorrect(){
        //this.props.dispatch({type:"decrease"});
        this.props.resetScore();
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

    render() {
        let {data} = this.state;
        return (
            <div style={{ height: 10 }}>
                <Modal.Header style={{justifyContent: 'space-evenly'}}>
                <Score record={this.state.record} next={this.componentDidMount.bind(this)}/>
                </Modal.Header>
                <Modal.Body style={{justifyContent: 'space-evenly'}}>
                <Question  type= {data.results[0].type } question= {data.results[0].question }/>

                <ChoiceList  isClicked={this.state.isClicked} choices={this.state.choices} chooseAnswer={this.chooseAnswer.bind(this)} answer= {data.results[0].correct_answer } />
                </Modal.Body>
                <Modal.Footer style={{justifyContent: 'center'}}>
                        <Button bsStyle="secondary" onClick={() => this.reset()}>Reset</Button>
                        <Button bsStyle="secondary" onClick={() => this.fetchData()}>Next</Button>

                </Modal.Footer>

            </div>
        );
    }
}

const mapDispatchToProps = {
    increaseScore: (obj) => scoreActions.increaseScore(obj),
    //decreaseScore: (obj) => scoreActions.decreaseScore(obj),
    resetScore: (obj) => scoreActions.resetScore(obj),
    update_record: (obj) => recordActions.updateRecord(obj),
    resetRecord: (obj) => recordActions.resetRecord(obj),
};
const mapStateToProps = (state) => ({
    score: state.score || {},
    record: state.record || {},
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);