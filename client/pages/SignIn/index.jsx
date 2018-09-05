import 'whatwg-fetch';
import 'babel-polyfill';
import { h, render, Component } from 'preact';

class SignIn extends Component {
    render() {
        return (
            <div class="main">
                <h2 class="main__subtitle">Logga in med ditt AD konto</h2>

                <a href="/signin" class="button">Logga in</a>
            </div>
        )
    }
}

export default SignIn;