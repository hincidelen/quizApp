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
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import * as userRecordActions from "./store/actions/userRecordActions";
import Alert from "react-bootstrap/es/Alert";
import Dialog from 'react-bootstrap'
/*
const recordList = () => {
    return (
        <div >
            <h1 >About Me</h1>
        </div>
    );
}
export default recordList;*/

export  default class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="static-modal">
                <Modal animation={false} show={this.props.confirmState}>
                    <Modal.Header>
                        <Modal.Title>Attention</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{this.props.type.type=="deleteUser"?
                        "The user ".concat(this.props.type.d_key):
                        "All users"} will be deleted</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.props.confirmAction(false)}>Cancel</Button>
                        <Button bsStyle="primary" onClick={() => this.props.confirmAction(true)} >OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}