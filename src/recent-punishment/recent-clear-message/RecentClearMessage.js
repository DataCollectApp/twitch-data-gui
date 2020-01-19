import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import * as React from "react";
import Fade from "@material-ui/core/Fade";

class RecentClearMessage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      clearMessages: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    if (this.state.user) {
      fetch('/twitch-data-api/v1/clear-message?userId=' + this.state.user.id + '&sortDirection=DESC&limit=10')
      .then(response => response.json())
      .then(data => this.setState({isLoaded: true, clearMessages: data, clearMessagesLastUpdated: new Date().toLocaleString()}));
    } else {
      fetch('/twitch-data-api/v1/clear-message?sortDirection=DESC&limit=10')
      .then(response => response.json())
      .then(data => this.setState({isLoaded: true, clearMessages: data, clearMessagesLastUpdated: new Date().toLocaleString()}));
    }

    this.interval = setInterval(() => {
      if (this.state.user) {
        fetch('/twitch-data-api/v1/clear-message?userId=' + this.state.user.id + '&sortDirection=DESC&limit=10')
        .then(response => response.json())
        .then(data => this.setState({isLoaded: true, clearMessages: data, clearMessagesLastUpdated: new Date().toLocaleString()}));
      } else {
        fetch('/twitch-data-api/v1/clear-message?sortDirection=DESC&limit=10')
        .then(response => response.json())
        .then(data => this.setState({isLoaded: true, clearMessages: data, clearMessagesLastUpdated: new Date().toLocaleString()}));
      }
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.isLoaded) {
      return (
          <Paper>
            <h3>{this.state.user ? "Message timeouts" : "Recent message timeouts"}</h3>
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
                      <Fade in={true}>
                        <TableRow key={clearMessage.id}>
                          <TableCell>{clearMessage.targetUsername}</TableCell>
                          <TableCell>{clearMessage.channel}</TableCell>
                          <TableCell>{clearMessage.message}</TableCell>
                          <TableCell>{new Date(clearMessage.time).toLocaleString()}</TableCell>
                        </TableRow>
                      </Fade>
                  ))}
                </TableBody>
              </Table>
              Last updated: {this.state.clearMessagesLastUpdated}
            </TableContainer>
          </Paper>
      );
    } else {
      return (
          <Paper>
            <h3>Loading data...</h3>
          </Paper>
      );
    }
  }
}

export default RecentClearMessage;
