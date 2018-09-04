import { h, render, Component } from 'preact';
import moment from 'moment';

import { TimeSlot, AddTimeSlot } from '../../components';
import rootPath from '../../rootPath';

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
        const response = await fetch(`${rootPath}/timeslots`, {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        })
        console.log(response);
        

        const timeSlots = await response.json();

        this.setState({
            timeSlots: timeSlots
        });

        this.forceUpdate();
    }

    async updateTimeSlot(id, client) {
        await fetch(`${rootPath}/timeslots/${id}`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ client: client })
        })

        this.getTimeSlots();
    }

    async addTimeSlot(name, momentDate) {
        if (name !== '' && moment.isMoment(momentDate)) {
            await fetch(`${rootPath}/timeslots`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    dateFormatted: momentDate.format('DD/MM HH:mm'),
                    dateTimeISO: momentDate.toISOString()
                })
            })

            this.getTimeSlots();
        }
    }

    async removeTimeSlot(id) {
        await fetch(`${rootPath}/timeslots/${id}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })

        this.getTimeSlots();
    }

    render() {
        let freeSlots = [];
        let bookedSlots = [];
        
        this.state.timeSlots.map(timeSlot => { 
            if (timeSlot.client !== '') { 
                bookedSlots.push(timeSlot);
            } else {
                freeSlots.push(timeSlot);
            }
        });

        return (
            <div className="time-slots-manager">
                <div className={`time-slots-manager__list ` + (bookedSlots.length ? '' : 'time-slots-manager__list--single')}>
                    {bookedSlots.length ? (
                        [<div className="time-slots-manager__list-col">
                            {freeSlots.map(timeSlot => {
                                return (
                                    <TimeSlot
                                        {...timeSlot}
                                        updateTimeSlot={(id, client) => this.updateTimeSlot(id, client)}
                                        removeTimeSlot={(id) => this.removeTimeSlot(id)}
                                        admin={this.props.admin}
                                    />
                                )
                            })}
                        </div>,
                        <div className="time-slots-manager__list-col">
                            {bookedSlots.map(timeSlot => {
                                return (
                                    <TimeSlot
                                        {...timeSlot}
                                        updateTimeSlot={(id, client) => this.updateTimeSlot(id, client)}
                                        removeTimeSlot={(id) => this.removeTimeSlot(id)}
                                        admin={this.props.admin}
                                    />
                                )
                            })}
                        </div>]
                    ) : (
                        <div className="time-slots-manager__list-col">
                            {freeSlots.map(timeSlot => {
                                return (
                                    <TimeSlot
                                        {...timeSlot}
                                        updateTimeSlot={(id, client) => this.updateTimeSlot(id, client)}
                                        removeTimeSlot={(id) => this.removeTimeSlot(id)}
                                        admin={this.props.admin}
                                    />
                                )
                            })}
                        </div>
                    )}
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