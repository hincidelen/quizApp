import React, {Component} from 'react';

export default class App extends Component {

    render() {
        return <ul>
            {
                this.props.items.map((item, index) => {
                    return <li key={index}>
                        <button onClick={() => this.props.handleDelete(index)}>
                        {item.item}
                        </button>
                    </li>
                })
            }
        </ul>
    }
}
