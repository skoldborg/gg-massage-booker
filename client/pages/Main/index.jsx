import 'whatwg-fetch';
import { h, render, Component } from 'preact';

import { TimeSlotsManager } from '../../components';

class Main extends Component {
    render() {
        const { accessToken, user } = this.props;

        return (
            <div class="main">
                <h2 class="main__subtitle">Tider</h2>
                
                <TimeSlotsManager 
                    admin={false} 
                    accessToken={accessToken} 
                    user={user} 
                />
            </div>
        )   
    }
}

export default Main;