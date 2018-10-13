import React, { Component } from 'react';


import { connect } from 'react-redux';
import {
    Link,
} from 'react-router-dom'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div style={{ height: 100, marginTop:50 }}>
                <Modal.Header style={{justifyContent: 'space-evenly'}}>
                    <h2>My Projects:</h2>
                </Modal.Header>
                <Modal.Body style={{justifyContent: 'space-evenly'}}>
                    <center>

                        <li>
                            <Button bsStyle="btn btn-outline-secondary" onClick={() => this.props.history.push('/quizApp')}>quiz App</Button>
                        </li>
                        <li>
                            <Button bsStyle="btn btn-outline-secondary" onClick={() => this.props.history.push('/checkListApp')}>checkList App</Button>
                        </li>
                        <li>
                            <Button bsStyle="btn btn-outline-secondary" onClick={() => this.props.history.push('/iddia')}>iddia App</Button>
                        </li>
                    </center>
                </Modal.Body>
                <Modal.Footer  style={{justifyContent: 'center'}}>
                </Modal.Footer>
            </div>
        );
    }
}

const mapDispatchToProps = {

};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);









