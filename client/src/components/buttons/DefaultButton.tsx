import React from 'react';
import { Button } from '@mui/material';

interface DefaultButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    className?: string;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
    onClick,
    children,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    disabled = false,
    className,
}) => {
    return (
        <Button
            onClick={onClick}
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            className={className}   
        >
            {children}
        </Button>
    );
};

export default DefaultButton;

