import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks/react-redux';
import Game from '../game/Game';
import Lobby from '../lobby/Lobby';
import Login from '../login/Login';
import classes from './Content.module.scss';

const Content: React.FC = () => {
    const isAuth = useAppSelector((state) => state.userReducer.isAuth);
    return (
        <div className={classes.content}>
            <Routes>
                <Route
                    path='/'
                    element={
                        isAuth ? (
                            <Navigate to='lobby' />
                        ) : (
                            <Navigate to='login' />
                        )
                    }
                />
                <Route
                    path='game'
                    element={isAuth ? <Game /> : <Navigate to='../login' />}
                />
                <Route
                    path='lobby'
                    element={isAuth ? <Lobby /> : <Navigate to='../login' />}
                />
                <Route
                    path='login'
                    element={isAuth ? <Navigate to='../lobby' /> : <Login />}
                />
            </Routes>
        </div>
    );
};
export default Content;
