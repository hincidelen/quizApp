import React, {Component} from 'react';
import { connect } from 'react-redux';


class Score extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let user = this.props.users.list[this.props.userKey]||[];
        let record= user.record||0;
        return(
            <ul>
                <h6> rekor:{record} puan:{this.props.point} </h6>
            </ul>

        );
    }
}

const mapStateToProps = (state) => ({
    score: state.score || {},
    record: state.record || {},
    users: state.users || {},
});


export default connect(
    mapStateToProps
)(Score);
