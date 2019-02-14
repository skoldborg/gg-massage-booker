import { h, render, Component } from 'preact';

import Datetime from 'react-datetime';
import '../../../node_modules/react-datetime/css/react-datetime.css';
import moment from 'moment';
import 'moment/locale/sv';

class AddTimeSlot extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            momentDate: null,
        }
    }

    componentDidMount() {
        moment.locale('sv');
    }

    setDateTime(date) {
        if (moment.isMoment(date)) {
            this.setState({
                momentDate: date
            })
        }
    }

    addTimeSlot() {
        const {
            name,
            momentDate
        } = this.state;

        if (name !== '' && momentDate !== null) {            
            this.props.addTimeSlot(name, momentDate);
        }
    }
    
    render() {
        return (
            <div class="add-time-slot">
                <div class="add-time-slot__slots">
                    <div class="add-time-slot__input-wrapper">
                        <label class="add-time-slot__label" htmlFor="name">Massör</label>
                        <input class="add-time-slot__input" type="text" name="name" id="name" 
                            ref={nameInput => { this.nameInput = nameInput }}
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </div>
                    
                    <div class="add-time-slot__input-wrapper">
                        <label class="add-time-slot__label" htmlFor="time">Tid</label>

                        <Datetime 
                            class="add-time-slot__rdt"
                            timeFormat="HH:mm"
                            onChange={this.setDateTime.bind(this)}
                        />
                    </div>
                </div>

                <button class="button" onClick={() => this.addTimeSlot()}>Lägg till</button>
            </div>
        )
    }
}   

export default AddTimeSlot;