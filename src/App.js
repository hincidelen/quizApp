import React, { Component } from 'react';
import './App.css';
import List from './List';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            items: [],
            id:''
        };
    }

    onChange = (event) => {
        this.setState({ term: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            term: '',
            items: [...this.state.items, this.state.term]
        });

    }

     handleDelete (index){

         let filteredArray = this.state.items
         filteredArray.splice(index, 1);

         this.setState({
             items: filteredArray

         })

    }
    render() {

        return (
            <div>
                <form className="App" onSubmit={this.onSubmit}>
                    <input value={this.state.term} onChange={this.onChange} />
                    <button>Submit</button>
                </form>
                <List items={this.state.items}  handleDelete={this.handleDelete.bind(this)}/>
            </div>
        );
    }
}

