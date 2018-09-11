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
    }

    render() {
        var list=this.props.users.list||[];
        var size = 10;
        var ordered = (_.orderBy(list, ['record', 'key'], ['desc', 'asc']));
        let name = (this.props.location.search).slice(1);
        let link =  "/main?".concat(name);
        return (
            <div style={{ height: 10, justifyContent: 'center'}}>
                <center><h2>Record List</h2></center>
                {ordered.slice(0,10).map(function(d, idx){
                    return (<ul  key={idx}> <center>{d.record} - {d.userName} </center></ul>)
                })}
                <Link to={link}><h5>back</h5></Link>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    users: state.users || {},
});

export default connect(mapStateToProps,null)(RecordList);