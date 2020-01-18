import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import * as React from "react";
import Fade from "@material-ui/core/Fade";

class RecentClearChat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      clearChats: []
    }
  }

  componentDidMount() {
    if (this.state.user) {
      fetch('/twitch-data-api/v1/clear-chat?targetUserId=' + this.state.user.id + '&sortDirection=DESC')
      .then(response => response.json())
      .then(data => this.setState({clearChats: data, clearChatsLastUpdated: new Date().toLocaleString()}));
    } else {
      fetch('/twitch-data-api/v1/clear-chat?sortDirection=DESC&limit=10')
      .then(response => response.json())
      .then(data => this.setState({clearChats: data, clearChatsLastUpdated: new Date().toLocaleString()}));
    }

    this.interval = setInterval(() => {
      if (this.state.user) {
        fetch('/twitch-data-api/v1/clear-chat?targetUserId=' + this.state.user.id + '&sortDirection=DESC')
        .then(response => response.json())
        .then(data => this.setState({clearChats: data, clearChatsLastUpdated: new Date().toLocaleString()}));
      } else {
        fetch('/twitch-data-api/v1/clear-chat?sortDirection=DESC&limit=10')
        .then(response => response.json())
        .then(data => this.setState({clearChats: data, clearChatsLastUpdated: new Date().toLocaleString()}));
      }
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <Paper>
          <h3>Recent timeouts {this.state.user ? " for " + this.state.user.displayName : ""}</h3>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="recent clear chats">
              <TableHead>
                <TableRow>
                  <TableCell><b>Username</b></TableCell>
                  <TableCell><b>Channel</b></TableCell>
                  <TableCell><b>Seconds</b></TableCell>
                  <TableCell><b>Time</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state && this.state.clearChats && this.state.clearChats.map(clearChat => (
                    <Fade in={true}>
                      <TableRow key={clearChat.id}>
                        <TableCell>{clearChat.targetUsername}</TableCell>
                        <TableCell>{clearChat.channel}</TableCell>
                        <TableCell>{clearChat.seconds && (clearChat.seconds !== -1 ? clearChat.seconds : 'Permanent')}</TableCell>
                        <TableCell>{new Date(clearChat.time).toLocaleString()}</TableCell>
                      </TableRow>
                    </Fade>
                ))}
              </TableBody>
            </Table>
            Last updated: {this.state.clearChatsLastUpdated}
          </TableContainer>
        </Paper>
    );
  }
}

export default RecentClearChat;
