import React, {Component} from 'react';
import { connect } from 'react-redux';


class Score extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {record, score} = this.props;
        return(
            <ul>
                <h6> rekor:{record.record} puan:{score.point} </h6>
            </ul>

        );
    }
}

const mapStateToProps = (state) => ({
    score: state.score || {},
    record: state.record || {},
});


export default connect(
    mapStateToProps
)(Score);
