import {
    BrowserRouter,
    Route
} from 'react-router-dom';
import { h, render } from 'preact';

import { Main, Admin } from './pages';

render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Main} />
            <Route exact path="/admin" component={Admin} />
        </div>
    </BrowserRouter>, 
    document.getElementById('app')
);