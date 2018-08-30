import { h, render, Component } from 'preact';

class AddTimeSlot extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            time: ''
        }
    }

    handleChange(e) {
        const inputName = e.target.getAttribute('name');

        this.setState({
            [inputName]: e.target.value
        });

        this.nameInput.value = '';
        this.timeInput.value = '';
    }

    handleKeyUp(e) {
        if (e.which === 13 && this.state.name !== '' && this.state.time !== '') {
            this.props.addTimeSlot(this.state.name, this.state.time);

            this.nameInput.value = '';
            this.timeInput.value = '';
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
                            onChange={e => this.handleChange(e)} 
                            onKeyUp={(e) => this.handleKeyUp(e)} 
                        />
                    </div>
                    
                    <div class="add-time-slot__input-wrapper">
                        <label class="add-time-slot__label" htmlFor="time">Tid</label>
                        <input class="add-time-slot__input" type="text" name="time" id="time" 
                            ref={timeInput => { this.timeInput = timeInput }}
                            onChange={e => this.handleChange(e)} 
                            onKeyUp={(e) => this.handleKeyUp(e)} 
                        />
                    </div>
                </div>

                <button class="add-time-slot__btn" onClick={e => this.props.addTimeSlot(this.state.name, this.state.time)}>Lägg till</button>
            </div>
        )
    }
}   

export default AddTimeSlot;