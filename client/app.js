import { h, render } from 'preact';

import { App } from './components';
import styles from './styles/styles.scss';

render(
    <App />, 
    document.getElementById('app')
);