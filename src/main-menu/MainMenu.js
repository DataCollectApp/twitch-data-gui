import * as React from "react";
import {Fragment} from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RecentUsername from "../recent-username/RecentUsername";
import RecentPunishment from "../recent-punishment/RecentPunishment";
import Welcome from "../welcome/Welcome";

class MainMenu extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Route
                path="/"
                render={({location}) => (
                    <Fragment>
                      <Tabs value={location.pathname}>
                        <Tab value="/" label="Welcome" component={Link} to="/"/>
                        <Tab value="/recent-username" label="Recent usernames" component={Link} to="/recent-username"/>
                        <Tab value="/recent-punishment" label="Recent punishments" component={Link} to="/recent-punishment"/>
                      </Tabs>
                      <Switch>
                        <Route exact path="/" render={() => <Welcome/>}/>
                        <Route path="/recent-username" render={() => <RecentUsername/>}/>
                        <Route path="/recent-punishment" render={() => <RecentPunishment/>}/>
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

export default MainMenu;
