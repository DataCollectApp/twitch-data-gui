import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import * as React from "react";
import Fade from "@material-ui/core/Fade";

class RecentTwitchUser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      twitchUsers: []
    }
  }

  componentDidMount() {
    fetch('/twitch-data-api/v1/twitch-user?sortDirection=DESC&limit=20')
    .then(response => response.json())
    .then(data => this.setState({twitchUsers: data, twitchUsersLastUpdated: new Date().toLocaleString()}));

    this.interval = setInterval(() => {
      fetch('/twitch-data-api/v1/twitch-user?sortDirection=DESC&limit=20')
      .then(response => response.json())
      .then(data => this.setState({twitchUsers: data, twitchUsersLastUpdated: new Date().toLocaleString()}));
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <Paper>
          <h3>Recently discovered users</h3>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="recent twitch users">
              <TableHead>
                <TableRow>
                  <TableCell><b>Display name</b></TableCell>
                  <TableCell><b>Time</b></TableCell>
                  <TableCell><b>Discovered in channel</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state && this.state.twitchUsers && this.state.twitchUsers.map(twitchUser => (
                    <Fade in={true}>
                      <TableRow key={twitchUser.id}>
                        <TableCell>{twitchUser.displayName}</TableCell>
                        <TableCell>{new Date(twitchUser.discoveredTime).toLocaleString()}</TableCell>
                        <TableCell>{twitchUser.discoveredChannel}</TableCell>
                      </TableRow>
                    </Fade>
                ))}
              </TableBody>
            </Table>
            Last updated: {this.state.twitchUsersLastUpdated}
          </TableContainer>
        </Paper>
    );
  }
}

export default RecentTwitchUser;
