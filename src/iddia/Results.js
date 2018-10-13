import React, { Component } from 'react';
import _ from 'lodash';
import Button from "react-bootstrap/lib/Button";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Glyphicon from "react-bootstrap/es/Glyphicon";
import { Nav, Navbar, NavItem } from "react-bootstrap";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            digest:"",
            matches:[],
            exBulletins:[],
            link:"https://www.tuttur.com/live-score/completed-event-list",
            puan:0,
            diger:false
        };
    }

    componentDidMount() {
        this.fetchData(this.state.link).then(
            console.log(this.state)
        );
        //this.fetch2("https://www.tuttur.com/draw/events/type/football")
    }
    setLink(){
        this.setState({
            link:"https://www.tuttur.com/live-score/completed-event-list"
        })
        this.fetchData("https://www.tuttur.com/live-score/completed-event-list")
    }
    fetch2(link){
        return fetch(link)
            .then(response => response.json()).then(newData=>{
                console.log(newData)
            })
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
    checkChoice(item, choice, index){
        if(item.isClicked)
            return;
        let team2_res = item.officialResult.NormalTime[1]
        let team1_res = item.officialResult.NormalTime[0]
        let fark=team2_res - team1_res;
        console.log(Math.sign(fark), choice)
        item.isClicked=true;
        item.choice=choice;
        item.guessResult=Math.sign(fark);
        let {matches} = this.state;
        matches[index] = item;
        this.setState({
            matches,
            puan:Math.sign(fark) === choice?this.state.puan+1:this.state.puan
        })
    }
    filterItem(item) {
        return item.type=="football" && item.officialResult
    }
    render() {
        const { digest, matches, exBulletins } = this.state;//onClick={() => this.props.handleDelete(index)}
            return <div>
                <Navbar inverse fixedTop style={{position: "fixed"}}>
                <Button onClick={this.setLink.bind(this)}>{this.state.puan}</Button>
                <Button bsStyle="btn btn-outline-secondary" onClick={() => this.props.history.push('/')}>Quit</Button>
                </Navbar>
                    <Grid>
                    <Row>
                <Col>{
                    matches.map((item, index) => {


                        return this.filterItem(item)&&<li key={index}>
                            <Button   bsStyle={item.guessResult==-1?"success":item.choice==-1?"danger":"btn btn-outline-primary"} onClick={this.checkChoice.bind(this,item,-1, index)}>
                            <Glyphicon glyph="star" />

                                {item.homeTeamName} {item.isClicked?": ".concat(item.officialResult.NormalTime[0]):""}
                            </Button>
                            <Glyphicon glyph="star" />

                            <Button   bsStyle={item.guessResult==0?"success":item.choice==0?"danger":"btn btn-outline-primary"} onClick={this.checkChoice.bind(this,item,0, index)}>
                                -
                            </Button>
                            <Button   bsStyle={item.guessResult==1?"success":item.choice==1?"danger":"btn btn-outline-primary"} onClick={this.checkChoice.bind(this,item,1, index)}>
                                {item.awayTeamName} {item.isClicked?": ".concat(item.officialResult.NormalTime[1]):""}
                            </Button>
                        </li>
                    })
                }
                </Col>
                        <Col>
                            <Button onClick={()=>this.setState({diger:!this.state.diger})}>Show Others</Button>
                            {this.state.diger&&<div>{
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
                        }</div>}
                </Col>
                    </Row>
                </Grid>
            </div>

    }
}
