import * as React from "react";
import Grid from "@material-ui/core/Grid";
import RecentNameChange from "../recent-username/recent-name-change/RecentNameChange";
import RecentClearChat from "../recent-punishment/recent-clear-chat/RecentClearChat";
import RecentClearMessage from "../recent-punishment/recent-clear-message/RecentClearMessage";

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch('/twitch-data-api/v1/twitch-user/username?username=' + this.props.match.params.username)
    .then(response => response.json())
    .then(data => this.setState({user: data}));
  }

  render() {
    if (this.state.user) {
      return (
          <div>
            <h1>{this.state.user.displayName}</h1>
            <Grid container spacing={1}>
              <Grid item sm={12} md={6} lg={6} xl={6}>
                <RecentNameChange user={this.state.user}/>
              </Grid>
              <Grid item sm={12} md={6} lg={6} xl={6}>
                <RecentClearChat user={this.state.user}/>
              </Grid>
              <Grid item sm={12} md={12} lg={12} xl={12}>
                <RecentClearMessage user={this.state.user}/>
              </Grid>
            </Grid>
          </div>
      );
    } else {
      return (<div><h1>Loading...</h1></div>);
    }
  }
}

export default Profile;
