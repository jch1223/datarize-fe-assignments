import { HTTPError } from 'ky'
import type { ReactNode } from 'react'
import { Component } from 'react'

type ErrorFallbackType = ReactNode | ((error: Error | HTTPError) => ReactNode)

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ErrorFallbackType },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode; fallback: ErrorFallbackType }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return typeof this.props.fallback === 'function'
        ? this.props.fallback(this.state.error as Error | HTTPError)
        : this.props.fallback
    }

    return this.props.children
  }
}
