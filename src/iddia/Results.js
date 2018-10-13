import React, { Component } from 'react';
import _ from 'lodash';
import Button from "react-bootstrap/lib/Button";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            digest:"",
            matches:[],
            exBulletins:[],
            link:"https://www.tuttur.com/live-score/completed-event-list"
        };
    }

    componentDidMount() {
        this.fetchData(this.state.link).then(
            console.log(this.state)
        );
    }
    setLink(){
        this.setState({
            link:"https://www.tuttur.com/live-score/completed-event-list"
        })
        this.fetchData("https://www.tuttur.com/live-score/completed-event-list")
    }
    fetchData(link) {
        return fetch(link)

        .then(response => response.json())
            .then(newData => {
                console.log(newData);
                let digest=newData.digest||"";
                let exBulletins=[];
                for(let i in newData.exBulletins)
                    exBulletins.push(newData.exBulletins[i]);
                let matches=[];
                for(let i in newData.matches)
                    matches.push(newData.matches[i]);
                this.setState({
                    digest,
                    matches,
                    exBulletins
                })
            });
    }
    goLink(a,b){

        this.setState({
            link:"https://www.tuttur.com/live-score/completed-event-list?startDate=".concat(a).concat("&endDate=").concat(b)
        },()=>{
            this.fetchData(this.state.link).then(
                console.log(this.state)
            );
        })

    }

    render() {
        const { digest, matches, exBulletins } = this.state;//onClick={() => this.props.handleDelete(index)}
            return <li>
                <Button onClick={this.setLink.bind(this)}>{this.state.link}</Button>
                <Grid>
                    <Row>
                <Col>{
                    matches.map((item, index) => {
                        return <li key={index}>
                            <Button   bsStyle="success">
                                {item.homeTeamName} - {item.awayTeamName}
                            </Button>
                        </li>
                    })
                }
                </Col>
                <Col>{
                    exBulletins.map((item, index) => {
                        let d1=new Date(parseInt(item[0]) * 1000);
                        let d2=new Date(parseInt(item[1]) * 1000);
                        console.log(d1,d2)
                        return <li key={index}>
                            <Button   bsStyle="secondary" onClick={this.goLink.bind(this, item[0],item[1] )} >
                                {d1.toISOString().slice(0,10)} - {d2.toISOString().slice(0,10)}
                            </Button>
                        </li>
                    })
                }
                </Col>
                    </Row>
                </Grid>
            </li>

    }
}
