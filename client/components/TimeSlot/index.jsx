import 'whatwg-fetch';
import 'babel-polyfill';
import { h, render, Component } from 'preact';

import { Loader } from '../../components';
import avatarPatrik from './img/avatar-patrik.png';
import avatarMaria from './img/avatar-maria.png';
import avatarMartin from './img/avatar-martin.png';
import avatarEmma from './img/avatar-emma.png';

class TimeSlot extends Component {
    constructor() {
        super();

        this.state = {
            showLoader: false
        }
    }

    async handleClick(e, id) {
        const target = e.target;
        const user = this.props.user ? this.props.user : null;

        if (user) {
            target.classList.add('time-slot--taken');
            this.setState({ showLoader: true });

            await this.props.updateTimeSlot(id, user);

            this.setState({ showLoader: false });
        }
    }

    setDisabledAttribute() {
        let disabled = false;
        
        if (this.props.user === null && !this.props.admin) {
            disabled = true;
        } else if (this.props.user && this.props.client !== undefined) {
            if (this.props.user.displayName !== this.props.client && this.props.client !== '') {
                disabled = true;
            }
        }

        return disabled;
    }

    setAvatarPicture(name) {
        switch (name.toLowerCase()) {
            case 'patrik':
                return avatarPatrik
            case 'maria':
                return avatarMaria
            case 'martin':
                return avatarMartin
            case 'emma':
                return avatarEmma
            default:
                return undefined;
        }
    }

    render({ _id, name, dateFormatted, client, admin, user }) {
        let defaultInputValue = user
            ? user.mail
            : ''
        
        const additionalClasses = client !== '' ? 'time-slot--taken' : '';
        const disabled = this.setDisabledAttribute();
        const avatar = this.setAvatarPicture(name);
        
        return (
            <button id={_id} class={`time-slot ${additionalClasses}`} disabled={disabled} onClick={(e) => this.handleClick(e, _id)}>
                {this.state.showLoader &&
                    <Loader />
                }

                <picture class="time-slot__avatar">
                    {avatar !== undefined &&
                        <img src={avatar}></img>
                    }
                </picture> 
                
                <span class="time-slot__label">
                    {client !== '' ? (
                        client
                    ) : (
                        dateFormatted
                    )}
                </span>

                {/* {admin && client !== '' &&
                    <button class="time-slot__remove-btn" onClick={() => this.props.removeTimeSlot(_id)}></button>
                }

                {!disabled && client !== '' && !admin &&
                    <button class="time-slot__remove-btn" onClick={() => this.props.updateTimeSlot(_id, null)}></button>
                } */}
            </button>
        )
    }
}

export default TimeSlot;