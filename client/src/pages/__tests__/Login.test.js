const react = require("react"); //import React from 'react';
const fireEvent = require ("@testing-library/react");//import { render, screen, fireEvent } from '@testing-library/react';

const Login = require("./Login");//import Login from './Login';

// Mock the useAuth and useNavigate hooks
jest.mock('../AuthContext', () => ({
    useAuth: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('Login', () => {
    test('renders login form', () => {
        render(<Login />);
        
        // Assert that the login form is rendered
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    test('submits login form', () => {
        const mockNavigate = jest.fn();
        const mockLogin = jest.fn();
        const mockAuthContext = {
            login: mockLogin,
        };

        // Mock the useAuth and useNavigate hooks
        jest.mock('../AuthContext', () => ({
            useAuth: () => mockAuthContext,
        }));
        jest.mock('react-router-dom', () => ({
            useNavigate: () => mockNavigate,
        }));

        render(<Login />);
        
        // Fill in the login form
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        
        // Submit the login form
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));
        
        // Assert that the login function is called with the correct arguments
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
        
        // Assert that the navigate function is called
        expect(mockNavigate).toHaveBeenCalled();
    });
});
