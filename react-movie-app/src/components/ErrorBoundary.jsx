import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5 text-center my-5">
          <div className="alert alert-dark border-secondary p-4 d-inline-block text-start" style={{ maxWidth: '600px' }}>
            <div className="d-flex align-items-center gap-3 mb-3 text-danger">
              <i className="bi bi-exclamation-triangle-fill fs-2"></i>
              <h3 className="h4 mb-0 text-white">Something went wrong</h3>
            </div>
            <p className="text-secondary mb-3">
              We encountered an issue loading live movie data. This could be due to network connectivity or API service rate limits.
            </p>
            {this.state.error && (
              <pre className="bg-black text-danger-emphasis p-2 rounded small mb-3 overflow-auto">
                {this.state.error.toString()}
              </pre>
            )}
            <button className="btn btn-outline-light btn-sm" onClick={this.handleReset}>
              <i className="bi bi-arrow-clockwise me-1"></i> Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
