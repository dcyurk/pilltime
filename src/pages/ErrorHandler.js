// ErrorHandler.js

import React, { Component } from 'react';

class ErrorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorCode: null,
            errorMessage: '',
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.toString() };
    }

    componentDidCatch(error, info) {
        console.error('Error caught by Error Boundary:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Error {this.state.errorCode}</h1>
                    <p>{this.state.errorMessage}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorHandler;
