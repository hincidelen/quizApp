import React, { Component } from 'react';
import Question from "./Question";
import ChoiceList from "./ChoiceList";
import Score from "./Score";
import Choice from "./Choice";

export default class Main extends Component {
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
        this.setState({
            score:0,
            record:0
        })
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

    correct(){
        let score=this.state.score;
        let record=this.state.record;
        score=score+1;
        this.setState({
            score:score
        })
        if(score>record)
            this.setState({
                record:score
            })
    }

    incorrect(){
        let temp=this.state.score;
        temp=0;
        this.setState({
            score:temp
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

    render() {
        let {data} = this.state;
        return (
            <div style={{ height: 10 }}>
                <Score score={this.state.score} record={this.state.record} next={this.componentDidMount.bind(this)}/>
                <Question style={{display: 'flex', justifyContent: 'center'}} type= {data.results[0].type } question= {data.results[0].question }/>

                <ChoiceList isClicked={this.state.isClicked} choices={this.state.choices} chooseAnswer={this.chooseAnswer.bind(this)} answer= {data.results[0].correct_answer } />
                <div >
                    <button onClick={() => this.reset()}>Reset</button>
                    <button  onClick={() => this.fetchData()}>Next</button>
                </div>
            </div>
        );
    }
}
