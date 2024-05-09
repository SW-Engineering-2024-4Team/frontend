import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header';
import Modal from './modal';
import NicknameForm from './NicknameForm';
import './header.css';
import './startPage.css';
import './modal.css';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Modal />
                <NicknameForm />
            </div>
        </Router>
    );
}

export default App;