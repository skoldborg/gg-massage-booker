import 'whatwg-fetch';
import 'babel-polyfill';
import { h, render, Component } from 'preact';

import { TimeSlotsManager } from '../../components';
import rootPath from '../../rootPath';

class Main extends Component {
    constructor() {
        super();

        this.state = {
            accessToken: null
        }
    }

    componentDidMount() {
        this.checkForAccessToken();
    }

    async checkForAccessToken() {
        const response = await fetch(`${rootPath}/gettoken`, {
            'Access-Control-Allow-Origin': '*'
        })

        const token = await response.text();

        if (token !== '') {
            this.setState({
                accessToken: token
            })
        }
    }

    render() {
        return (
            <div class="main">
                {this.state.accessToken === null &&
                    <a href="/signin" class="button button--signin">Logga in för att boka en tid</a>
                }

                <h2 class="main__subtitle">Tider</h2>
                
                <TimeSlotsManager admin={false} token={this.state.token} />
            </div>
        )   
    }
}

export default Main;