import React, {Component, PropTypes} from 'react';
import EventRow from './EventRow';

class EventsTable extends Component {

        

    render() {
        let events = [];
            this.props.eventsList.map((e, i) => {
                events.push(<EventRow event={e} key={i}/>);
            });
        return(
            <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Heure d&eacute;but</th>
                        <th>Heure fin</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {events}
                </tbody>
            </table>
            {events.length > 0 ? <button className="btn btn-primary" type="button" onClick={this.props.handleValidate}>Valider !</button> : null}
            </div>
        );
    }
}

EventsTable.propTypes = {
    eventsList: PropTypes.array,
    handleValidate: PropTypes.func
}

export default EventsTable;