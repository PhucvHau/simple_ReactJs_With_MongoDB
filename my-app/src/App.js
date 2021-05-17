import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from 'react-router-dom';
// import { createBrowserHistory } from 'history';

import '../src/components/layout/Nav.css';
import './App.css';
import Main from './components/Main';
import Profile from './components/profileUser';
import NewUser from './components/newUser';
import UpdateUser from './components/updateUser';

const renderNavItemProfile = (Component) => (
  <div>
    <div className="container">
        <div className="row" >  
          {/* <TopNarbar></TopNarbar> */}
        </div>
      <div className="row" style={{display:"flex",  flexDirection:"row",}}>
      <div  class="topnav" style={{flex:1, height:1000, backgroundColor:"#333" }}>
        <a href="/">Home</a>
        <a href="/newuser">New User</a>
      </div>
        <div className="col col-lg-8" id="column_content" style={{ marginLeft: '5%',flex:13 }}>
            <div className="container-fluid text-right">
              {Component}
            </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div>
    <Router  >
      <Switch>
        <Route exact path="/" component={() => renderNavItemProfile(<Main />)} />

        <Route path='/profile' component={() => renderNavItemProfile(<Profile />)} />
        <Route path='/newuser' component={() => renderNavItemProfile(<NewUser />)} />
        <Route path='/update' component={() => renderNavItemProfile(<UpdateUser />)} /> 
      </Switch>
    </Router>
  </div>
  );
}

export default App;
