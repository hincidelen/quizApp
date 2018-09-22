import React, { Component } from 'react';
import './App.css';
import List from './List';

import _ from 'lodash';
import Button from "react-bootstrap/lib/Button";
import {Link} from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: {item:""},
            searchTerm: '',
            items: [],
            initialItems: [],
            id:''
        };
    }

    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
            return fetch('https://www.tuttur.com/draw/events/type/football'
            )

            .then(response => response.json())
                .then(newData => {
                    console.log(newData);
                    /*this.setState({
                        term: {item:'' },
                        items: newData,
                        initialItems: newData
                    });*/
                });
    }
        fetchDatam() {
            return fetch('http://127.0.0.1:3004/get/asdasd')
                .then(response => response.toString())
                .then(newData => {
                    console.log(newData);
                    /*this.setState({
                        term: {item:'' },
                        items: newData,
                        initialItems: newData
                    });*/
                });
    }

    fetchDataPost(post) {//post={a: 1, b: 2}
        return fetch('http://127.0.0.1:3004/post',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(post)
        });
    }

    filterList=(event)=>{
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function(item){
            return item.item.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
    }

    onChange = (event) => {
        this.setState({ term:{item: event.target.value } });
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            term: {item:'' },
            items: [...this.state.items, this.state.term],
            initialItems: [...this.state.initialItems, this.state.term]
        });
        //this.fetchDataPost(this.state.term);

    }
     handleDelete (index){

         let filteredArray = this.state.initialItems
         filteredArray.splice(index, 1);

         this.setState({
             initialItems: filteredArray,
             items: filteredArray
         })
    }

    render() {

        return (
            <div>
                <Button bsStyle="btn btn-outline-secondary" onClick={() => this.props.history.push('/')}>Quit</Button>
                <form className="App" onSubmit={this.onSubmit}>
                    <input value={this.state.term.item} onChange={this.onChange} />
                    <button>Submit</button>
                </form>
                <form>
                    <fieldset className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
                    </fieldset>
                </form>
                <List items={this.state.items}  handleDelete={this.handleDelete.bind(this)}/>
            </div>
        );
    }
}






/*

var FilteredList = React.createClass({

    filterList: function(event){
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function(item){
            return item.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
    },
    componentWillMount: function(){
        this.setState({items: this.state.initialItems})
    },
    render: function(){
        return (
            <div className="filter-list">
                <form>
                    <fieldset className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
                    </fieldset>
                </form>
                <List items={this.state.items}/>
            </div>
        );
    }
});

var List = React.createClass({
    render: function(){
        return (
            <ul className="list-group">
                {
                    this.props.items.map(function(item) {
                        return <li className="list-group-item" data-category={item} key={item}>{item}</li>
                    })
                }
            </ul>
        )
    }
});

React.render(<FilteredList/>, document.getElementById('app'));
*/