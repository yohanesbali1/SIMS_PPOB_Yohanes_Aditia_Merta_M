import React, { ReactNode, ErrorInfo } from 'react';
import { Redirect } from 'react-router-dom';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can log the error to an error reporting service here
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <Redirect to="/error" />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
