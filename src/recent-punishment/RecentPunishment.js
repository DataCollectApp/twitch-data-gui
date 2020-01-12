import * as React from "react";
import Grid from "@material-ui/core/Grid";
import RecentClearChat from "./recent-clear-chat/RecentClearChat";
import RecentClearMessage from "./recent-clear-message/RecentClearMessage";
import RecentGlobalClearChat from "./recent-global-clear-chat/RecentGlobalClearChat";

class RecentPunishment extends React.Component {

  render() {
    return (
        <div>
          <Grid container spacing={1}>
            <Grid item sm={12} md={8} lg={8} xl={8}>
              <RecentClearChat/>
            </Grid>
            <Grid item sm={12} md={4} lg={4} xl={4}>
              <RecentGlobalClearChat/>
            </Grid>
            <Grid item sm={12} md={12} lg={12} xl={12}>
              <RecentClearMessage/>
            </Grid>
          </Grid>
          <p>
            * Recent global timeouts: All messages from all users removed in channel.
          </p>
        </div>
    )
  }
}

export default RecentPunishment;
