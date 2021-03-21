import HomePage from './content/HomePage';
import TeamPage from './content/TeamPage';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pageView: true
    };
  }

  changeView(selectedView) {
    this.setState({ pageView: !this.state.pageView })
  }

  render() {
    return (
      <div className="App" >
        <AppBar position="fixed">
          <Toolbar className="header">
            <Typography className="headerText">BOIS Monotype League Tournament</Typography>
            <Button style={{ color: 'white', position: "absolute", right: 0 }} onClick={() => this.changeView()}>
              {this.state.pageView ? 'TEAMS' : 'MATCHES'}
            </Button>
          </Toolbar>
        </AppBar>
        {this.state.pageView ? <HomePage /> : <TeamPage />}
      </div>
    );
  }
}

export default App;
