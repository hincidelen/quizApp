import React, {Component} from 'react';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return(
        <ul >
            <h5 style={{justifyContent: 'space-evenly',textAlign: 'center'}}>       {this.props.question}</h5>

        </ul>
        );
    }
}