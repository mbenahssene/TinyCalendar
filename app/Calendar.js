import React, {Component} from 'react';
import Dropdown from 'react-bootstrap-dropdown';
import 'whatwg-fetch';
import update from 'react-addons-update';

import EventsTable from './EventsTable';
import ConflictEvents from './ConflictEvents';

const API = 'http://localhost:8080/Calendrier.json';

class Calendar extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            calendarEvents: [],
            names: [],
            events:[],
            userEvents: [],
            overlaped: [],
            conflicts:[],
            isValid: false
        };
    }

    componentDidMount() {
        fetch(API).then((response) => response.json())
                    .then((data) => {
                        this.setStateData(data);
                    })
                    .catch((error) => {
                        console.log('Error fetching data', error);
                    });
    }

    setStateData(data){
        let namesList = [];
        let eventsList = [];
        for (var o of data){
            namesList.push({text: o.Nom, value: o.Nom});
            eventsList.push(o.RendezVous);
        }
        this.setState({names: namesList, events: eventsList});
    }

    handleUserSelection(item){
        let uEvents = this.state.events[this.indexOf(this.state.names, item.value)];
        this.setState({userEvents:uEvents, overlaped: [], conflicts: [], isValid: false});
    }

    indexOf(items, name){
        let key = -1;
        items.forEach((value, index, array)=> {
            if(value.value === name){
                key = index;
                return;
            }
        });
        return key;
    }

    handleValidate(){
        let dates = this.extractDates();
        let overlap = [];
        let sameTime = [];
        for (let i = 0; i<dates.length-1; i++){
            let ol = [];
            for (let j = i+1; j<dates.length; j++){
                
                if(this.isOverlap(dates[i], dates[j])){
                    overlap.push({date1: i, date2: j});
                }
                else if (this.isSame(dates[i], dates[j])){
                    sameTime.push({date1: i, date2: j});
                }
            }
        }
        this.setOverlaped(overlap);
        this.setConflicts(sameTime);
        if(overlap.length === 0 && sameTime.length === 0) {
            this.setState({isValid: true});
        }
    }

    isOverlap(date1, date2){
        return (date1.start < date2.end && date2.start < date1.end );
    }

    isSame(date1, date2){
        return (date1.start === date2.start && date2.end === date1.end );
    }

    extractDates(events){
        let dates = [];
        this.state.userEvents.map((e, i) => {
                dates.push({start: new Date(e["Date"] + " " + e["Heure début"]), 
                            end: new Date(e["Date"] + " " + e["Heure fin"]), range: i});
            });
        return dates;
    }

    setOverlaped(overlaped){
        let events = [];
        overlaped.map((o) => {
            if(events.indexOf(o.date1) === -1 ) events.push(this.state.userEvents[o.date1]);
            if(events.indexOf(o.date2) === -1 ) events.push(this.state.userEvents[o.date2]);
        });
        if(events.length > 0){
            this.setState({overlaped: events, isValid: false});
        }
        
    }

    setConflicts(conflicts){
        let events = [];
        conflicts.map((o) => {
            if(events.indexOf(o.date1) === -1 ) events.push(this.state.userEvents[o.date1]);
            if(events.indexOf(o.date2) === -1 ) events.push(this.state.userEvents[o.date2]);
        });
        if(events.length > 0){
            this.setState({conflicts: events, isValid: false});
        }
        
    }
    renderOverlaped() {
        return (
            <div>
                <h5>{"Chevauchement"}</h5>
                <ConflictEvents eventsList = {this.state.overlaped} className={"overlap"}/>
            </div>
        );
    }
    renderConflict() {
        return (
            <div>
                <h5>{"rendez-vous en même temps"}</h5>
                <ConflictEvents eventsList = {this.state.conflicts} className={"conflict"}/>
            </div>
        );
    }

    render () {
        let overlaped = (this.state.overlaped.length > 0 ? this.renderOverlaped() : null);
        let conflict = (this.state.conflicts.length > 0 ? this.renderConflict() : null);
        let ok = ((this.state.isValid) ? <span className="glyphicon glyphicon-ok ok"> Calendrier valide</span> : null);

        return (
            <div>
                <div className="header clearfix">
                    <h1 className="text-muted">{"Calendrier"}</h1>                   
                </div><span className="text-muted">Rendez-vous de: </span>
                    
                    <Dropdown title="selectionnez une personne " items = {this.state.names} onSelect={this.handleUserSelection.bind(this)}/>
                
                <div>      
                    
                    <EventsTable eventsList = {this.state.userEvents} handleValidate = {this.handleValidate.bind(this)}/>

                    <p/>
                    {ok}
                    {overlaped}
                    {conflict}
                    
                </div>
            </div>
        );
    }
}
export default Calendar;