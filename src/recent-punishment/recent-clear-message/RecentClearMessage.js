import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import * as React from "react";

class RecentClearMessage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clearMessages: []
    }
  }

  componentDidMount() {
    fetch('/twitch-data-api/v1/clear-message?sortDirection=DESC&limit=10')
    .then(response => response.json())
    .then(data => this.setState({clearMessages: data, clearMessagesLastUpdated: new Date().toLocaleString()}));

    this.interval = setInterval(() => {
      fetch('/twitch-data-api/v1/clear-message?sortDirection=DESC&limit=10')
      .then(response => response.json())
      .then(data => this.setState({clearMessages: data, clearMessagesLastUpdated: new Date().toLocaleString()}));
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <Paper>
          <h3>Recent message timeouts</h3>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="recent clear messages">
              <TableHead>
                <TableRow>
                  <TableCell><b>Username</b></TableCell>
                  <TableCell><b>Channel</b></TableCell>
                  <TableCell><b>Message</b></TableCell>
                  <TableCell><b>Time</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state && this.state.clearMessages && this.state.clearMessages.map(clearMessage => (
                    <TableRow key={clearMessage.id}>
                      <TableCell>{clearMessage.targetUsername}</TableCell>
                      <TableCell>{clearMessage.channel}</TableCell>
                      <TableCell>{clearMessage.message}</TableCell>
                      <TableCell>{new Date(clearMessage.time).toLocaleString()}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
            Last updated: {this.state.clearMessagesLastUpdated}
          </TableContainer>
        </Paper>
    );
  }
}

export default RecentClearMessage;
