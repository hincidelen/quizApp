import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Choice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice:null,
            ind: -1,
            list:null,
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
                ind:index,
                choice:choice
            })
            this.props.callbackFromParent(choice);
        }
    }


    render() {

        let sh = this.props.items || [];
        console.log(this.props.isClicked);
        return <div>
            {

                sh.map((item, index) => {
                    return  <Button  bsStyle={this.props.isClicked?(item==this.props.correct? this.state.appearances.true : (this.state.ind==index?this.state.appearances.false:this.state.appearances.default)):this.state.appearances.default}  key={index} onClick={() => this.evaluate(index,item)}  >
                        {item}, {this.props.isClicked}
                    </Button>
                })

            }
        </div>
    }
}