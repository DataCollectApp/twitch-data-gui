import * as React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

class Welcome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      twitchUserCount: -1,
      nameChangeCount: -1
    }
  }

  componentDidMount() {
    fetch('/twitch-data-api/v1/statistics/counters')
    .then(response => response.json())
    .then(data => this.setState({twitchUserCount: data.twitchUserCount, nameChangeCount: data.nameChangeCount}));
  }

  render() {
    return (
        <div>
          <Container>
            <Paper>
              <h1>Welcome to Twitch Data</h1>
              <p>
                Twitch Data is a small project created to collect data (chat messages and punishments) from Norwegian Twitch channels.<br/>
                The data collector has been running since 10/01/2020 and the goal is to have it running 24/7.<br/>
                You can not see chat messages at the moment, but it's saved and I might share it later.<br/>
                I am working on more features (user search etc.) for the website.<br/><br/>
                <b>{this.state.twitchUserCount}</b> twitch users and <b>{this.state.nameChangeCount}</b> name changes has been collected.
              </p>
            </Paper>
          </Container>
        </div>
    );
  }
}

export default Welcome;
