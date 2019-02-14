import 'whatwg-fetch';
import React, { Component } from 'react';

import { TimeSlotsManager } from '../../components';

class Admin extends Component {
    render() {
        return (
            <div className="main">
                <h2 className="main__subtitle">Tider</h2>

                <TimeSlotsManager admin={true} />
            </div>
        )
    }
}

export default Admin;