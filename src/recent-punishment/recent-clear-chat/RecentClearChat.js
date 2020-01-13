import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import * as React from "react";

class RecentClearChat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clearChats: []
    }
  }

  componentDidMount() {
    fetch('/twitch-data-api/v1/clear-chat?sortDirection=DESC&limit=10')
    .then(response => response.json())
    .then(data => this.setState({clearChats: data, clearChatsLastUpdated: new Date().toLocaleString()}));

    this.interval = setInterval(() => {
      fetch('/twitch-data-api/v1/clear-chat?sortDirection=DESC&limit=10')
      .then(response => response.json())
      .then(data => this.setState({clearChats: data, clearChatsLastUpdated: new Date().toLocaleString()}));
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <Paper>
          <h3>Recent timeouts</h3>
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
                    <TableRow key={clearChat.id}>
                      <TableCell>{clearChat.targetUsername}</TableCell>
                      <TableCell>{clearChat.channel}</TableCell>
                      <TableCell>{clearChat.seconds && (clearChat.seconds !== -1 ? clearChat.seconds : 'Permanent')}</TableCell>
                      <TableCell>{new Date(clearChat.time).toLocaleString()}</TableCell>
                    </TableRow>
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