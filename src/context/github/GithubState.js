import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
    const searchUser = async text => {
        setLoading();
        const res = await axios.get(`http://api.github.com/search/users?q=${text}&${process.env.REACT_APP_GITHUB_TOKEN}`);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    };

    // Get User
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(`http://api.github.com/users/${username}?${process.env.REACT_APP_GITHUB_TOKEN}`);
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    }

    // Get Repos
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(`http://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${process.env.REACT_APP_GITHUB_TOKEN}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    }

    // Clear Users
    const clearUser = () => {
        dispatch({
            type: CLEAR_USERS
        })
    }

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (<GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUser,
            getUser,
            clearUser,
            getUserRepos,
        }}
    >
        {props.children}
    </GithubContext.Provider>
    )
};

export default GithubState;