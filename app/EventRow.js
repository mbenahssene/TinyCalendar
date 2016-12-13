import React, {Component, PropTypes} from 'react';
class EventRow extends Component {
    render (){

        return(
            <tr className={this.props.className}>
                <td>{this.props.event["Date"]}</td>
                <td>{this.props.event["Heure début"]}</td>
                <td>{this.props.event["Heure fin"]}</td>
                <td>{this.props.event["Description"]}</td>
            </tr>
        );
    }
}

EventRow.propTypes = {
    event: PropTypes.object
}
export default EventRow;