import React from 'react';
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducer/rootReducer'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import {CanvasContainer} from './components/Canvas/CanvasContainer';
import {SideBarContent} from './components/Sidebar/SidebarContent';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
)

function App() {
  return (
    <Provider store={store}>
      <div className="App" style={{marginTop: '32px'}}>
        <Container >
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <SideBarContent/>
            </Grid>
            <Grid item xs={8}>
              <CanvasContainer/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
