import 'whatwg-fetch';
import 'babel-polyfill';
import { h, render, Component } from 'preact';

import { TimeSlotsManager } from '../../components';
import requestService from '../../utils/requestService';
import rootPath from '../../utils/rootPath';

class Main extends Component {
    constructor() {
        super();

        this.state = {
            accessToken: null,
            showSignInButton: false
        }
    }

    componentDidMount() {
        this.checkForAccessToken();
    }

    async checkForAccessToken() {
        const { token } = await requestService.getRequest(`${rootPath}/gettoken`);
        
        if (token !== '' && token !== null) {
            const user = await requestService.getRequest(`https://graph.microsoft.com/beta/me`, token);

            this.setState({
                accessToken: token,
                user: user
            })
        } else {
            this.setState({ showSignInButton: true })
        }
    }

    render() {
        return (
            <div class="main">
                {this.state.showSignInButton &&
                    <a href="/signin" class="button button--signin">Logga in för att boka en tid</a>
                }

                <h2 class="main__subtitle">Tider</h2>
                
                <TimeSlotsManager 
                    admin={false} 
                    accessToken={this.state.accessToken} 
                    user={this.state.user} 
                />
            </div>
        )   
    }
}

export default Main;