import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Styles
import './assets/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layout
import Main from './layout/main';

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
