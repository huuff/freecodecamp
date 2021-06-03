'use strict';

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import 'bootstrap';
import './main.scss';

import fetchFromQuotable from "./fetch-from-quotable.js";

import store from './store.js';
import { Provider } from 'react-redux';

import { fakeInterval } from './interval'

import Main from './main'

ReactDOM.render(
    <Provider store={store}>
        <Main fetchQuote={fetchFromQuotable}/>
    </Provider>,
    document.getElementById('root')
);

