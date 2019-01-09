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
            userSignedIn: true
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

            // if (userPhotoBlob.type === 'image/jpeg') {
            //     const userPhotoUrl = URL.createObjectURL(userPhotoBlob);
            //     const userPhoto = document.querySelector('img');
            //     userPhoto.addEventListener('load', () => URL.revokeObjectURL(userPhotoUrl));

            //     userPhoto.src = userPhotoUrl;
            // }

            this.setState({
                accessToken: token,
                user: user,
                userSignedIn: true
            })
        } else {
            this.setState({ userSignedIn: false })
        }
    }

    render() {
        const { accessToken, user, userSignedIn } = this.state;
        
        return (
            <Router>
                <div>
                    <Header userSignedIn={userSignedIn} />
                    <Route exact path="/" component={Main} accessToken={accessToken} user={user} />
                    <Route path="/admin" component={Admin} />
                </div>
            </Router>
        )
    }
}

export default App;