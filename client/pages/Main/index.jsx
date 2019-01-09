import 'whatwg-fetch';
import { h, render, Component } from 'preact';

import { TimeSlotsManager, Header } from '../../components';
import requestService from '../../utils/requestService';
import rootPath from '../../utils/rootPath';

class Main extends Component {
    // constructor() {
    //     super();

    //     this.state = {
    //         accessToken: null,
    //         showSignInButton: false
    //     }
    // }

    // componentDidMount() {
    //     this.checkForAccessToken();
    // }

    // async checkForAccessToken() {
    //     const { token } = await requestService.getRequest(`${rootPath}/gettoken`);

    //     if (token !== '' && token !== null) {
    //         const user = await requestService.getRequest(`https://graph.microsoft.com/beta/me`, token);
    //         const userPhotoBlob = await requestService.getRequest(`https://graph.microsoft.com/beta/me/photo/$value`, token, 'image/jpg');
            
    //         // if (userPhotoBlob.type === 'image/jpeg') {
    //         //     const userPhotoUrl = URL.createObjectURL(userPhotoBlob);
    //         //     const userPhoto = document.querySelector('img');
    //         //     userPhoto.addEventListener('load', () => URL.revokeObjectURL(userPhotoUrl));

    //         //     userPhoto.src = userPhotoUrl;
    //         // }

    //         this.setState({
    //             accessToken: token,
    //             user: user
    //         })
    //     } else {
    //         this.setState({ showSignInButton: true })
    //     }
    // }

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