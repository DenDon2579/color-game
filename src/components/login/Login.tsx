import React from 'react';
import { useAppDispatch } from '../../hooks/react-redux';
import useAuth from '../../hooks/useAuth';
import { signIn } from '../../store/userReducer';

import classes from './Login.module.scss';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const callLogin = useAuth();
    const login = () => {
        callLogin().then((user) => dispatch(signIn(user)));
    };
    return (
        <div className={classes.wrapper}>
            <button className={classes.loginButton} onClick={login}>
                Войти через гугил
            </button>
        </div>
    );
};
export default Login;
