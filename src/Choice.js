import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Choice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ind: -1,
            appearances : {
                default: 'default',
                true: 'success',
                false: 'danger',
                waits:'warning'
            }
        }
    }

    evaluate (index,choice){
        this.setState({
            correct:this.props.correct
        })
        {
            this.setState({
                ind:index
            })
            this.props.callbackFromParent(choice);
        }
    }


    render() {

        let sh = this.props.items || [];
        return <div style={{justifyContent: 'space-evenly',textAlign: 'center'}}>
            {

                sh.map((item, index) => {
                    return  <li type="A"><Button  bsStyle={this.props.isClicked?
                        (item==this.props.correct? this.state.appearances.true :
                            (this.state.ind==index?this.state.appearances.false:this.state.appearances.default)):
                        this.state.appearances.default}  key={index} onClick={() => this.evaluate(index,item)}  >
                        {item}
                    </Button></li>
                })

            }
        </div>
    }
}