import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';

import App from './App';

import './App.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';


const Root = () => (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

export default Root;

render(<Root />, document.getElementById('root'));