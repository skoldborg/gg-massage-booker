import { h, render, Component } from 'preact';

import rootPath from '../../utils/rootPath';

class Header extends Component {
    render() {
        const { userSignedIn } = this.props;

        return (
            <header className="header">
                <div className="header__inner">
                    <div className="header__logo">GG Massage Booker</div>

                    <ul className="header__nav">
                        <li className="header__nav-item">
                            {!userSignedIn &&
                                <a href={`${rootPath}/signin`} class="header__nav-link">Logga in</a>
                            }
                        </li>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;