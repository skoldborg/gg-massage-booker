import { h, render, Component } from 'preact';

import { TimeSlot, AddTimeSlot } from '../../components';

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
        const response = await fetch('https://gg-massage-booker.herokuapp.com/timeslots', {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json'
        })

        const timeSlots = await response.json();

        this.setState({
            timeSlots: timeSlots
        });
    }

    async updateTimeSlot(id, client) {
        await fetch(`https://gg-massage-booker.herokuapp.com/timeslots/${id}`, {
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

    async addTimeSlot(name, time) {
        if (name !== '' && time !== '') {
            await fetch(`https://gg-massage-booker.herokuapp.com/timeslots`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    time: time
                })
            })

            this.getTimeSlots();
        }
    }

    async removeTimeSlot(id) {
        await fetch(`https://gg-massage-booker.herokuapp.com/timeslots/${id}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })

        this.getTimeSlots();
    }

    render() {
        return (
            <div className="time-slots-manager">
                <div className="time-slots-manager__list">
                    {this.state.timeSlots !== [] ? (
                        this.state.timeSlots.map(timeSlot => {
                            return (
                                <TimeSlot 
                                    {...timeSlot} 
                                    updateTimeSlot={(id, client) => this.updateTimeSlot(id, client)} 
                                    removeTimeSlot={(id) => this.removeTimeSlot(id)} 
                                    admin={this.props.admin}    
                                />
                            )
                        })
                    ) : (
                        <p class="time-slots-manager__empty-msg">Inga tider inlagda</p>
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