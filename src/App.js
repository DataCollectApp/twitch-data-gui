import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Welcome from "./welcome/Welcome";
import RecentUsername from "./recent-username/RecentUsername";
import RecentPunishment from "./recent-punishment/RecentPunishment";
import Profile from "./profile/Profile";

class App extends React.Component {

  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Route
                path="/"
                render={({location}) =>
                    (
                        <Fragment>
                          <Tabs value={location.pathname}>
                            <Tab value="/" label="Welcome" component={Link} to="/"/>
                            <Tab value="/recent-username" label="Recent usernames" component={Link} to="/recent-username"/>
                            <Tab value="/recent-punishment" label="Recent punishments" component={Link} to="/recent-punishment"/>
                          </Tabs>
                          <Switch>
                            <Route exact path="/" component={Welcome}/>
                            <Route path="/recent-username" component={RecentUsername}/>
                            <Route path="/recent-punishment" component={RecentPunishment}/>
                            <Route path="/profile/:username" component={Profile}/>
                          </Switch>
                        </Fragment>
                    )
                }
            />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
