import React, {Component} from 'react';

export default class Score extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <ul>
                <h6> rekor:{this.props.record} puan:{this.props.score} </h6>
            </ul>

        );
    }
}