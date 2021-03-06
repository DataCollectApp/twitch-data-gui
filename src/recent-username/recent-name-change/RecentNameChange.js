import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import * as React from "react";
import Fade from "@material-ui/core/Fade";

class RecentNameChange extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      nameChanges: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    if (this.state.user) {
      fetch('/twitch-data-api/v1/name-change/' + this.state.user.id)
      .then(response => response.json())
      .then(data => this.setState({isLoaded: true, nameChanges: data, nameChangesLastUpdated: new Date().toLocaleString()}));
    } else {
      fetch('/twitch-data-api/v1/name-change?sortDirection=DESC&limit=20&excludeOrigin=true')
      .then(response => response.json())
      .then(data => this.setState({isLoaded: true, nameChanges: data, nameChangesLastUpdated: new Date().toLocaleString()}));
    }

    this.interval = setInterval(() => {
      if (this.state.user) {
        fetch('/twitch-data-api/v1/name-change/' + this.state.user.id)
        .then(response => response.json())
        .then(data => this.setState({isLoaded: true, nameChanges: data, nameChangesLastUpdated: new Date().toLocaleString()}));
      } else {
        fetch('/twitch-data-api/v1/name-change?sortDirection=DESC&limit=20&excludeOrigin=true')
        .then(response => response.json())
        .then(data => this.setState({isLoaded: true, nameChanges: data, nameChangesLastUpdated: new Date().toLocaleString()}));
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
            <h3>{this.state.user ? "Name changes" : "Recent name changes"}</h3>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="recent name changes">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Old username</b></TableCell>
                    <TableCell><b>New username</b></TableCell>
                    <TableCell><b>Time</b></TableCell>
                    <TableCell><b>Discovered in channel</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state && this.state.nameChanges && this.state.nameChanges.map(nameChange => (
                      <Fade in={true}>
                        <TableRow key={nameChange.id}>
                          <TableCell>{nameChange.oldUsername}</TableCell>
                          <TableCell>{nameChange.newUsername}</TableCell>
                          <TableCell>{new Date(nameChange.discoveredTime).toLocaleString()}</TableCell>
                          <TableCell>{nameChange.discoveredChannel}</TableCell>
                        </TableRow>
                      </Fade>
                  ))}
                </TableBody>
              </Table>
              Last updated: {this.state.nameChangesLastUpdated}
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

export default RecentNameChange;
