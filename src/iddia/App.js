import React, { Component } from 'react';
import _ from 'lodash';
import Button from "react-bootstrap/lib/Button";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            digest:"",
            events:[],
            sortOrder:[],
        };
    }

    componentDidMount() {
        this.fetchData().then(
            console.log(this.state)
        );
    }
    fetchData() {
        return fetch('https://www.tuttur.com/draw/events/type/football'
        )

        .then(response => response.json())
            .then(newData => {
                console.log(newData);
                let digest=newData.digest||"";
                let sortOrder=[];
                for(let i in newData.sortOrder)
                    sortOrder.push(newData.sortOrder[i]);
                let events=[];
                for(let i in newData.events)
                    events.push(newData.events[i]);
                this.setState({
                    digest,
                    events,
                    sortOrder
                })
            });
    }

    render() {
        const { digest, events, sortOrder } = this.state;//onClick={() => this.props.handleDelete(index)}
            return <li>
                {

                    events.map((item, index) => {
                        return <li key={index}>
                            {item.homeTeamName} - {item.awayTeamName}
                        </li>
                    })
                }
            </li>

    }
}
