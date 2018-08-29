import 'whatwg-fetch';
import 'babel-polyfill';
import { h, render, Component } from 'preact';

class TimeSlot extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e, id) {
        const client = e.target.value;

        this.props.updateTimeSlot(id, client)
    }

    render({ _id, name, time, client }) {
        return (
            <div class={"time-slot" + (client !== '' ? " time-slot--taken" : "")}>
                <input 
                    class="time-slot__input" 
                    type="text" 
                    id={`input-${time}-${name}`}
                    value={client}
                    onChange={e => this.handleChange(e, _id)}
                >
                    <div>{client}</div>
                </input>
                
                <label class="time-slot__label" for={`input-${time}-${name}`}>
                    <span class="time-slot__label-content">{time} - {name}</span>
                </label>
            </div>
        )
    }
}

export default TimeSlot;