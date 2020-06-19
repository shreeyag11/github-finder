import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  searchUser = async text => {
    this.setState({ loading: true });
    const res = await axios.get(`http://api.github.com/search/users?q=${text}&${process.env.REACT_APP_GITHUB_TOKEN}`);
    this.setState({ users: res.data.items, loading: false });
  };

  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`http://api.github.com/users/${username}?${process.env.REACT_APP_GITHUB_TOKEN}`);
    this.setState({ user: res.data, loading: false });
  }

  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${process.env.REACT_APP_GITHUB_TOKEN}`);
    this.setState({ repos: res.data, loading: false });
  }

  clearUser = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  render() {
    const { users, user, repos, loading, alert } = this.state;
    return (
      <Router>
        <div>
          <NavBar />
          <div className="container">
            <Alert alertBox={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUser={this.searchUser}
                    clearUser={this.clearUser}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users users={users} loading={loading} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )} />
            </Switch>

          </div>
        </div>
      </Router>
    )
  }
}

export default App
