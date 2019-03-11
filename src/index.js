import styles from './assets/scss/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
//mport Navbar from './components/Navbar';

ReactDOM.render(
    //React.createElement("div", null, "Hello World"), // <div>Hello World</div>
    <App />,
    document.getElementById("root")
);