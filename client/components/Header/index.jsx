import { h, render, Component } from 'preact';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header__inner">
                    <a href="/" className="header__logo"></a>

                    <ul className="header__nav">
                        <li className="header__nav-item">Hello</li>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;