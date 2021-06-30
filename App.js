import React, { useState } from 'react';

import Helper from './src/helper/navigation';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducer';




const store = createStore(reducers, applyMiddleware(thunk));


function App() {
  return (

    <Provider store={store}>

      <NavigationContainer>
        <Helper></Helper>
      </NavigationContainer>

    </Provider>

  );
};


export default App;