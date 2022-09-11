import React from 'react';
import { useAppDispatch } from '../../hooks/react-redux';
import useAuth from '../../hooks/useAuth';
import { signIn } from '../../store/userReducer';
import Button from '../../ui/buttons/Button';
// import classes from './Login.module.scss';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const callLogin = useAuth();
    const login = () => {
        callLogin().then((user) => dispatch(signIn(user)));
    };
    return (
        <div>
            <Button size='large' onClick={login}>
                Войти через гугил
            </Button>
        </div>
    );
};
export default Login;
