import 'whatwg-fetch';
import 'babel-polyfill';
import { h, render, Component } from 'preact';

class TimeSlot extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e, id) {
        const client = e.target.value;

        if (client !== '') {
            this.input.parentNode.classList.add('time-slot--taken');
        }
        this.input.blur();
        

        this.props.updateTimeSlot(id, client)
    }

    render({ _id, name, time, client, admin }) {
        return (
            <div class={"time-slot" + (client !== '' ? " time-slot--taken" : "")}>
                <input 
                    style={client !== '' && !admin ? 'pointer-events: none; cursor:default;' : ''}
                    class="time-slot__input" 
                    type="text" 
                    id={`input-${time}-${name}`}
                    value={client}
                    onChange={e => this.handleChange(e, _id)}
                    ref={input => { this.input = input }}
                >
                    <div>{client}</div>
                </input>
                
                <label 
                    style={client !== '' && !admin ? 'pointer-events: none; cursor:default;' : ''}
                    class="time-slot__label" 
                    for={`input-${time}-${name}`}
                >
                    <span class="time-slot__label-content">{time} - {name}</span>
                </label>

                {admin && client === '' &&
                    <button class="time-slot__remove-btn" onClick={() => this.props.removeTimeSlot(_id)}></button>
                }
            </div>
        )
    }
}

export default TimeSlot;