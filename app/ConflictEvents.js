import React, {Component, PropTypes} from 'react';
import EventRow from './EventRow';

class ConflictEvents extends Component {

        

    render() {
        let events = [];
            this.props.eventsList.map((e, i) => {
                events.push(<EventRow event={e} className = {this.props.className} key={i}/>);
            });
        return(
            <div>
                <table className="table table-striped">
                    {events}
                </table>
            </div>
        );
    }
}

ConflictEvents.propTypes = {
    eventsList: PropTypes.array,
}

export default ConflictEvents;