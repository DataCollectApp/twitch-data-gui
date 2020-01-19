import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import * as React from "react";
import Fade from "@material-ui/core/Fade";

class RecentGlobalClearChat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      globalClearChats: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    fetch('/twitch-data-api/v1/global-clear-chat?sortDirection=DESC&limit=10')
    .then(response => response.json())
    .then(data => this.setState({isLoaded: true, globalClearChats: data, globalClearChatsLastUpdated: new Date().toLocaleString()}));

    this.interval = setInterval(() => {
      fetch('/twitch-data-api/v1/global-clear-chat?sortDirection=DESC&limit=10')
      .then(response => response.json())
      .then(data => this.setState({isLoaded: true, globalClearChats: data, globalClearChatsLastUpdated: new Date().toLocaleString()}));
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.isLoaded) {
      return (
          <Paper>
            <h3>Recent global timeouts *</h3>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="recent global clear chats">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Channel</b></TableCell>
                    <TableCell><b>Time</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state && this.state.globalClearChats && this.state.globalClearChats.map(globalClearChat => (
                      <Fade in={true}>
                        <TableRow key={globalClearChat.id}>
                          <TableCell>{globalClearChat.channel}</TableCell>
                          <TableCell>{new Date(globalClearChat.time).toLocaleString()}</TableCell>
                        </TableRow>
                      </Fade>
                  ))}
                </TableBody>
              </Table>
              Last updated: {this.state.globalClearChatsLastUpdated}
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

export default RecentGlobalClearChat;
