import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'app/App.less';
import 'app/AppBase.css'; // Custom style
import App from 'app/App';
import AppInit from 'app/AppInit';

import 'core/utils/polyfill';
import { StoreProvider } from 'core/store/store';

AppInit()
  .then(() => {
    //React Render
    ReactDOM.render(
      <BrowserRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </BrowserRouter>,
      document.getElementById('root'),
    );
  })
  .catch((error) => {
    console.error(error);
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  });
