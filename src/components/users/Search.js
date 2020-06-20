import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const { clearUser, searchUser, users } = githubContext;
    const { setAlert } = alertContext;

    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
            setAlert(' Please enter something', 'light');
        }
        else {
            searchUser(text);
            setText('');
        }
    }

    const styleClearBtn = users.length > 0 ? { display: 'block' } : { display: 'none' }

    return (
        <div>
            <form onSubmit={onSubmit} className="form" >
                <input
                    type="text"
                    name="text"
                    placeholder="Search users..."
                    value={text}
                    onChange={onChange}
                />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            <button className="btn btn-light btn-block" onClick={clearUser} style={styleClearBtn}>Clear</button>
        </div>
    )
}

export default Search
