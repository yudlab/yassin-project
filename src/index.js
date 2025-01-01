import React from 'react';
import ReactDOM from 'react-dom/client';
import './ASSETS/scss/index.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './VIEWS/Home/Home';
import { GlobalContextProvider } from './PROVIDER/GlobalContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </GlobalContextProvider>
  </React.StrictMode>
);
