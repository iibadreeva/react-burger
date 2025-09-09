import React, { Component, ComponentType, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  error: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch(error: Error) {
    this.setState({ error: !!error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <h2>Что-то пошло не так</h2>;
    }

    return children;
  }
}

export const withErrorBoundary = <T extends ComponentType<T>>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    return (
      <ErrorBoundary>
        <Component {...(props as T)} />
      </ErrorBoundary>
    );
  };
};
