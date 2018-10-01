import 'whatwg-fetch';
import 'babel-polyfill';
import { h, render, Component } from 'preact';

import avatarPatrik from './img/avatar-patrik.png';
import avatarMaria from './img/avatar-maria.png';

class TimeSlot extends Component {
    handleKeyDown(e, id) {
        const target = e.target;
        const user = this.props.user ? this.props.user : null;

        if (e.which === 13) {
            if (user) {
                // Check if logged in users mail matches input email
                if (target.value === user.mail && target.parentNode.getAttribute(id) === id) {
                    target.parentNode.classList.add('time-slot--taken');
                }
                e.target.blur();

            }

            if (target.value !== '') {
                this.props.updateTimeSlot(id, user);
            } else {
                this.props.updateTimeSlot(id, null);
            }
        }
    }

    setDisabledAttribute() {
        let disabled = false;

        if (this.props.user === undefined && !this.props.admin) {
            disabled = true;
        }

        return disabled;
    }

    render({ _id, name, dateFormatted, client, admin, user }) {
        let defaultInputValue = user !== undefined
            ? user.mail
            : ''
        
        const additionalClasses = client !== '' ? 'time-slot--taken' : '';
        const disabled = this.setDisabledAttribute();
        
        return (
            <div id={_id} class={`time-slot ${additionalClasses}`}>
                <input 
                    class="time-slot__input" 
                    type="text" 
                    id={`input-${dateFormatted}-${name}`}
                    value={client ? client : defaultInputValue}
                    onKeyDown={e => this.handleKeyDown(e, _id)}
                    ref={input => { this.input = input }}
                    disabled={disabled}
                >
                    <div>{client}</div>
                </input>
                
                <label
                    class="time-slot__label" 
                    for={`input-${dateFormatted}-${name}`}
                >
                    <span class="time-slot__label-content">{dateFormatted} - {name}</span>
                </label>

                <picture class="time-slot__avatar">
                    <img src={name === 'Patrik' ? avatarPatrik : avatarMaria}></img>
                </picture>  

                {admin && client === '' &&
                    <button class="time-slot__remove-btn" onClick={() => this.props.removeTimeSlot(_id)}></button>
                }
            </div>
        )
    }
}

export default TimeSlot;