import { h, render, Component } from 'preact';
import moment from 'moment';

import { TimeSlot, AddTimeSlot } from '../../components';
import requestService from '../../utils/requestService';
import rootPath from '../../utils/rootPath';

class TimeSlotsManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeSlots: []
        }
    }

    componentDidMount() {
        this.getTimeSlots();
    }

    async getTimeSlots() {
        const timeSlots = await requestService.getRequest(`${rootPath}/timeslots`);

        this.setState({
            timeSlots: timeSlots
        });

        this.forceUpdate();
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
        const event = await requestService.postRequest('https://graph.microsoft.com/beta/me/events', opts, true, token);
        
        console.log('Event created: ', event);
    }

    render() {
        let freeSlots = [];
        let bookedSlots = [];
        
        this.state.timeSlots.map(timeSlot => { 
            if (timeSlot.client !== '') { 
                bookedSlots.push(
                    <TimeSlot
                        {...timeSlot}
                        user={this.props.user}
                        updateTimeSlot={(id, user) => this.updateTimeSlot(id, user)}
                        removeTimeSlot={(id) => this.removeTimeSlot(id)}
                        admin={this.props.admin}
                    />
                );
            } else {
                freeSlots.push(
                    <TimeSlot
                        {...timeSlot}
                        user={this.props.user}
                        updateTimeSlot={(id, user) => this.updateTimeSlot(id, user)}
                        removeTimeSlot={(id) => this.removeTimeSlot(id)}
                        admin={this.props.admin}
                    />
                );
            }
        })

        return (

            <div className="time-slots-manager">
                <div className={`time-slots-manager__list ` + (bookedSlots.length ? '' : 'time-slots-manager__list--single')}>
                    <div className="time-slots-manager__list-col">
                        {freeSlots.map(timeSlot => {
                            return timeSlot
                        })}
                    </div>
                    {bookedSlots.length > 0 &&
                        <div className="time-slots-manager__list-col">
                            {bookedSlots.map(timeSlot => {
                                return timeSlot
                            })}
                        </div>
                    }
                </div>

                {this.props.admin &&
                    <div class="time-slots-manager__add">
                        <h2 class="time-slots-manager__subtitle">Lägg till en tid</h2>

                        <AddTimeSlot addTimeSlot={ (name, time) => this.addTimeSlot(name, time) }/>
                    </div>
                }
            </div>
        )
    }
}

export default TimeSlotsManager;