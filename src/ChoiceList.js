import React, {Component} from 'react';
import Choice from "./Choice";

export default class ChoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice:null,
            isListOK:false
        }
    }
    render() {
        let list = this.props.choices||[];
        return(
            <ul>

                <Choice isClicked={this.props.isClicked}  correct={this.props.answer} callbackFromParent={this.props.chooseAnswer} items= {this.props.choices }/>

            </ul>

        );
    }
}