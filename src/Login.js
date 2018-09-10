/**
 * You will want to include this bit of css
 *
 * .modal-container {
 *   position: relative;
 * }
 * .modal-container .modal, .modal-container .modal-backdrop {
 *   position: absolute;
 * }
 */

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import * as React from "react";


export default class Login extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name:""
        };
    }
    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        this.props.setName(this.state.name);
    }
    render() {
        return (
            <div>
                <Modal animation={false} show={this.props.userName==""?true:false}>
                    <Modal.Header>
                        <Modal.Title>Kullanıcı adı giriniz</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{justifyContent: 'space-evenly'}}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <input type="text" value={this.state.name} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Giriş" />
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}