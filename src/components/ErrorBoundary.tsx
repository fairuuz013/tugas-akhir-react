import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Terjadi Kesalahan</h2>
                        <p className="text-gray-600 mb-4">
                            {this.state.error?.message || 'Maaf, terjadi kesalahan yang tidak terduga.'}
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false, error: undefined })}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
                        >
                            Coba Lagi
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}