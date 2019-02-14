import 'whatwg-fetch';
import React, { Component } from 'react';

import { TimeSlotsManager } from '../../components';

class Main extends Component {
    render() {
        const { accessToken, user } = this.props;
        return (
            <div className="main">
                <h2 className="main__subtitle">Tider</h2>
                
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