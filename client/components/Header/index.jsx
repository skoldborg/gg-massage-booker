import { h, render, Component } from 'preact';

import rootPath from '../../utils/rootPath';

class Header extends Component {
    constructor() {
        super();

        this.state = {
            userHasPhoto: false
        }
    }

    render() {
        const { userSignedIn, userPhotoBlob } = this.props;

        if (userPhotoBlob && userPhotoBlob.type === 'image/jpeg') {
            this.setState({ userHasPhoto: false });

            const userPhotoUrl = URL.createObjectURL(userPhotoBlob);
            const userPhoto = document.querySelector('.header__avatar-img');
            userPhoto.addEventListener('load', () => URL.revokeObjectURL(userPhotoUrl));

            userPhoto.src = userPhotoUrl;
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
                                    {this.state.userHasPhoto ? (
                                        <img src="" className="header__avatar-img" />
                                    ) : (
                                        <span className="header__avatar-initials">PS</span>
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