import * as React from "react";
import Grid from "@material-ui/core/Grid";
import RecentNameChange from "./recent-name-change/RecentNameChange";
import RecentTwitchUser from "./recent-twitch-user/RecentTwitchUser";

class RecentUsername extends React.Component {

  render() {
    return (
        <Grid container spacing={1}>
          <Grid item sm={12} md={6} lg={6} xl={6}>
            <RecentNameChange/>
          </Grid>
          <Grid item sm={12} md={6} lg={6} xl={6}>
            <RecentTwitchUser/>
          </Grid>
        </Grid>
    )
  }
}

export default RecentUsername;
