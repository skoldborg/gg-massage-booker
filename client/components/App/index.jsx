import { h, render, Component } from 'preact';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import { Main, Admin } from '../../pages';
import { Header } from '../../components';
import requestService from '../../utils/requestService';
import rootPath from '../../utils/rootPath';

class App extends Component {
    constructor() {
        super();

        this.state = {
            accessToken: null,
            user: null,
            userSignedIn: true,
            userPhotoBlob: null
        }
    }


    componentDidMount() {
        this.checkForAccessToken();
    }

    async checkForAccessToken() {
        const { token } = await requestService.getRequest(`${rootPath}/gettoken`);

        if (token !== '' && token !== null) {
            const user = await requestService.getRequest(`https://graph.microsoft.com/beta/me`, token);
            const userPhotoBlob = await requestService.getRequest(`https://graph.microsoft.com/beta/me/photo/$value`, token, 'image/jpg');
            
            this.setState({
                accessToken: token,
                user: user,
                userSignedIn: true,
                userPhotoBlob: userPhotoBlob
            })
        } else {
            this.setState({ userSignedIn: false })
        }
    }

    render() {
        const { accessToken, user, userSignedIn, userPhotoBlob } = this.state;
        console.log('App', user);
        
        return (
            <Router>
                <div>
                    <Header user={user} userSignedIn={userSignedIn} userPhotoBlob={userPhotoBlob} />
                    <Route exact path="/" 
                        render={props => <Main {...this.state} />}
                    />
                    <Route path="/admin" 
                        render={props => <Admin {...this.state} />}
                    />
                </div>
            </Router>
        )
    }
}

export default App;