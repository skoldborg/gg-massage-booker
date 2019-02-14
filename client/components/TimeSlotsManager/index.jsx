import React, { Component } from 'react';
import moment from 'moment';

import { TimeSlot, AddTimeSlot } from '../../components';
import requestService from '../../utils/requestService';
import rootPath from '../../utils/rootPath';

class TimeSlotsManager extends Component {
    constructor() {
        super();

        this.state = {
            timeSlots: [],
            timeSlotsUpdated: false
        }
    }

    componentDidMount() {
        this.getTimeSlots();
    }

    async getTimeSlots() {
        const timeSlots = await requestService.getRequest(`${rootPath}/timeslots`);
        
        if (!this.state.timeSlotsUpdated) {
            await this.clearPassedTimeSlots(timeSlots);
        }

        this.setState({
            timeSlots: timeSlots
        });

        // Built in method
        this.forceUpdate();
    }

    /*
    * Checks time stamps for past dates
    * and removes them from the database
    *
    * @param {Array[Object]} timeSlots
    */ 
    async clearPassedTimeSlots(timeSlots) {
        return new Promise((resolve, reject) => {
            let currentTimeSlots = [];

            for (let i = 0; i < timeSlots.length; i++) {
                let date = new Date(timeSlots[i].dateTimeISO);
                let currDate = new Date();
                let diff = date - currDate;

                if (diff < 0) {
                    this.removeTimeSlot(timeSlots[i]._id);
                } else {
                    currentTimeSlots.push(timeSlots[i]);
                }
            }

            this.setState({ timeSlotsUpdated: true });
            resolve(currentTimeSlots);
        })
    }

    async updateTimeSlot(id, user) {
        const opts = { 
            client: user ? user.displayName : '',
            clientMail: user ? user.mail : ''
        };

        const timeSlot = await requestService.postRequest(`${rootPath}/timeslots/${id}`, opts);

        if (timeSlot.name !== undefined) {
            if (user !== null) {
                await this.createCalendarEvent(this.props.accessToken, timeSlot, user);
            }

            this.getTimeSlots();
        }
    }

    async addTimeSlot(name, momentDate) {
        if (name !== '' && moment.isMoment(momentDate)) {
            const opts = {
                name: name,
                dateFormatted: momentDate.format('DD/MM HH:mm'),
                dateTimeISO: momentDate.toISOString()
            };

            await requestService.postRequest(`${rootPath}/timeslots`, opts, false);

            this.getTimeSlots();
        }
    }

    async removeTimeSlot(id) {
        await requestService.deleteRequest(`${rootPath}/timeslots/${id}`)

        this.getTimeSlots();
    }

    async createCalendarEvent(token, timeSlot, user) {
        const opts = {
            subject: `Massage hos ${timeSlot.name}`,
            start: {
                dateTime: timeSlot.dateTimeISO,
                timeZone: 'W. Europe Standard Time'
            },
            end: {
                dateTime: timeSlot.dateTimeISO,
                timeZone: 'W. Europe Standard Time'
            },
            reminderMinutesBeforeStart: 60,
            attendees: [
                {
                    emailAddress: {
                        address: user.mail,
                        name: user.displayName
                    },
                    type: 'required'
                }
            ]
        }

        await requestService.postRequest('https://graph.microsoft.com/beta/me/events', opts, true, token);
    }

    render() {
        const { user, admin } = this.props;
        const monthsMap = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [] };
        const monthNames = ['Jan', 'Feb', 'Mars', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'];

        this.state.timeSlots.forEach(timeSlot => {
            const dateTimeIso = timeSlot.dateTimeISO;
            const d = new Date(dateTimeIso);
            const monthIndex = d.getMonth();
            
            monthsMap[monthIndex].push(
                <TimeSlot 
                    {...timeSlot}
                    user={user}
                    updateTimeSlot={(id, user) => this.updateTimeSlot(id, user)}
                    removeTimeSlot={(id) => this.removeTimeSlot(id)}
                    admin={admin}
                />
            );
        });

        return (
            <div className="time-slots-manager">
                <div className={`time-slots-manager__list `}>
                    {Object.keys(monthsMap).map(key => {
                        if (monthsMap[key].length > 0) {
                            return (
                                <div key={key} className="time-slots-manager__list-col">
                                    <h3 className="time-slots-manager__list-col-heading">{monthNames[key]}</h3>
                                    {monthsMap[key].map((timeSlot, i) => {
                                        return <span key={i}>{timeSlot}</span>
                                    })}
                                </div>
                            )
                        }
                    })}
                </div>

                {admin &&
                    <div className="time-slots-manager__add">
                        <h2 className="time-slots-manager__subtitle">Lägg till en tid</h2>

                        <AddTimeSlot addTimeSlot={ (name, time) => this.addTimeSlot(name, time) }/>
                    </div>
                }
            </div>
        )
    }
}

export default TimeSlotsManager;