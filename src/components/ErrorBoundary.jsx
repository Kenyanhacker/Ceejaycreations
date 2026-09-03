import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // TODO: send error and info to a monitoring service (Sentry, LogRocket, etc.)
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-xl space-y-4 rounded-xl border border-ink-border bg-ink-surface/60 p-8 text-center">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <p className="text-sm text-paper-muted">
              The application encountered an unexpected error. Try reloading the page.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button className="rounded-lg bg-signal px-4 py-2 text-sm font-semibold text-ink" onClick={() => window.location.reload()}>
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
