import 'whatwg-fetch';
import 'babel-polyfill';
import { h, render, Component } from 'preact';

import { TimeSlotsManager } from '../../components';

class Admin extends Component {
    render() {
        return (
            <div class="main">
                <h2 class="main__subtitle">Tider</h2>

                <TimeSlotsManager />
            </div>
        )
    }
}

export default Admin;