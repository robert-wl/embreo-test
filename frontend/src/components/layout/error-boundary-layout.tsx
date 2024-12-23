import { Component, ErrorInfo, ReactNode } from "react";
import NotFoundPage from "@/pages/not-found.tsx";
import { Outlet } from "react-router";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundaryLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <NotFoundPage />;
    }

    return <Outlet />;
  }
}
