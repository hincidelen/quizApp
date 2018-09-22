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
import {
    withRouter,
} from 'react-router-dom'

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name:"",
            admin:false
        };
    }
    handleChange(event) {
        if(event.target.type === 'checkbox')
            this.setState({admin:event.target.checked});
        else
            this.setState({name: event.target.value,});
    }

    handleSubmit(e) {
        e.preventDefault();
        //this.props.setName(this.state.name);
        this.props.history.push('/quizApp/main?name='+this.state.name+'&isadmin='+this.state.admin);
    }
    render() {
        return (//show={this.props.userName==""?true:false}
            <div>
                <Modal animation={false} show={true}>
                    <Modal.Header>
                        <Modal.Title><center>Kullanıcı adı giriniz </center></Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{justifyContent: 'space-evenly'}}>
                        <form onSubmit={this.handleSubmit.bind(this)} style={{justifyContent: 'space-evenly'}}>
                        <center>
                            admin:
                            <input
                                align="right"
                                name="isAdmin"
                                type="checkbox"
                                checked={this.state.admin}
                                onChange={this.handleChange} />
                            <br/>
                            <label>name:
                                <input type="text" value={this.state.name} onChange={this.handleChange} />

                            </label>
                            <br/>
                            <input type="submit" value="Giriş" /></center>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
export default withRouter(Login);