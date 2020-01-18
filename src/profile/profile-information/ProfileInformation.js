import * as React from "react";
import Paper from "@material-ui/core/Paper";

class ProfileInformation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    }
  }

  render() {
    return (
        <Paper>
          <h1>{this.state.user.displayName}</h1>
          <p>
            <b>{this.state.user.displayName}</b> was discovered <b>{new Date(this.state.user.discoveredTime).toLocaleString()}</b> in channel <b>{this.state.user.discoveredChannel}</b>.<br/>
            The unique ID of the user is <b>{this.state.user.id}</b>.
          </p>
        </Paper>
    )
  }
}

export default ProfileInformation;
