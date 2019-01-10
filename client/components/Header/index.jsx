import { h, render, Component } from 'preact';

import rootPath from '../../utils/rootPath';

class Header extends Component {
    componentDidUpdate() {
        const { userPhotoBlob } = this.props;

        if (userPhotoBlob && userPhotoBlob.type === 'image/jpeg') {
            const userPhotoUrl = URL.createObjectURL(userPhotoBlob);
            const userPhoto = document.querySelector('.header__avatar-img');
            userPhoto.addEventListener('load', () => URL.revokeObjectURL(userPhotoUrl));

            userPhoto.src = userPhotoUrl;
        }
    }

    render() {
        const { user, userSignedIn, userPhotoBlob } = this.props;
        let userInitials = "";
        
        if (user) {
            const userName = user.displayName;
            userInitials = userName.substring(0, 1) + userName.substring(userName.indexOf(' ') + 1, userName.indexOf(' ') + 2);
        }
    
        return (
            <header className="header">
                <div className="header__inner">
                    <div className="header__logo">GG Massage Booker</div>

                    <ul className="header__nav">
                        <li className="header__nav-item">
                            {!userSignedIn ? (
                                <a href={`${rootPath}/signin`} class="header__nav-link">Logga in</a>
                            ) : (
                                <div className="header__avatar">
                                    {userPhotoBlob && userPhotoBlob.type === 'image/jpeg' ? (
                                        <img src="" className="header__avatar-img" />
                                    ) : (
                                        <span className="header__avatar-initials">{userInitials && userInitials}</span>
                                    )}
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;