import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUser: PropTypes.func.isRequired,
        clearUser: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
    }

    onChange = (e) => {
        this.setState({ text: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.setAlert(' Please enter something', 'light');
        }
        else {
            this.props.searchUser(this.state.text);
            this.setState({ text: '' });
        }
    }

    render() {
        const { showClear, clearUser } = this.props;
        const styleClearBtn = showClear ? { display: 'block' } : { display: 'none' }
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form" >
                    <input
                        type="text"
                        name="text"
                        placeholder="Search users..."
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                <button className="btn btn-light btn-block" onClick={clearUser} style={styleClearBtn}>Clear</button>
            </div>
        )
    }
}

export default Search
