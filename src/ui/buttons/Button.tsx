import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import classes from './Button.module.scss';

interface IProps {
    size?: 'large' | 'medium' | 'small';
    type?: 'normal' | 'rounded';
    marginTB?: 0 | 10 | 15;
    marginLR?: 0 | 10 | 15;
    icon?: IconDefinition;
    children: ReactNode;
    onClick?: () => void;
}

const Button: React.FC<IProps> = ({
    size = 'medium',
    type = 'normal',
    marginTB = 10,
    marginLR = 0,
    icon,
    children,
    onClick,
}) => {
    const classList = [classes.button, classes[size], classes[type]];

    return (
        <button
            style={{ margin: `${marginTB}px ${marginLR}px` }}
            onClick={onClick}
            className={classList.join(' ')}
        >
            {children}
            {icon && <FontAwesomeIcon className={classes.icon} icon={icon} />}
        </button>
    );
};
export default Button;
