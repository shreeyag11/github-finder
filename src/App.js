import React, { Component } from 'react';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import './App.css';
import axios from 'axios';
import Search from './components/users/Search';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  searchUser = async text => {
    this.setState({ loading: true });

    const res = await axios.get(`http://api.github.com/search/users?q=${text}&${process.env.REACT_APP_GITHUB_TOKEN}`);
    this.setState({ users: res.data.items, loading: false });
  };

  clearUser = () => this.setState({ users: [], loading: false });

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <Search searchUser={this.searchUser} clearUser={this.clearUser} showClear={this.state.users.length > 0 ? true : false} />
          <Users users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
    )
  }
}

export default App
