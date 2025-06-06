import 'whatwg-fetch';
import 'babel-polyfill';
import React, { Component } from 'react';

import { Loader } from '../../components';
import avatarPatrik from './img/avatar-patrik.png';
import avatarMaria from './img/avatar-maria.png';
import avatarMartin from './img/avatar-martin.png';
import avatarEmma from './img/avatar-emma.png';
import avatarHenrik from './img/avatar-henrik.png';

class TimeSlot extends Component {
    constructor() {
        super();

        this.state = {
            showLoader: false,
            overlayHidden: true
        }
    }

    handleClick() {
        if (this.state.overlayHidden) {
            this.setState({ overlayHidden: false });
        }
    }
    
    hideOverlay(e) {
        e.preventDefault();

        this.setState({ overlayHidden: true })
    }

    async confirmTimeSlot(id) {
        const user = this.props.user ? this.props.user : null;
        this.setState({ overlayHidden: true });

        if (user) {
            this.timeSlot.classList.add('time-slot--taken');
            this.setState({ 
                showLoader: true
            });

            await this.props.updateTimeSlot(id, user);

            this.setState({ showLoader: false });
        }
    }

    cancelTimeSlot(_id) {
        this.props.updateTimeSlot(_id, null);
        this.setState({ overlayHidden: true });
    }

    setDisabledAttribute() {
        let disabled = false;
        
        if (this.props.user === null && !this.props.admin) {
            disabled = true;
        } else if (this.props.user && this.props.client !== undefined) {

            // Time slot has a client - check if client isnt same as user or empty, if so disable
            if (this.props.user.displayName !== this.props.client && this.props.client !== '') {
                disabled = true;
            }
        }

        return disabled;
    }

    setAvatarPicture(name) {
        switch (name.toLowerCase()) {
            case 'patrik':
                return <img src={avatarPatrik} />;
            case 'maria':
                return <img src={avatarMaria} />;
            case 'martin':
                return <img src={avatarMartin} /> ;
            case 'emma':
                return  <img src={avatarEmma} />;
            case 'henrik':
                return <img src={avatarHenrik} />;
            default:
                return <span>{name.substring(0, 1)}</span>;
        }
    }

    render() {
        const { _id, name, dateFormatted, client, admin, user } = this.props;
        const additionalClasses = client !== '' ? 'time-slot--taken' : '';
        const disabled = this.setDisabledAttribute();
        const avatar = this.setAvatarPicture(name);
        const timeSlotControlModifier = !disabled && client !== '' 
            ? 'time-slot__control--cancel'
            : 'time-slot__control--add'
        const label = client !== ''
            ? `<span>${dateFormatted}</span><br />${client}`
            : dateFormatted
        
        return (
            <div ref={timeSlot => this.timeSlot = timeSlot} id={_id} className={`time-slot ${additionalClasses}`} disabled={disabled}>
                {this.state.showLoader &&
                    <Loader />
                }

                <picture className="time-slot__avatar">
                    {avatar !== undefined &&
                        this.setAvatarPicture(name)
                    }
                </picture> 
                
                <span className="time-slot__label" dangerouslySetInnerHTML={{ __html: label }}></span>
                
                {user && !disabled &&
                    <span className={`time-slot__control ${timeSlotControlModifier}`} onClick={(e) => this.handleClick(e)}></span>
                }

                <div className="time-slot__overlay" aria-hidden={this.state.overlayHidden ? 'true' : 'false'} onClick={e => e.preventDefault()}>
                    <div className="time-slot__overlay-btn-group">
                        {!disabled && client !== '' && !admin ? (
                            <button className="time-slot__overlay-btn" onClick={() => this.cancelTimeSlot(_id)}>Remove</button>
                        ) : (
                            <button className="time-slot__overlay-btn" onClick={() => this.confirmTimeSlot(_id)}>Confirm</button>
                        )}
                        <button className="time-slot__overlay-btn" onClick={(e) => this.hideOverlay(e)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimeSlot;