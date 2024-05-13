import React, {ErrorInfo, PropsWithChildren, ReactNode} from 'react';

export class ErrorBoundary extends React.Component<
  PropsWithChildren<{fallback: ReactNode}>
> {
  state = {hasError: false};

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
